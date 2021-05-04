import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Strings } from "../../constants";
import { useAppSelector } from "../../../store/hooks";

const Home = () => {
    const { session } = useAppSelector((appstate) => appstate);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Mixins.container}>
                <Text style={styles.title}>{Strings.home.title}</Text>
                <Text style={styles.jobcoinAddress}>
                    {session.jobcoinAddress}
                </Text>
            </View>
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
    },
});

export default Home;
