/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import BaseNavigator from "./src/navigators/base_navigator";

const App = () => {
    return (
        <Provider store={store}>
            <BaseNavigator />
        </Provider>
    );
};

export default App;
