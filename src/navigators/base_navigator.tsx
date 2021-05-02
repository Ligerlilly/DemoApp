import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Scenes
 */
import Login from "../scenes/session/login";
import Home from "../scenes/home/home";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};

const Stack = createStackNavigator();
function BaseNavigator() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerLeft: () => undefined,
                            headerShown: true,
                            title: "Home",
                        }}
                    />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

export default BaseNavigator;
