/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './src/router';
import {Provider} from '@ant-design/react-native';
const App: () => React$Node = () => {
    return (
        <>
            <Provider>
                <AppNavigator/>
            </Provider>
        </>
    );
};
export default App;
