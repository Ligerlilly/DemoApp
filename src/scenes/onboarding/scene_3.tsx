import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size } from "../../constants";

const Scene3 = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: Size.large }}>Scene3</Text>
            </View>
        </SafeAreaView>
    );
};

export default Scene3;
