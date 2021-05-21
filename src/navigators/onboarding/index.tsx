import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Scnees
 */
import Scene1 from ".././../scenes/onboarding/scene_1";
import Scene2 from ".././../scenes/onboarding/scene_2";
import Scene3 from ".././../scenes/onboarding/scene_3";

const Stack = createStackNavigator();
function Onboarding() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Scene1" component={Scene1} />
            <Stack.Screen name="Scene2" component={Scene2} />
            <Stack.Screen name="Scene3" component={Scene3} />
        </Stack.Navigator>
    );
}

export default Onboarding;
