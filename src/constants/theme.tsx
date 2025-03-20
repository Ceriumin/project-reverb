export interface AppTheme {
    dark: boolean
    colors: {
      primary: string
      background: string
      card: string
      text: string
      border: string
      notification: string
    },
    fonts: {
      regular: {
        fontFamily: 'InterTight_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'InterTight_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'InterTight_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'InterTight_900Black',
        fontWeight: '900',
    },
    }
  }
  
  export const darkTheme: AppTheme = {
    dark: true,
    colors: {
      primary: '#6200EE',
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      border: '#303030',
      notification: '#FF5252',
    },
    fonts: {
      regular: {
        fontFamily: 'InterTight_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'InterTight_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'InterTight_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'InterTight_900Black',
        fontWeight: '900',
      },
    }
  }
  
  export const lightTheme: AppTheme = {
    dark: false,
    colors: {
      primary: '#6200EE',
      background: '#FFFFFF',
      card: '#F5F5F5',
      text: '#000000',
      border: '#E0E0E0',
      notification: '#FF5252',
    },
    fonts: {
      regular: {
        fontFamily: 'InterTight_400Regular',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'InterTight_500Medium',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'InterTight_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'InterTight_900Black',
        fontWeight: '900',
      },
    }
  }