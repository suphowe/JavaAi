import {
    ScrollView,
    StyleSheet,
    Text,
    DeviceEventEmitter,
    TouchableOpacity,
    View
} from 'react-native'
import React, {Component} from 'react'
import {ActivityIndicator, Card} from '@ant-design/react-native';
import RomoteURL from "../../util/remote-url";
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ProblemListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true, problemList: []}
        this.getAll()
    }

    getAll = () => {
        fetch(RomoteURL + '/question/all')
            .then(response => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    problemList: response,
                    isLoading: false,
                });
            });
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.subscription = DeviceEventEmitter.addListener("REFRESH", (param) => {
            console.log('this.getAll()');
            this.getAll()
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {

        return (
            <>
                <ActivityIndicator toast animating={this.state.isLoading} size="large"/>
                <ScrollView>
                    <View style={{backgroundColor: '#d6d6d6'}}>
                        {
                            this.state.problemList.map(value => (
                                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                    this.props.navigation.push('ProblemInfoPage', {
                                        questionId: value.id,
                                    });
                                }}>
                                    <Card full>
                                        <Card.Header
                                            title={value.title}
                                        />
                                        <Card.Body>
                                            <View style={{height: 42}}>
                                                <Text style={{marginLeft: 16}}>{value.content}</Text>
                                            </View>
                                        </Card.Body>
                                        <Card.Footer content="230阅读量" extra="5回答"/>
                                    </Card>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => {
                    this.props.navigation.push('ProblemAddPage');
                }}>
                    <Icon name='edit' size={25} color={'white'}/>
                </TouchableOpacity>
            </>
        );
    }
}


const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 80,
        width: 50,
        height: 50,
        right: 50,
        backgroundColor: '#526dfa',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    }
});

