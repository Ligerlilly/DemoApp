import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Colors, Strings } from "../../constants";
import { useAppDispatch } from "../../../store/hooks";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";
import LoginForm from "./components/login_form";
import { fetchByJobcoinAddress } from "../../../store/modules/jobcoin/jobcoin_slice";
import { receiveSession } from "../../../store/modules/session/session_slice";

/**
 * Scene props
 */
type LoginProps = StackScreenProps<RootStackParamList, "Login">;

/**
 * Scene state
 */
interface LoginState {
    readonly jobcoinAddress: string;
    readonly isJobcoinAddressdMissing: boolean;
}

/**
 * Scene initial state
 */
const initialLoginState: LoginState = {
    jobcoinAddress: "",
    isJobcoinAddressdMissing: false,
};

const Login = ({ navigation }: LoginProps) => {
    /**
     * Hooks
     */
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(initialLoginState);

    /**
     * Data
     */
    const { isJobcoinAddressdMissing, jobcoinAddress } = state;

    /**
     * Methods
     */
    const handleLogin = () => {
        if (!!jobcoinAddress.trim()) {
            dispatch(fetchByJobcoinAddress(jobcoinAddress));
            dispatch(receiveSession({ jobcoinAddress }));
            navigation.navigate("Home");
            return;
        }

        setState({ ...state, isJobcoinAddressdMissing: true });
    };

    const onChangeText = (stateKey: string) => (text: string) => {
        setState({
            ...state,
            [stateKey]: text,
            isJobcoinAddressdMissing: false,
        });
    };

    /**
     * Template
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Mixins.container}>
                <Text style={styles.title}>{Strings.login.title}</Text>

                {isJobcoinAddressdMissing && (
                    <Text style={styles.error}>
                        {Strings.login.missingJobcoinAddress}
                    </Text>
                )}
                <LoginForm
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
        marginBottom: Size.xxsmall,
    },
});

/**
 * Export
 */
export default Login;
