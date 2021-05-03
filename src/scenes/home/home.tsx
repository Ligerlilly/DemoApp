import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Strings } from "../../constants";

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Mixins.container}>
                <Text style={styles.title}>{Strings.home.title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: Size.large,
        marginTop: Size.medium,
        alignSelf: "center",
    },
});

export default Home;
