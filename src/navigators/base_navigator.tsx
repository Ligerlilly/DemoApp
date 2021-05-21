import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Scenes
 */
import Login from "../scenes/session/login";
import Home from "../scenes/home/home";

/**
 * Components
 */
import LogoutBtn from "../scenes/home/components/logout_button";

/**
 * Navigators
 */
import Onboarding from "./onboarding";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Onboarding: undefined;
    Scene1: undefined;
    Scene2: undefined;
    Scene3: undefined;
};

const Stack = createStackNavigator();
function BaseNavigator() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerLeft: () => undefined,
                            headerRight: () => <LogoutBtn />,
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
