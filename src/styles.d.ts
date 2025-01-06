import {DimensionValue} from 'react-native';

type ContainerStyle = {
  flexDirection: 'row';
  alignItems: 'center';
  gap: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  paddingVertical: number;
  paddingHorizontal: number;
  flexShrink: number;
};

type FlexRowStyle = {
  flexDirection: 'row';
  alignItems: 'center';
  gap: number;
};

type GapStyle = {
  gap: number;
};

type FontSize28Style = {
  fontSize: number;
};

type FontSize16Style = {
  fontSize: number;
  color: string;
};

type WidthStyle = {
  width: DimensionValue;
};

interface Styles {
  container: ContainerStyle;
  flexRow: FlexRowStyle;
  gap10: GapStyle;
  ft28: FontSize28Style;
  ft16: FontSize16Style;
  width75: WidthStyle;
}

declare const Styles: Styles;

export default Styles;
