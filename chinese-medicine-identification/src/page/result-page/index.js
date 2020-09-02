import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Colors from '../../util/colors';
import {Portal, Toast} from '@ant-design/react-native';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.medicineList=Object.entries(this.props.navigation.state.params.medicineList)
    }


    componentDidMount(): void {
        Portal.remove(this.props.navigation.state.params.toastKey);
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <>
                <StatusBar backgroundColor={Colors.statusBarColor} barStyle="dark-content"
                           translucent={false}/>
                <ScrollView>
                    {this.medicineList.map(v => {
                        return (
                            <>
                              <View key={v[0]}>
                                  <TouchableOpacity activeOpacity={0.6} onPress={() => {
                                      this.props.navigation.push('MedicineDetailPage', {
                                          medicineId: v[0],
                                      });
                                  }}>

                                      <View style={{
                                          flexDirection: 'row', height: 100,
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                      }}

                                      >
                                          <View style={{
                                              flexDirection: 'row',
                                              marginLeft: 25,
                                              alignItems: 'center',
                                          }}>
                                              <Image style={{width: 35, height: 35, marginRight: 25}}
                                                     source={{uri: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'}}></Image>
                                              <Text style={{fontSize: 18}}>
                                                  {v[0]}
                                              </Text>
                                          </View>
                                          <Text style={{marginRight: 20}}>
                                              置信度：{ Math.round(parseFloat(v[1])*100)}% >
                                          </Text>
                                      </View>
                                  </TouchableOpacity>
                                  <View style={{borderBottomWidth: 0.2, borderColor: 'gray'}}/>
                              </View>
                            </>
                        );
                    })}
                </ScrollView>

            </>
        );
    }
}


const styles = StyleSheet.create({});

