export type AuthStackParameters = {
    Login: undefined;
    Register: undefined;
    ConfirmRegister: { username: string };
};

export type RootStackParameters = {
    Auth: undefined;
    Main: undefined;
};