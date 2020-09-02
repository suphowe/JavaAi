import React, {Component} from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {ActivityIndicator, Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import RomoteURL from '../../util/remote-url';
import Colors from '../../util/colors';
import {getUserId} from "../../util/user";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageContent: {},
            isLoading: true
        };
        getUserId().then(value => {
            fetch(RomoteURL + `/get-medicine-by-name?name=${this.props.navigation.state.params.medicineId}&id=${value}`)
                .then(response => {
                    return response.json()
                })
                .then((response) => {
                    this.setState({
                        pageContent: response,
                        isLoading: false
                    });
                }).catch(reason => {
                this.setState({
                    isLoading: false
                });
            });
        })

    }

    getObjectKey = (item) => {
        return Object.keys(item).filter((k, v) => k !== 'img'
            && k !== '_id' && k !== 'name' && k !== 'img1' && k !== 'img2'&& k !== 'img3');
    };

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <>
            <StatusBar backgroundColor={Colors.statusBarColor} barStyle="dark-content"
                       translucent={false}/>
            <View>
            </View>
            <ActivityIndicator text={'加载中. . .'} toast animating={this.state.isLoading} size="large"/>
            <ScrollView>
                <View>
                    <WhiteSpace size="lg"/>
                    <WingBlank size="md">
                        <Card>
                            <Card.Header
                                title={'中药图片'}
                            />
                            <Card.Body>
                                <Image source={{uri: this.state.pageContent.img}}
                                       style={{width: 310, height: 250, marginLeft: 16}}/>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                </View>

                {
                    this.getObjectKey(this.state.pageContent).map(v =>
                        (
                            <View key={v.toString()}>
                                <WhiteSpace size="lg"/>
                                <WingBlank size="md">
                                    <Card>
                                        <Card.Header
                                            title={v.toString()}
                                        />
                                        <Card.Body>
                                            <View>
                                                <Text
                                                    style={{
                                                        marginLeft: 16,
                                                        marginRight: 16,
                                                    }}>{this.state.pageContent[v.toString()].toString()}</Text>
                                            </View>
                                        </Card.Body>

                                    </Card>
                                </WingBlank>
                            </View>
                        ),
                    )

                }

                {
                    this.state.pageContent.img2 &&
                    <>
                        <WhiteSpace size="lg"/>
                        <WingBlank size="md">
                            <Card>
                                <Card.Header
                                    title={'中药图片'}
                                />
                                <Card.Body>
                                    <Image source={{uri: this.state.pageContent.img2}}
                                           style={{width: 310, height: 250, marginLeft: 16}}/>
                                </Card.Body>
                            </Card>
                        </WingBlank>
                    </>
                }

                {
                    this.state.pageContent.img3 &&
                    <>
                        <WhiteSpace size="lg"/>
                        <WingBlank size="md">
                            <Card>
                                <Card.Header
                                    title={'中药图片'}
                                />
                                <Card.Body>
                                    <Image source={{uri: this.state.pageContent.img3}}
                                           style={{width: 310, height: 250, marginLeft: 16}}/>
                                </Card.Body>
                            </Card>
                        </WingBlank>
                    </>
                }
            </ScrollView>
        </>;
    }
}
