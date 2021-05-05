import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Strings } from "../../constants";
import { useAppSelector } from "../../../store/hooks";
import {
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from "victory-native";
import { calcBalances } from "../../utils/balance_utils";
import SendCoin from "./components/send_coin";
// import { addDays, subtractDays } from "../../utils/date_utils";

const test = [new Date(2021, 1, 1), new Date(2021, 12, 1)];

interface HomeState {
    readonly coinAmount: string;
    readonly toAddress: string;
    readonly isFormValid: boolean;
}

const initialHomeState: HomeState = {
    coinAmount: "",
    toAddress: "",
    isFormValid: false,
};

const Home = () => {
    const [state, setState] = React.useState(initialHomeState);
    const { session, jobcoin } = useAppSelector((appstate) => appstate);
    const balanceHistory = calcBalances(
        session.jobcoinAddress,
        jobcoin.transactions
    );

    const onChangeText = (stateKey: string) => (text: string) => {
        setState({
            ...state,
            [stateKey]: text,
            isFormValid: false,
        });
    };

    const handleSendCoin = () => {
        // do stuff
    };

    const { toAddress, coinAmount } = state;
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

                {jobcoin.transactions.length > 0 && (
                    <View>
                        <VictoryChart
                            width={350}
                            theme={VictoryTheme.material}
                            scale={{ x: "time" }}
                        >
                            <VictoryAxis tickFormat={(x) => x.split("T")[0]} />
                            <VictoryAxis dependentAxis tickFormat={(y) => y} />
                            <VictoryLine
                                data={balanceHistory}
                                x="timestamp"
                                y="balance"
                            />
                        </VictoryChart>
                    </View>
                )}
                <Text style={styles.balance}>
                    {`Your balance: $${jobcoin.balance || 0}`}
                </Text>
                <Text style={styles.sendCoin}>{Strings.home.sendCoin}</Text>
                <SendCoin
                    toAddress={toAddress}
                    coinAmount={coinAmount}
                    onChangeText={onChangeText}
                    handleSendCoin={handleSendCoin}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: Size.large,
        marginTop: Size.medium,
        textAlign: "center",
    },
    jobcoinAddress: {
        textAlign: "center",
        fontSize: Size.medium,
        marginBottom: Size.xxlarge,
    },
    balance: {
        fontSize: Size.small,
        marginBottom: Size.medium,
    },
    sendCoin: {
        fontSize: Size.small,
        marginBottom: Size.xxsmall,
    },
});

export default Home;
