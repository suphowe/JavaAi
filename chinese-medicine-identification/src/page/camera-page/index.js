import {DeviceEventEmitter, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {Component} from 'react';
import {ActivityIndicator, Portal, Toast} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import RomoteURL from '../../util/remote-url';
import {getUserId} from "../../util/user";

const options = {
    title: '选择图片',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 299,
    maxHeight: 299,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择图库',
    allowsEditing: true,
    noData: false,
    mediaType: 'photo',
};
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toast: false,
        };
        getUserId().then(value => {
            this.userId = value
        })
    }

    launchCamera() {
        console.log('相机开始启动');
        const key = Toast.loading('请等待识别结果...', 0);
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                Portal.remove(key);
            } else if (response.error) {
                Portal.remove(key);
            } else if (response.customButton) {
                Portal.remove(key);
            } else {
                if (response.height !== 299 || response.width !== 299) {
                    Portal.remove(key);
                    ToastAndroid.show('请设置图像分辨率为1:1！', 1);
                    DeviceEventEmitter.emit('launchCamera', {});
                } else {
                    fetch(RomoteURL + '/img', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: {
                                id: this.userId
                            },
                            fileName: response.fileName,
                            fileData: response.data,
                        }),
                    }).then(res => {
                        return res.json();
                    }).then(res => {
                        console.log(res);
                        this.props.navigation.navigate('ResultPage', {
                            toastKey: key,
                            medicineList: res
                        });
                    });
                }
            }
        });
    }


    componentDidMount(): void {
        console.log('相机启动监听');
        this.subscription = DeviceEventEmitter.addListener('launchCamera', (param) => {
            this.launchCamera();
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <View style={{marginTop: 210}}>
                    <ActivityIndicator toast={this.state.toast}
                                       text={this.state.toast ? '请等待识别结果. . .' : '启动相机中. . .'}/>
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({});

