import {Dimensions, ScrollView, StatusBar, Text, View} from 'react-native'
import React, {Component} from 'react'
import {ActivityIndicator, Button, Flex, Icon, List, TextareaItem, WingBlank} from '@ant-design/react-native';
import RomoteURL from "../../util/remote-url";
import {getUserId} from "../../util/user";

const {width, height} = Dimensions.get('window')
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen')
const StatusBarHeight = StatusBar.currentHeight;
export default class ProblemInfoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {inputText: '', isLoading: true, answerList: [], problemInfo: {}}
        this.questionId = this.props.navigation.state.params.questionId
        getUserId().then(value => {
            fetch(RomoteURL + '/question' + `?userId=${value}&questionId=${this.questionId}`, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then((response) => {
                console.log('/question', response);
                this.setState({
                    problemInfo: response,
                    isLoading: false,
                });
            });
        })

        fetch(RomoteURL + '/question/answer/all' + `?questionId=${this.questionId}`, {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then((response) => {
            console.log('answerList',response);
            this.setState({
                answerList: response,
            });
        });


    }

    render() {
        return (
            <>
                <ActivityIndicator toast animating={this.state.isLoading} size="large"/>
                <ScrollView>
                    <View>
                        <WingBlank>
                            <Text style={styles.title}>
                                {this.state.problemInfo.title}
                            </Text>

                            <Text style={styles.title}>
                                {this.state.problemInfo.content}
                            </Text>
                            <WingBlank style={styles.note}>
                                <Flex justify="end">
                                    <Icon name="eye" size="md" color="#a3a3a3"/>
                                    <Text>
                                        20万
                                    </Text>
                                    <Text style={styles.answerNumber}>
                                        12万回答
                                    </Text>
                                </Flex>
                            </WingBlank>

                            <View style={{height: 1, backgroundColor: '#d6d6d6', marginTop: 15}}/>
                            <View style={styles.content}>
                                <List>
                                    {
                                        this.state.answerList.map(value =>
                                            (

                                                <List.Item wrap>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    {value.content}
                                                </List.Item>
                                            )
                                        )
                                    }
                                </List>
                            </View>
                        </WingBlank>
                    </View>
                </ScrollView>
                <Flex style={styles.textInputView}>
                    <View style={styles.textInputView.textInput}>
                        <TextareaItem
                            rows={1}
                            count={200}
                            clear
                            value={this.state.inputText}
                            onChange={value => {
                                this.setState({
                                    inputText: value
                                })
                            }}
                        />
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Button onPress={() => {
                            if (this.state.inputText !== '') {
                                this.setState({
                                    isLoading: true
                                })
                                getUserId().then(value => {
                                    fetch(RomoteURL + '/question/answer', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            user: {
                                                id: value,
                                            },
                                            question: {
                                                id: this.questionId
                                            },
                                            content: this.state.inputText
                                        })
                                    })
                                        .then(response => {
                                            return response.json();
                                        })
                                        .then((response) => {
                                            console.log('/question/answer', response);
                                            this.setState((prevState) => {
                                                prevState.answerList.push(response)
                                                prevState.isLoading = false
                                                prevState.inputText=''
                                                return prevState
                                            });
                                        });
                                })
                            }
                        }} type={'primary'} size="small" style={{height: 30, width: 55}}>发送</Button>
                    </View>
                </Flex>
            </>
        );
    }
}
const styles = {
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    content: {marginTop: 20},
    note: {
        marginTop: 20
    },
    answerNumber: {
        marginLeft: 15
    },
    textInputView: {
        width: width,
        marginLeft: 10,
        height: 50,
        backgroundColor: 'white',
        borderTopColor: '#bcbcbc',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        position: 'absolute',
        top: height - 130,
        marginRight: 10,
        textInput: {
            flex: 4
        }
    },
};
