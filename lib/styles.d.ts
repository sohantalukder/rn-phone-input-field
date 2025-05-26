import type { DimensionValue } from 'react-native';

export type ContainerStyle = {
  flexDirection: 'row';
  alignItems: 'center';
  gap: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  paddingVertical: number;
  paddingHorizontal: number;
  flexShrink: number;
  backgroundColor: string;
};

export type FlexRowStyle = {
  flexDirection: 'row';
  alignItems: 'center';
  gap: number;
};

export type GapStyle = {
  gap: number;
};

export type FontSize28Style = {
  fontSize: number;
};

export type FontSize16Style = {
  fontSize: number;
  color: string;
};

export type WidthStyle = {
  width: DimensionValue;
};

export type Styles = (isDark: boolean) => {
  container: ContainerStyle;
  flexRow: FlexRowStyle;
  gap10: GapStyle;
  ft28: FontSize28Style;
  ft16: FontSize16Style;
  width75: WidthStyle;
};

export default Styles;
