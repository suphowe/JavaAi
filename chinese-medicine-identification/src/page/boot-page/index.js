/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Dimensions, Image, PermissionsAndroid, StatusBar, Text, ToastAndroid, View} from 'react-native';
import {Button} from '@ant-design/react-native';

import React, {Component} from 'react';
import {saveUser} from "../../util/user";

async function checkPermissions() {
    const permissions = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
    );
    if (permissions[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show('获取相机权限失败！', ToastAndroid.SHORT);
    } else if (permissions[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show('获取读写权限失败！', ToastAndroid.SHORT);
    } else {
        // ToastAndroid.show('获取全部权限成功！', 0.2);
    }
}

const {height, width} = Dimensions.get('window');
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 3
        }
        saveUser();
        this.interval = setInterval(() => {
            if (this.state.seconds === 0) {
                clearInterval(this.interval)
                this.props.navigation.navigate('Home');
            } else {
                this.setState({
                    seconds: this.state.seconds - 1
                })
            }
        }, 1000)
    }

    componentDidMount(): void {
        checkPermissions();
    }

    componentWillUnmount(): void {
        clearInterval(this.interval)
    }

    render(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
        return (
            <>
                <StatusBar hidden={true}/>
                <View style={{alignItems: 'center', backgroundColor: 'rgb(255,255,255)', height: height}}>
                    <View style={{height: height / 4}}/>
                    <View style={{elevation: 20}}>
                        <Image source={{uri: 'mipmap/ic_launcher_1'}}
                               style={{width: 58, height: 58}}
                        />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>中药识别</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}> v2.1 </Text>
                    </View>
                    <View style={{position: 'absolute', bottom: 200}}>
                        <Image source={{uri: 'drawable/font'}}
                               style={{
                                   width: width - 40, height: 60, resizeMode: 'contain',
                               }}
                        />
                    </View>
                </View>

                <View style={{width: 60, position: 'absolute', bottom: 50, right: 20}}>
                    <Button
                        type="ghost"
                        size={'small'}
                        onPress={() => {
                            this.props.navigation.navigate('Home');
                        }}
                        style={{
                            borderColor: '#c1c4cb',
                            backgroundColor: '#c1c4cb'
                        }}
                    >
                        <Text style={{color: 'black', fontSize: 13}}>
                            跳过 {this.state.seconds}
                        </Text>
                    </Button>
                </View>
            </>
        );
    }
}

