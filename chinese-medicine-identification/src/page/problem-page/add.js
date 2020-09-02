import React, {Component} from 'react'
import {Text, View,DeviceEventEmitter} from 'react-native'

import {Button, Flex, List, TextareaItem, WingBlank} from '@ant-design/react-native';
import RomoteURL from "../../util/remote-url";
import {getUserId} from "../../util/user";

export default class ProblemAddPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            isLoading: false
        }
        getUserId().then(value => {
            this.userId = value
        })
    }


    render() {
        return (
            <>
                <WingBlank style={{marginTop: 0}}>
                    <List>
                        <List.Item wrap>
                            <Flex>
                                <View style={{flex: 1}}>
                                    <Text>标题</Text>
                                </View>
                                <View style={{flex: 5}}>
                                    <TextareaItem
                                        value={this.state.title}
                                        onChange={(value) => {
                                            this.setState({
                                                title: value
                                            })
                                        }}
                                        clear rows={2} last placeholder="标题" count={50}/>
                                </View>
                            </Flex>
                        </List.Item>


                        <List.Item wrap>
                            <Flex align={'start'}>
                                <View style={{flex: 1}}>
                                    <Text>内容</Text>
                                </View>
                                <View style={{flex: 5}}>
                                    <TextareaItem
                                        onChange={(value) => {
                                            this.setState({
                                                content: value
                                            })
                                        }}
                                        clear last rows={12} placeholder="内容" count={500}/>
                                </View>
                            </Flex>
                        </List.Item>

                    </List>

                    <Button loading={this.state.isLoading} disabled={this.state.isLoading} type="primary"
                            onPress={() => {
                                this.setState({
                                    isLoading: true
                                })
                                if (this.state.title !== '') {
                                    fetch(RomoteURL + '/question', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            user: {
                                                id: this.userId
                                            },
                                            title: this.state.title,
                                            content: this.state.content
                                        })
                                    })
                                        .then(response => {
                                            return response.json();
                                        })
                                        .then((response) => {
                                            this.props.navigation.pop()
                                            DeviceEventEmitter.emit("REFRESH");
                                        });
                                } else {
                                    this.setState({
                                        isLoading: false
                                    })
                                }
                            }}>确定</Button>
                </WingBlank>
            </>
        );
    }
}
const styles = {};
