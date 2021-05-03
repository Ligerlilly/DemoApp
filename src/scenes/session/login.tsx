import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Colors, Strings } from "../../constants";
import { useAppDispatch } from "../../../store/hooks";
import { receiveSession } from "../../../store/modules/session/session_slice";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";
import LoginFrom from "./components/login_form";
import { validateEmail } from "../../utils/email_utils";

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
    readonly isUsernameOrPasswordMissing: boolean;
    readonly isEmailInvalid: boolean;
}

/**
 * Scene initial stae
 */
const initialLoginState: LoginState = {
    username: "",
    password: "",
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
        const { username, password } = state;
        if (!validateEmail(username)) {
            setState({ ...state, isEmailInvalid: true });
            return;
        }

        if (!!username.trim() && !!password.trim()) {
            dispatch(receiveSession({ username, password }));
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
    const { isUsernameOrPasswordMissing, isEmailInvalid } = state;

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
