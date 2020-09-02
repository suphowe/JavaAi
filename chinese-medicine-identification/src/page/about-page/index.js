import {Dimensions, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import Colors from '../../util/colors';

const {height, width} = Dimensions.get('window');
export default class Index extends Component {

    constructor(props) {
        super(props);
    }
    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <StatusBar backgroundColor={Colors.statusBarColor}
                           barStyle="dark-content"
                           translucent={false}/>
                <View style={{alignItems: 'center', backgroundColor: 'rgb(236,236,236)', height: height}}>
                    <View style={{height: 50}}></View>
                    <View style={{elevation:20}}>
                        <Image source={{uri: 'mipmap/ic_launcher_1'}}
                               style={{width: 58, height: 58}}
                        />
                    </View>
                    <View style={{marginTop: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>中药识别</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}> v2.1 </Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    position: 'absolute',
                    bottom:18,
                    width:width,
                    color:'#ACB1B4'
                }}>
                    <Text style={{fontSize: 13,textAlign:'center'}}>
                        Copyright © 2020 小浩
                    </Text>
                    <Text style={{textAlign: 'center',fontSize:11}}>
                         Chinese Medicine Identification is licensed under the Mulan PSL v1
                    </Text>
                </View>
            </>
        );
    }
}



