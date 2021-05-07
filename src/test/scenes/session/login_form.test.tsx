import * as React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { shallow } from "enzyme";
import LoginForm from "../../../scenes/session/components/login_form";

describe("<LoginForm/>", () => {
    it("it should call handleLogin when pressed", () => {
        const mockHandleLogin = jest.fn();
        const mockOnChangeText = (stateKey: string) => (text: string) => {
            // no op
        };

        const wrapper = shallow(
            <LoginForm
                jobcoinAddress="Alice"
                onChangeText={mockOnChangeText}
                handleLogin={mockHandleLogin}
            />
        );

        const test = wrapper.find(TouchableOpacity);
        const onPress = test.invoke("onPress");
        if (onPress) {
            onPress({} as GestureResponderEvent);
        }

        expect(mockHandleLogin).toHaveBeenCalled();
    });
});

export {};
