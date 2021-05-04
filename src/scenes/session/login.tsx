import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Colors, Strings } from "../../constants";
import { useAppDispatch } from "../../../store/hooks";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";
import LoginFrom from "./components/login_form";

/**
 * Scene props
 */
type LoginProps = StackScreenProps<RootStackParamList, "Login">;

/**
 * Scene state
 */
interface LoginState {
    readonly jobcoinAddress: string;
    readonly isUsernameOrPasswordMissing: boolean;
    readonly isEmailInvalid: boolean;
}

/**
 * Scene initial stae
 */
const initialLoginState: LoginState = {
    jobcoinAddress: "",
    isUsernameOrPasswordMissing: false,
    isEmailInvalid: false,
};

const Login = ({ navigation }: LoginProps) => {
    /**
     * Hooks
     */
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(initialLoginState);

    /**
     * Methods
     */
    const handleLogin = () => {
        const { jobcoinAddress } = state;
        // if (!validateEmail(username)) {
        //     setState({ ...state, isEmailInvalid: true });
        //     return;
        // }

        if (!!jobcoinAddress.trim()) {
            // dispatch(receiveSession({ username, password }));
            navigation.navigate("Home");
            return;
        }

        setState({ ...state, isUsernameOrPasswordMissing: true });
    };

    const onChangeText = (stateKey: string) => (text: string) => {
        setState({
            ...state,
            [stateKey]: text,
            isUsernameOrPasswordMissing: false,
            isEmailInvalid: false,
        });
    };

    /**
     * Data
     */
    const {
        isUsernameOrPasswordMissing,
        isEmailInvalid,
        jobcoinAddress,
    } = state;

    /**
     * Template
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Mixins.container}>
                <Text style={styles.title}>{Strings.login.title}</Text>
                {isEmailInvalid && (
                    <Text style={styles.error}>
                        {Strings.login.invalidEmail}
                    </Text>
                )}
                {isUsernameOrPasswordMissing && (
                    <Text style={styles.error}>
                        {Strings.login.missingUsernameOrPasswordError}
                    </Text>
                )}
                <LoginFrom
                    jobcoinAddress={jobcoinAddress}
                    onChangeText={onChangeText}
                    handleLogin={handleLogin}
                />
            </View>
        </SafeAreaView>
    );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
    title: {
        fontSize: Size.large,
        marginTop: Size.xxlarge,
        marginBottom: Size.xxlarge,
        alignSelf: "center",
    },
    error: {
        color: Colors.red,
        fontSize: Size.xsmall,
        textAlign: "center",
    },
});

/**
 * Export
 */
export default Login;
