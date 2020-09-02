import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react'
import {ActivityIndicator, Card} from '@ant-design/react-native';
import RomoteURL from "../../util/remote-url";
import {getUserId} from "../../util/user";
import {WebView} from "react-native-webview";

export default class SearchResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true, resultList: [], webViewHeight: {}}
        getUserId().then(value => {
            fetch(RomoteURL + '/medicine/query' + `?key=${this.props.navigation.state.params.searchKey}&user.id=${value}`)
                .then(response => {
                    return response.json();
                })
                .then((response) => {
                    this.setState({
                        resultList: response,
                        isLoading: false,
                    });
                });
        })
    }


    renderItem = ({item, index}) => {
        let lis = ''
        Object.keys(item.hits).forEach(v => {
            if (v == 'name.keyword') {
                return
            }
            lis = lis + '<li>' + v + '：' + item.hits[v] + '</li>'
        })

        let html = `<div style='font-size: 14px;'>
                              <ul style="padding-left: 5px">
                              ${lis}
                                </ul>
                               </div>`
        return (
            <TouchableOpacity key={index} onPress={() => {
                this.props.navigation.push('MedicineDetailPage', {
                    medicineId: item.name,
                });
            }} activeOpacity={0.7}>
                <Card full>
                    <Card.Header
                        title={item.name}
                    />
                    <Card.Body>
                        <View style={{marginLeft: 16, marginRight: 16}}>
                            <WebView
                                key={`webview-${index}`}
                                style={{height: this.state.webViewHeight[`webview-${index}`] || 50}}
                                source={{html: html}}
                                ref={`webview-${index}`}
                                scalesPageToFit={Platform.OS === 'ios' ? true : false}
                                onMessage={async (e) => {
                                    e.persist()
                                    console.log(e.nativeEvent.data);
                                    this.setState(pre => {
                                        pre.webViewHeight[`webview-${index}`] = parseInt(e.nativeEvent.data)+5
                                        return pre
                                    })
                                }}
                                allowsInlineMediaPlayback={true}
                                startInLoadingState={true}
                                javaScriptEnabled={true}
                                injectedJavaScript={`window.ReactNativeWebView.postMessage(document.body.scrollHeight)`}
                            >
                            </WebView>
                        </View>
                    </Card.Body>
                </Card>
            </TouchableOpacity>)
    };

    render() {

        return (
            <>
                <ActivityIndicator toast animating={this.state.isLoading} size="large"/>
                <FlatList
                    ref={ref => {
                        this.flatList = ref;
                    }}
                    data={this.state.resultList}
                    renderItem={this.renderItem}
                    refreshing={true}
                    ListHeaderComponent={
                       ( <View style={{backgroundColor:'white'}}>
                            <Text style={{fontSize: 16, marginLeft: 16, marginRight: 16, marginTop: 16}}>
                                您的搜索关键词是:{this.props.navigation.state.params.searchKey}
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 16,
                                marginRight: 16,
                                marginTop: 16,
                                marginBottom: 16
                            }}>
                                共搜索到{this.state.resultList.reduce((pre, current) => {
                                return pre + Object.keys(current.hits).length
                            }, 0)}种结果,涉及{this.state.resultList.length}类中药
                            </Text></View>)}
                    removeClippedSubviews={true}
                    windowSize={11}
                    maxToRenderPerBatch={20}
                    initialNumToRender={20}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({});

