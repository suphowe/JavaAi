import {ScrollView, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {ActivityIndicator, List} from '@ant-design/react-native';
import {getUserId} from "../../util/user";
import RomoteURL from "../../util/remote-url";

export default class HistoryListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true,historyList:[]}

        getUserId().then(value => {
            fetch(RomoteURL + '/history/all' + `?userId=${value}`, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then((response) => {
                console.log('/history', response);
                this.setState({
                    historyList: response,
                    isLoading: false,
                });
            });
        })
    }

    render() {
        return (
            <>
                <ActivityIndicator toast animating={this.state.isLoading} size="large"/>
                <ScrollView>
                    <List>
                        {
                            this.state.historyList.map((value,index) => (
                                <List.Item wrap>
                                    {index+1+'.'+value.title}&nbsp;&nbsp;&nbsp;&nbsp;{value.content}
                                </List.Item>
                            ))
                        }
                    </List>
                </ScrollView>

            </>
        );
    }
}

const styles = StyleSheet.create({});

