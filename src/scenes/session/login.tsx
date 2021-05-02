import * as React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Colors, Strings } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { receiveSession } from "../../../store/modules/session/session_slice";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";

/**
 * Scene props
 */
type Props = StackScreenProps<RootStackParamList, "Login">;

/**
 * Scene state
 */
interface LoginState {
    readonly username: string;
    readonly password: string;
}

/**
 * Scene initial stae
 */
const initialLoginState: LoginState = {
    username: "",
    password: "",
};

const Login = ({ navigation }: Props) => {
    /**
     * Hooks
     */
    const dispatch = useAppDispatch();
    const { session } = useAppSelector((appState) => appState);
    const [state, setState] = React.useState(initialLoginState);

    /**
     * Methonds
     */
    const handleLogin = () => {
        const { username, password } = state;
        if (!!username && !!password) {
            dispatch(receiveSession({ username, password }));
            navigation.navigate("Home");
        }
    };

    /**
     * Template
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    ...Mixins.container,
                }}
            >
                <Text
                    style={{
                        fontSize: Size.large,
                        marginTop: Size.xxlarge,
                        marginBottom: Size.xxlarge,
                        alignSelf: "center",
                    }}
                >
                    {Strings.login.title}
                </Text>
                <View
                    style={{
                        marginTop: Size.xxlarge,
                        marginBottom: Size.xsmall,
                    }}
                >
                    <TextInput
                        onChangeText={(text: string) => {
                            setState({ ...state, username: text });
                        }}
                        placeholder={Strings.login.usernameInputPlaceholder}
                        style={styles.input}
                        value={state.username}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text: string) => {
                            setState({ ...state, password: text });
                        }}
                        placeholder={Strings.login.passwordInputPlaceholder}
                        value={state.password}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={handleLogin}
                    >
                        <Text style={styles.btn}>
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
    input: {
        height: Size.medium,
        margin: Size.xsmall,
        borderWidth: 1,
        padding: Size.xxsmall,
    },
    btnContainer: {
        backgroundColor: Colors.primary,
        width: "50%",
        borderRadius: 10,
        padding: Size.xsmall,
    },
    btn: {
        color: Colors.white,
        fontSize: Size.small,
        textAlign: "center",
    },
});

/**
 * Export
 */
export default Login;
