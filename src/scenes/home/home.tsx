import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Size, Mixins, Strings } from "../../constants";

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    ...Mixins.container,
                }}
            >
                <Text
                    style={{
                        fontSize: Size.large,
                        marginTop: Size.medium,
                        alignSelf: "center",
                    }}
                >
                    {Strings.home.title}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;
