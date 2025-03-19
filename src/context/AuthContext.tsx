import React, { createContext, useState, useEffect } from 'react';
import { 
    signIn, 
    signOut, 
    signUp, 
    confirmSignUp, 
    getCurrentUser, 
    AuthUser 
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

type AuthError = { 
    code?: string;
    message: string;
}

// Type definition for the AuthContext for the AuthProvider
type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    error: AuthError | null;
    signIn: (email: string, password: string) => Promise<{isSignedIn: boolean}>;    
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<{ isSignUpComplete: boolean }>;    
    confirmSignUp: (email: string, code: string) => Promise<void>;
    clearError: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    // All the states for Authentication are handled here
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<AuthUser | null>(null);
    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => { // This effect runs only once when the component mounts to check the authentication state
        checkAuthState();
        setupAuthListener();
      }, []);

    // This function listens to the auth event and updates the state accordingly
    const setupAuthListener = () => {
        Hub.listen('auth', ({ payload: { event } }) => {
          switch (event) {
            case 'signedIn':
              setIsAuthenticated(true);
              checkAuthState();
              break;
            case 'signedOut':
              setIsAuthenticated(false);
              setUser(null);
              break;
            case 'tokenRefresh':
              checkAuthState();
              break;
          }
        });
    };

    const checkAuthState = async () => {
        try {
            setIsLoading(true);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await signIn({ 
                username: email.toLowerCase().trim(), 
                password ,
                options: { authFlowType: "USER_PASSWORD_AUTH" }, // This is required for the web client
            });
            setIsAuthenticated(true);
            return { isSignedIn: true };
        } catch (err) {
            console.error('Sign in error:', err);
            setError({
                message: (err as Error).message,
                code: (err as { code?: string}).code
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const handleSignUp = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const { isSignUpComplete, nextStep } = await signUp({
                username: email.toLowerCase().trim(), 
                password,
                options: {
                    userAttributes: {
                        email: email.toLowerCase().trim()
                    },
                    autoSignIn: false
                }
            });    
            return { isSignUpComplete, nextStep: nextStep?.signUpStep };
        } catch(err) {
            console.error('SignUp error:', err);
            setError({
                message: (err as Error).message,
                code: (err as { code?: string}).code
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmSignUp = async (username: string, code: string) => {
        try { 
            setIsLoading(true);
            setError(null);            
            await confirmSignUp({ 
                username: username.toLowerCase().trim(), 
                confirmationCode: code,

            });

        } catch (err) {
            console.error('Confirmation error:', err);
            setError({
                message: (err as Error).message,
                code: (err as {code?: string}).code
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        try { 
            setIsLoading(true);
            setError(null);
            await signOut();
            setIsAuthenticated(false);
            setUser(null);
        } catch(err) {
            setError({
                message: (err as Error).message,
                code: (err as { code?: string}).code
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        user,
        error,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        confirmSignUp: handleConfirmSignUp,
        clearError: () => setError(null),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
    