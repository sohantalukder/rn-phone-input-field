import { StyleSheet } from 'react-native';
import type { Styles } from './styles.d';
import type {
  ContainerStyle,
  FlexRowStyle,
  GapStyle,
  FontSize28Style,
  FontSize16Style,
  WidthStyle,
} from './styles.d';

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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  } satisfies FlexRowStyle,
  gap10: {
    gap: 10,
  } satisfies GapStyle,
  ft28: {
    fontSize: 28,
  } satisfies FontSize28Style,
  width75: {
    width: '75%',
  } satisfies WidthStyle,
});

const createThemedStyles = (isDark: boolean) => {
  const colors = isDark ? COLORS.DARK : COLORS.LIGHT;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 22,
      flexShrink: 1,
      backgroundColor: colors.background,
    } satisfies ContainerStyle,
    ft16: {
      fontSize: 16,
      color: colors.text,
    } satisfies FontSize16Style,
  });
};

// Cache styles to prevent recreation
const styleCache = new Map<
  boolean,
  {
    container: ContainerStyle;
    flexRow: FlexRowStyle;
    gap10: GapStyle;
    ft28: FontSize28Style;
    ft16: FontSize16Style;
    width75: WidthStyle;
  }
>();

const styles: Styles = (isDark: boolean) => {
  // Check cache first
  if (styleCache.has(isDark)) {
    return styleCache.get(isDark)!;
  }

  // Create and cache themed styles
  const themedStyles = createThemedStyles(isDark);
  const combinedStyles = {
    container: themedStyles.container,
    flexRow: BASE_STYLES.flexRow,
    gap10: BASE_STYLES.gap10,
    ft28: BASE_STYLES.ft28,
    ft16: themedStyles.ft16,
    width75: BASE_STYLES.width75,
  };

  styleCache.set(isDark, combinedStyles);
  return combinedStyles;
};

export default styles;
