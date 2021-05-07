import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Size, Colors, Strings } from "../../../constants";
import { useAppDispatch } from "../../../../store/hooks";

/**
 * Template
 */
const LogoutButton = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    return (
        <>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    dispatch({ type: "LOGOUT" });
                    navigation.navigate("Login");
                }}
            >
                <Text style={styles.btnText}>{Strings.home.logout}</Text>
            </TouchableOpacity>
        </>
    );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
    btn: {
        marginRight: Size.xsmall,
    },
    btnText: {
        fontSize: Size.xsmall,
        color: Colors.primary,
    },
});

/**
 * Export
 */
export default LogoutButton;
