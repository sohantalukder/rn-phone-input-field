import { StyleSheet } from 'react-native';
import Styles from './styles.d';
const styles: Styles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderWidth: 1,
      borderColor: isDark ? '#DDDDDE' : '#323436',
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 22,
      flexShrink: 1,
      backgroundColor: isDark ? '#1B1D20' : '#FAFAFB',
    },
    flexRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    gap10: { gap: 10 },
    ft28: { fontSize: 28 },
    ft16: { fontSize: 16, color: isDark ? '#FFFFFF' : '#000000' },
    width75: { width: '75%' },
  });

export default styles;
