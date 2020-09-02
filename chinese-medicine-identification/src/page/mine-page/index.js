import {Dimensions, Image, ScrollView, Text, ToastAndroid, View} from 'react-native';
import React, {Component} from 'react';
import {List} from '@ant-design/react-native';
import Colors from '../../util/colors';

const {height, width} = Dimensions.get('window');
export default class MinePage extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};

    }

    renderItem(item, index) {
        return (
            <List.Item
                extra={
                    <Text style={{color: '#ACB1B4'}}>{'>'}</Text>
                }
                thumb={
                    <Image source={{uri: `drawable/${item.icon}`}}
                           style={{width: 20, height: 20, marginRight: 15}}/>
                }
                onPress={(e) => {
                    item.onPress(e);
                }}
                key={item.value}
                align="middle"
                style={{height: 52}}
            >
                <Text style={{fontSize: 14.5}}>{item.value}</Text>
            </List.Item>
        );
    }


    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <View style={{
                    height: 45, backgroundColor: Colors.statusBarColor, alignItems: 'center',
                    justifyContent: 'center', elevation: 8, borderBottomColor: '#e0e0e0', borderBottomWidth: 1
                }}>
                    <Text style={{fontSize: 16}}>个人中心</Text>
                </View>
                <ScrollView>
                    <View style={{}}>
                        <Image
                            source={require('../../assets/img/banner.jpg')}
                            style={{width: width, height: 220}}
                        />
                        <List>
                            <View style={{}}>
                                {/*{*/}
                                {/*    this.renderItem({*/}
                                {/*        icon: 'tongzhi', value: '消息通知', onPress: function (e) {*/}
                                {/*            ToastAndroid.show('请期待下一版哦! ^_^', ToastAndroid.SHORT);*/}
                                {/*        },*/}
                                {/*    })*/}
                                {/*}*/}

                                {
                                    this.renderItem({
                                        icon: 'lishijilu', value: '历史记录', onPress: () => {
                                            this.props.navigation.push('HistoryListPage');
                                        },
                                    })
                                }
                                {
                                    this.renderItem({
                                        icon: 'wodetiwen', value: '问题社区', onPress: () => {
                                            this.props.navigation.push('ProblemListPage');
                                        },
                                    })
                                }
                                {/*{*/}
                                {/*    [*/}

                                {/*        {*/}
                                {/*            icon: 'wodeguanzhu', value: '我的关注', onPress: function (e) {*/}
                                {/*                ToastAndroid.show('请期待下一版哦! ^_^', ToastAndroid.SHORT);*/}
                                {/*            },*/}
                                {/*        },*/}
                                {/*        {*/}
                                {/*            icon: 'wodeshoucang', value: '我的收藏', onPress: function (e) {*/}
                                {/*                ToastAndroid.show('请期待下一版哦! ^_^', ToastAndroid.SHORT);*/}
                                {/*            },*/}
                                {/*        },*/}
                                {/*    ].map((value, index) =>*/}
                                {/*        (*/}
                                {/*            this.renderItem(value, index)*/}
                                {/*        ),*/}
                                {/*    )*/}
                                {/*}*/}

                                {
                                    this.renderItem({
                                        icon: 'guanyu', value: '关于', onPress: () => {
                                            this.props.navigation.push('AboutPage');
                                        },
                                    })
                                }

                            </View>
                        </List>

                    </View>

                </ScrollView>
            </>
        );
    }
}

