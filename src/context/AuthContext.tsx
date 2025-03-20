import React from 'react';
import {
    signIn,
    signOut,
    signUp,
    confirmSignUp,
    getCurrentUser,
    AuthUser,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

type AuthError = {
    code?: string;
    message: string;
};

interface SignInParams {
    email: string;
    password: string;
}

interface SignUpParams {
    email: string;
    password: string;
}

interface ConfirmSignUpParams {
    email: string;
    code: string;
}

type AuthType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    error: AuthError | null;

    signIn: (params: SignInParams) => Promise<{isSignedIn: boolean}>;
    confirmSignUp: (params: ConfirmSignUpParams) => Promise<void>;
    signUp: (params: SignUpParams) => Promise<{ 
        isSignUpComplete: boolean, 
        nextStep?: string
    }>;

    signOut: () => Promise<void>;
    clearError: () => void;
}

export const AuthContext = React.createContext<AuthType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = React.useState({ // State handling object to make it cleaner
        isAuthenticated: false,
        isLoading: true,
        user: null as AuthUser | null,
        error: null as AuthError | null
    });

    React.useEffect(() => {
        Hub.listen('auth', ({ payload: { event } }) => {
            if (event === 'signedIn' || event === 'tokenRefresh') checkAuthStatus();
            if (event === 'signedOut') setState(s => ({ ...s, isAuthenticated: false, user: null }));
        });
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const user = await getCurrentUser();
            setState(s => ({ ...s, user, isAuthenticated: true, isLoading: false }));
        } catch {
            setState(s => ({ ...s, isAuthenticated: false, user: null, isLoading: false }));
        }
    };

    const handleAuth = async (action: Promise<any>) => {
        setState(s => ({ ...s, isLoading: true, error: null }));
        try {
            const result = await action;
            return result;
        } catch (err) {
            const error = { message: (err as Error).message, code: (err as Error).name };
            setState(s => ({ ...s, error }));
            throw err;
        } finally {
            setState(s => ({ ...s, isLoading: false }));
        }
    };

    const value = {
        ...state,
        signIn: ({ email, password }: SignInParams) => handleAuth(signIn({
            username: email.toLowerCase().trim(),
            password,
            options: { authFlowType: 'USER_PASSWORD_AUTH' }
        })),
        signUp: ({ email, password }: SignUpParams) => handleAuth(signUp({
            username: email.toLowerCase().trim(),
            password,
            options: {
            userAttributes: { email: email.toLowerCase().trim() },
            autoSignIn: false
            }
        })),
        signOut: () => handleAuth(signOut()),
        confirmSignUp: ({ email, code }: ConfirmSignUpParams) => handleAuth(confirmSignUp({
            username: email.toLowerCase().trim(),
            confirmationCode: code
        })),
        clearError: () => setState(s => ({ ...s, error: null }))
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}