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
 * Component props
 */
interface SendCoinProps {
    readonly toAddress: string;
    readonly coinAmount: string;
    readonly onChangeText: (stateKey: string) => (text: string) => void;
    readonly handleSendCoin: () => void;
}

/**
 * Template
 */
const SendCoin = ({
    toAddress,
    coinAmount,
    onChangeText,
    handleSendCoin,
}: SendCoinProps) => {
    return (
        <View>
            <TextInput
                onChangeText={onChangeText("toAddress")}
                placeholder={Strings.home.toAddressPlaceholder}
                style={styles.input}
                value={toAddress}
            />
            <TextInput
                onChangeText={onChangeText("amount")}
                placeholder={Strings.home.coinAmountPlaceholder}
                style={styles.input}
                value={coinAmount}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleSendCoin}>
                    <Text style={styles.btnText}>
                        {Strings.home.sendCoinBtnTitle}
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
export default SendCoin;
