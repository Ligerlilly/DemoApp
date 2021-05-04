import * as React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Size, Strings, Colors } from "../../../constants";

/**
 * Scene props
 */
interface LoginFormProps {
    readonly jobcoinAddress: string;
    readonly onChangeText: (stateKey: string) => (text: string) => void;
    readonly handleLogin: () => void;
}

/**
 * Template
 */
const LoginForm = ({
    jobcoinAddress,
    onChangeText,
    handleLogin,
}: LoginFormProps) => {
    return (
        <View style={styles.wrapper}>
            <TextInput
                onChangeText={onChangeText("jobcoinAddress")}
                placeholder={Strings.login.jobcoinInputPlaceholder}
                style={styles.input}
                value={jobcoinAddress}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Text style={styles.btnText}>
                        {Strings.login.loginBtnTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
    wrapper: {
        marginBottom: Size.xsmall,
    },
    input: {
        height: Size.medium,
        marginBottom: Size.xsmall,
        borderWidth: 1,
        padding: Size.xxsmall,
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
});

/**
 * Export
 */
export default LoginForm;
