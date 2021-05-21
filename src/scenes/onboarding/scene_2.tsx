import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";
import { Colors, Size } from "../../constants";

/**
 * Scene props
 */
type Scene2Props = StackScreenProps<RootStackParamList, "Scene2">;

const Scene2 = ({ navigation }: Scene2Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: Size.large }}>Scene2</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary,
                        width: "50%",
                        borderRadius: 10,
                        padding: Size.xsmall,
                    }}
                    onPress={() => {
                        navigation.navigate("Scene3");
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Scene3</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Scene2;
