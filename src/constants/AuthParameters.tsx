import { AuthUser } from 'aws-amplify/auth';

export type AuthError = { 
    code?: string;
    message: string;
}

// Type definition for the AuthContext is stored here for the AuthProvider to make it cleaner
export type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    error: AuthError | null;
    signIn: (email: string, password: string) => Promise<{isSignedIn: boolean;nextStep?: string;}>;    
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<{ isSignUpComplete: boolean; nextStep?: string }>;    
    confirmSignUp: (username: string, code: string, password: string) => Promise<void>;
    resetPassword: (username: string) => Promise<void>;
    confirmResetPassword: (username: string, code: string, newPassword: string) => Promise<void>;
    clearError: () => void;
}