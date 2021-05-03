import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Colors, Strings } from "../../constants";
import { useAppDispatch } from "../../../store/hooks";
import { receiveSession } from "../../../store/modules/session/session_slice";
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
    readonly username: string;
    readonly password: string;
    readonly hasLoginError: boolean;
}

/**
 * Scene initial stae
 */
const initialLoginState: LoginState = {
    username: "",
    password: "",
    hasLoginError: false,
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
        const { username, password } = state;
        if (!!username && !!password) {
            dispatch(receiveSession({ username, password }));
            navigation.navigate("Home");
            return;
        }

        setState({ ...state, hasLoginError: true });
    };

    const onChangeText = (stateKey: string) => (text: string) => {
        setState({ ...state, [stateKey]: text, hasLoginError: false });
    };

    /**
     * Data
     */
    const { hasLoginError } = state;

    /**
     * Template
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Mixins.container}>
                <Text style={styles.title}>{Strings.login.title}</Text>
                {hasLoginError && (
                    <Text style={styles.error}>
                        {Strings.login.missingUsernameOrPasswordError}
                    </Text>
                )}
                <LoginFrom
                    username={state.username}
                    password={state.password}
                    onChangeText={onChangeText}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={styles.btnText}>
                            {Strings.login.loginBtnTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
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

    btnContainer: {
        alignItems: "center",
    },
    btn: {
        backgroundColor: Colors.primary,
        width: "50%",
        borderRadius: 10,
        padding: Size.xsmall,
    },
    btnText: {
        color: Colors.white,
        fontSize: Size.small,
        textAlign: "center",
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
