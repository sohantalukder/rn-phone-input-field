import { StyleSheet } from 'react-native';
import type Styles from './styles.d';

// Cache styles to prevent recreation
const styleCache = new Map<boolean, ReturnType<typeof StyleSheet.create>>();

// Color constants for better maintainability and consistency
const COLORS = {
  LIGHT: {
    border: '#323436',
    background: '#FAFAFB',
    text: '#000000',
  },
  DARK: {
    border: '#DDDDDE',
    background: '#1B1D20',
    text: '#FFFFFF',
  },
} as const;

// Base styles that don't depend on theme
const BASE_STYLES = StyleSheet.create({
  flexRowBase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gap10: {
    gap: 10,
  },
  ft28: {
    fontSize: 28,
  },
  width75: {
    width: '75%',
  },
});

const createThemedStyles = (isDark: boolean) => {
  const colors = isDark ? COLORS.DARK : COLORS.LIGHT;
  
  return StyleSheet.create({
    container: {
      ...BASE_STYLES.flexRowBase,
      gap: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 22,
      flexShrink: 1,
      backgroundColor: colors.background,
    },
    ft16: {
      fontSize: 16,
      color: colors.text,
    },
  });
};

const styles: Styles = (isDark: boolean) => {
  // Check cache first
  if (styleCache.has(isDark)) {
    return {
      ...BASE_STYLES,
      ...styleCache.get(isDark)!,
    };
  }
  
  // Create and cache themed styles
  const themedStyles = createThemedStyles(isDark);
  styleCache.set(isDark, themedStyles);
  
  return {
    ...BASE_STYLES,
    ...themedStyles,
  };
};

export default styles;