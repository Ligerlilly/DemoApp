export const Size = {
    xxsmall: 8,
    xsmall: 16,
    small: 24,
    medium: 36,
    large: 48,
    xlarge: 56,
    xxlarge: 64,
};

export const Colors = {
    primary: "#5D62F6",
    white: "#fff",
    red: "#FF0000",
};

export const Mixins = {
    centered: {
        alignItems: "center",
    },
    container: {
        flex: 1,
        marginLeft: Size.xsmall,
        marginRight: Size.xsmall,
    },
};

export const Strings = {
    home: {
        title: "Welcome",
    },
    login: {
        title: "Jobcoin",
        loginBtnTitle: "Login",
        jobcoinInputPlaceholder: "jobcoin address",
        missingJobcoinAddress: "Please enter a valid jobcoin address.",
    },
};
