import {StyleSheet} from 'react-native';
import Styles from './styles.d';
const styles: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#323436',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 22,
    flexShrink: 1,
  },
  flexRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  gap10: {gap: 10},
  ft28: {fontSize: 28},
  ft16: {fontSize: 16, color: 'black'},
  width75: {width: '75%'},
});

export default styles;
