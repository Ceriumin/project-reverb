// Compiler won't stop bitching about these 
export type AuthStackParamList = {
    Login: undefined;
    Onboarding: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    ConfirmSignUp: { username: string };
};

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};
