import type { EachCountry } from '../constants/constants.d';

interface PickerProps {
  onSelect: (value: EachCountry) => void;
}

interface EachOptionProps {
  onSelect?: (value: EachCountry) => void;
  item: EachCountry;
  index: number;
}
export type { PickerProps, EachOptionProps };
