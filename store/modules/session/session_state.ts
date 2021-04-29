export interface Session {
    readonly username: string;
    readonly password: string;
}

export const initialSessionState: Session = {
    username: "",
    password: "",
};
