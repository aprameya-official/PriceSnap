import { useState, useEffect, createContext, useContext } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorSchemeName;
  setTheme: (theme: Theme) => void;
  colors: typeof lightColors;
}

const lightColors = {
  primary: '#FF6B35',
  primaryLight: '#FF8A5B',
  primaryDark: '#E55A2B',
  secondary: '#3B82F6',
  secondaryLight: '#60A5FA',
  secondaryDark: '#2563EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  background: '#FFFFFF',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  
  text: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  gradient: ['#667eea', '#764ba2', '#f093fb'],
};

const darkColors = {
  primary: '#FF6B35',
  primaryLight: '#FF8A5B',
  primaryDark: '#E55A2B',
  secondary: '#60A5FA',
  secondaryLight: '#93C5FD',
  secondaryDark: '#3B82F6',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  
  background: '#0F172A',
  surface: '#1E293B',
  card: '#334155',
  
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  
  border: '#475569',
  borderLight: '#334155',
  
  gradient: ['#1e293b', '#334155', '#475569'],
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const getColors = () => {
    if (theme === 'system') {
      return colorScheme === 'dark' ? darkColors : lightColors;
    }
    return theme === 'dark' ? darkColors : lightColors;
  };

  const value = {
    theme,
    colorScheme: theme === 'system' ? colorScheme : theme,
    setTheme,
    colors: getColors(),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}