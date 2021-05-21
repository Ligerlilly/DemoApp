import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigators/base_navigator";
import { Colors, Size } from "../../constants";

/**
 * Scene props
 */
type Scene1Props = StackScreenProps<RootStackParamList, "Scene1">;

const Scene1 = ({ navigation }: Scene1Props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: Size.large }}>Scene1</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary,
                        width: "50%",
                        borderRadius: 10,
                        padding: Size.xsmall,
                    }}
                    onPress={() => {
                        navigation.navigate("Scene2");
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Scene2</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Scene1;
