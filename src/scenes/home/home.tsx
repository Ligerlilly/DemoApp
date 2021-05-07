import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Strings, Colors } from "../../constants";
import { useAppSelector } from "../../../store/hooks";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { calcBalances } from "../../utils/balance_utils";
import SendCoin from "./components/send_coin";
import { useAppDispatch } from "../../../store/hooks";
import {
    sendCoinToAddress,
    fetchByJobcoinAddress,
} from "../../../store/modules/jobcoin/jobcoin_slice";

/**
 * Scene state
 */
interface HomeState {
    readonly coinAmount: string;
    readonly toAddress: string;
    readonly isFormInvalid: boolean;
}

/**
 * Scene initial stae
 */
const initialHomeState: HomeState = {
    coinAmount: "",
    toAddress: "",
    isFormInvalid: false,
};

const Home = () => {
    /**
     * Hooks
     */
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState(initialHomeState);
    const { session, jobcoin } = useAppSelector((appstate) => appstate);

    /**
     * Data
     */
    const { toAddress, coinAmount, isFormInvalid } = state;
    const balanceHistory = calcBalances(
        session.jobcoinAddress,
        jobcoin.transactions
    );
    const previousMonth = new Date().getMonth();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    /**
     * Methods
     */
    const onChangeText = (stateKey: string) => (text: string) => {
        setState({
            ...state,
            [stateKey]: text,
            isFormInvalid: false,
        });
    };

    const handleSendCoin = async () => {
        const { jobcoinAddress } = session;

        if (!!toAddress && !!coinAmount) {
            const resp = await dispatch(
                sendCoinToAddress({
                    toAddress,
                    amount: coinAmount,
                    fromAddress: jobcoinAddress,
                })
            );

            if (resp.payload.status === "OK") {
                dispatch(fetchByJobcoinAddress(jobcoinAddress));
                setState(initialHomeState);
                return;
            }
            Alert.alert("We're sorry something went wrong");
            return;
        }

        setState({ ...state, isFormInvalid: true });
    };

    /**
     * Template
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={Mixins.container}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{Strings.home.title}</Text>
                <Text style={styles.jobcoinAddress}>
                    {session.jobcoinAddress}
                </Text>
                {parseFloat(jobcoin.balance) === 0 && (
                    <Text
                        style={styles.noCoins}
                    >{`You don't have any coins`}</Text>
                )}
                {jobcoin.transactions.length > 0 && (
                    <View>
                        <VictoryChart
                            width={350}
                            theme={VictoryTheme.material}
                            scale={{ x: "time" }}
                            domain={{
                                x: [
                                    new Date(currentYear, previousMonth, 1),
                                    new Date(currentYear, currentMonth, 1),
                                ],
                            }}
                        >
                            <VictoryLine
                                data={balanceHistory}
                                x="timestamp"
                                y="balance"
                            />
                        </VictoryChart>
                    </View>
                )}
                {parseFloat(jobcoin.balance) > 0 && (
                    <View>
                        <Text style={styles.balance}>
                            {`Your balance: $${jobcoin.balance || 0}`}
                        </Text>
                        <Text style={styles.sendCoin}>
                            {Strings.home.sendCoin}
                        </Text>
                        {isFormInvalid && (
                            <Text style={styles.error}>
                                {Strings.home.invalidForm}
                            </Text>
                        )}

                        <SendCoin
                            toAddress={toAddress}
                            coinAmount={coinAmount}
                            onChangeText={onChangeText}
                            handleSendCoin={handleSendCoin}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
    title: {
        fontSize: Size.large,
        marginTop: Size.small,
        textAlign: "center",
    },
    jobcoinAddress: {
        textAlign: "center",
        fontSize: Size.medium,
        marginBottom: Size.small,
    },
    balance: {
        fontSize: Size.small,
        textAlign: "center",
        marginBottom: Size.medium,
    },
    sendCoin: {
        fontSize: Size.small,
        marginBottom: Size.xxsmall,
    },
    error: {
        color: Colors.red,
        fontSize: Size.xsmall,
        textAlign: "center",
        marginBottom: Size.xxsmall,
    },
    noCoins: {
        textAlign: "center",
        fontSize: Size.xsmall,
    },
});

/**
 * Export
 */
export default Home;
