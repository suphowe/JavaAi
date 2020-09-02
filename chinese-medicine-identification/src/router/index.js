import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, StackViewStyleInterpolator} from 'react-navigation-stack';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BootPage from '../page/boot-page';
import MedicineDetailPage from '../page/medicine-detail-page';
import Colors from '../util/colors';
import ResultPage from '../page/result-page';
import CameraPage from '../page/camera-page';
import MinePage from '../page/mine-page';
import AboutPage from '../page/about-page';
import HomePage from '../page/home-page';
import ProblemListPage from '../page/problem-page/list'
import ProblemInfoPage from '../page/problem-page/info'
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import {DeviceEventEmitter, View,Easing,Animated} from 'react-native';
import HistoryListPage from "../page/history-page";
import ProblemAddPage from "../page/problem-page/add";
import SearchResultPage from "../page/search-result-page";
//第三大导航
//底部导航栏
const TabNavigator = createBottomTabNavigator(
    {
        Index: {
            screen: HomePage,
            navigationOptions: ({navigation}) => ({
                title: '首页',
                header: null,
                tabBarIcon: (navigation) =>
                    (
                        navigation.focused ? <IconFill name="home" size={23} color={navigation.tintColor}/>
                            : <View style={{elevation: 8}}>
                                <IconOutline name="home" size={23} color={navigation.tintColor}/>
                            </View>
                    )
                ,
            }),
        },
        Photo: {
            screen: CameraPage,
            navigationOptions: ({navigation}) => ({
                title: '拍照',
                header: null,
                tabBarIcon: (navigation) =>
                    (
                        <View style={{
                            marginBottom: 20,
                            borderRadius: 19,
                            width: 38.5,
                            height: 38.5,
                            backgroundColor: '#3e4138',
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 8,
                        }}>
                            <IconOutline name={'camera'} size={23} color={Colors.statusBarColor}/>
                        </View>
                    ),
                tabBarLabel: '识别',
                tabBarOnPress: (tab) => {
                    DeviceEventEmitter.emit('launchCamera', {});
                },
            }),

        },
        MinePage: {
            screen: MinePage,
            navigationOptions: ({navigation}) => ({
                title: '我的',
                tabBarIcon: (navigation) => (
                    navigation.focused ? <FontAwesome name="user" size={24.5} color={navigation.tintColor}/>
                        : <View style={{elevation: 8}}>
                            <FontAwesome name="user-o" size={21} color={navigation.tintColor}/>
                        </View>
                ),
            }),
        },
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.activeTintColor,
            inactiveTintColor: Colors.inactiveTintColor,
        },
        backBehavior: 'none',
        animationEnabled: true,
        lazy: false,
        defaultNavigationOptions: {}
    },
);

//第二大导航,添加不显示底部导航的页面使用此导航
const HomeNavigator = createStackNavigator({
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                header: null,
            },
        },
        MedicineDetailPage: {
            screen: MedicineDetailPage,
            navigationOptions: ({navigation}) => ({
                title: String(navigation.state.params.medicineId),
            }),
        },
        ResultPage: {
            screen: ResultPage,
            navigationOptions: ({navigation}) => ({
                title: '预测结果',
            }),
        },
        AboutPage: {
            screen: AboutPage,
            navigationOptions: ({navigation}) => ({
                title: '关于',
            }),
        },
        ProblemListPage: {
            screen: ProblemListPage,
            navigationOptions: ({navigation}) => ({
                title: '问题社区',
            }),
        },
        ProblemInfoPage: {
            screen: ProblemInfoPage,
            navigationOptions: ({navigation}) => ({
                title: '问题详情',
            }),
        },
        ProblemAddPage: {
            screen: ProblemAddPage,
            navigationOptions: ({navigation}) => ({
                title: '提问',
            }),
        },
        HistoryListPage: {
            screen: HistoryListPage,
            navigationOptions: ({navigation}) => ({
                title: '历史记录',
            }),
        },
        SearchResultPage: {
            screen: SearchResultPage,
            navigationOptions: ({navigation}) => ({
                title: '搜索结果',
            }),
        }

    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.statusBarColor,
                headerTitleStyle: {
                    marginLeft: -5,
                },
            },
        },
        lazy: false,
        headerMode: 'screen',
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
        // transitionConfig: () => ({
        //     transitionSpec: {
        //         duration: 300,
        //         easing: Easing.out(Easing.poly(4)),
        //         timing: Animated.timing,
        //     },
        //     screenInterpolator: sceneProps => {
        //         const {layout, position, scene} = sceneProps;
        //         const {index} = scene;
        //         const Width = layout.initWidth;
        //         //沿X轴平移
        //         const translateX = position.interpolate({
        //             inputRange: [index - 1, index, index + 1],
        //             outputRange: [Width, 0, -(Width - 10)],
        //         });
        //         //透明度
        //         const opacity = position.interpolate({
        //             inputRange: [index - 1, index - 0.99, index],
        //             outputRange: [0, 1, 1],
        //         });
        //         return {opacity, transform: [{translateX}]};
        //     }
        // })
    }
);


//第一大导航
const AppNavigator = createSwitchNavigator(
    {
        BootNavigator: {
            screen: BootPage,
        },
        HomeNavigator: {
            screen: HomeNavigator,
        },
    },
    {
        initialRouteName: 'BootNavigator',
        defaultNavigationOptions: {
            header: null,
        },
        lazy: false,
    },
);

function renderTabBarIcon({focused, horizontal, tintColor}) {
    let iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    return <Ionicons name={iconName} size={25} color={tintColor}/>;
}

export default createAppContainer(AppNavigator);


