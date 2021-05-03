import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Size, Strings } from "../../../constants";

/**
 * Scene props
 */
interface LoginFormProps {
    readonly username: string;
    readonly password: string;
    onChangeText: (stateKey: string) => (text: string) => void;
}

/**
 * Template
 */
const LoginForm = ({ username, password, onChangeText }: LoginFormProps) => {
    return (
        <View style={styles.wrapper}>
            <TextInput
                onChangeText={onChangeText("username")}
                placeholder={Strings.login.usernameInputPlaceholder}
                style={styles.input}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText("password")}
                placeholder={Strings.login.passwordInputPlaceholder}
                value={password}
            />
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
        margin: Size.xsmall,
        borderWidth: 1,
        padding: Size.xxsmall,
    },
});

/**
 * Export
 */
export default LoginForm;
