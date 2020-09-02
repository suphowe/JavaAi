import {FlatList, Image, Keyboard, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {ActivityIndicator, Grid, Picker, SearchBar, WhiteSpace, WingBlank} from '@ant-design/react-native';
import RomoteURL from '../../util/remote-url';
import Colors from '../../util/colors';

export default class Index extends Component {
    renderItem = ({item, index}) => {
        return (
            <View style={{padding: 10}} key={index}>
                <Text
                    style={{
                        backgroundColor: 'white',
                        fontSize: 18,
                        borderBottomWidth: 1,
                        borderBottomColor: '#DBDBDB',
                    }}
                >
                    {'  ' + item.name}
                </Text>
                <Grid data={item.details}
                      isCarousel={true}
                      columnNum={3}
                      renderItem={(el, index) => (
                          <View style={{alignItems: 'center', marginTop: 35}} key={index}>
                              <Image
                                  progressiveRenderingEnabled={true}
                                  source={{uri: el.icon || 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                                  style={{height: 30, width: 30, borderRadius: 15}}/>
                              <Text style={{textAlign: 'center', fontSize: 12.5, marginTop: 10}}>{el.text}</Text>
                          </View>
                      )}
                      carouselMaxRow={2}
                      onPress={(v) => {
                          this.props.navigation.push('MedicineDetailPage', {medicineId: v.text});
                      }}
                      hasLine={false}/>
            </View>

        );
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            isFocus: false,
            searchKey: ''
        };
        this.constData = [];
        fetch(RomoteURL + '/get-all-medicine-outlines')
            .then(response => {
                return response.json();
            })
            .then((response) => {
                this.constData = response;
                this.setState({
                    data: [...response],
                    loading: false,
                });
            });
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={Colors.statusBarColor}
                           barStyle="dark-content"
                           translucent={false}/>

                <SafeAreaView style={{marginBottom: 60}}>
                    <View style={{
                        backgroundColor: '#F0EFF4',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: 55,
                        borderBottomColor: '#eaeaea',
                        borderBottomWidth: 1
                    }}>
                        <View style={{width: 310, boxShadow: '10 10 5 #888888'}}>
                            <SearchBar
                                placeholder="搜索"
                                value={this.state.searchKey}
                                onCancel={()=>{
                                    this.setState({
                                        searchKey:''
                                    })
                                    Keyboard.dismiss()
                                }}
                                onSubmit={() => {
                                    console.log('这是搜索这状态')
                                    Keyboard.dismiss()
                                    this.props.navigation.push('SearchResultPage', {
                                        searchKey: this.state.searchKey,
                                    });
                                }}
                                onChange={(value) => {
                                    this.setState({
                                        searchKey: value
                                    })
                                }}
                                onFocus={() => {
                                    this.setState({
                                        isFocus: true
                                    })
                                }}
                                onBlur={() => {
                                    this.setState({
                                        isFocus: false
                                    })
                                }}
                                cancelText={'取消'}
                            />
                        </View>
                        <View style={{weight: 10, paddingRight: 7}}>
                            {
                                this.state.isFocus ?
                                    <Text style={{fontSize: 16, color: '#2688CF'}}
                                          onPress={(e) => {
                                              console.log('这是搜索这状态')
                                              Keyboard.dismiss()
                                              this.props.navigation.push('SearchResultPage', {
                                                  searchKey: this.state.searchKey,
                                              });
                                              this.setState({
                                                  searchKey:''
                                              })
                                          }}>
                                        确定
                                    </Text> : <WingBlank size="sm">
                                        <Picker
                                            data={
                                                this.constData.map((v) => {
                                                    return {value: v.name, label: v.name};
                                                })
                                            }
                                            cols={1}
                                            disabled={this.state.data.length !== this.constData.length}
                                            onOk={async (res) => {
                                                this.setState({
                                                    loading: true,
                                                });
                                                this.setState({
                                                    data: this.constData.filter(v => {
                                                        if (v.name === res[0]) {
                                                            return v;
                                                        }
                                                    }),
                                                    loading: false,
                                                });
                                            }}>
                                            <Text style={{fontSize: 16, color: '#2688CF'}}
                                                  onPress={(e) => {
                                                      console.log('这是筛选这状态')
                                                      if (this.state.isLoading) {
                                                          return
                                                      }
                                                      Keyboard.dismiss();
                                                      if (this.state.data.length !== this.constData.length) {
                                                          console.log('这是清除！');
                                                          this.setState({
                                                              loading: true,
                                                              data: this.constData,

                                                          })
                                                          setTimeout(() => {
                                                              this.setState({
                                                                  loading: false,

                                                              })
                                                          }, 500)
                                                      }

                                                  }}>
                                                {this.state.data.length < this.constData.length ? '清除' : '筛选'}
                                            </Text>


                                        </Picker>
                                    </WingBlank>
                            }
                        </View>
                    </View>

                    <WhiteSpace size="sm"/>
                    {
                        this.state.loading ?
                            <View style={{marginTop: 210}}>
                                <ActivityIndicator size="large" text={'请稍等. . .'}/>
                            </View> :
                            <FlatList
                                ref={ref => {
                                    this.flatList = ref;
                                }}
                                data={this.state.data}
                                renderItem={this.renderItem}
                                refreshing={true}
                                removeClippedSubviews={true}
                                windowSize={21}
                                maxToRenderPerBatch={21}
                                initialNumToRender={21}
                            />

                    }

                </SafeAreaView>
            </>
        );
    }


};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#aab',
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: '#fff',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

