import type { EachCountry } from '../constants/constants.d';

interface PickerProps {
  onSelect: (value: EachCountry) => void;
  darkMode: boolean;
  closeModal: () => void;
}

interface EachOptionProps {
  onSelect?: (value: EachCountry) => void;
  item: EachCountry;
  index: number;
  darkMode: boolean;
  closeModal: () => void;
}

interface PickerOpenRef {
  openModal: () => void;
}
export type { PickerProps, PickerOpenRef, EachOptionProps };
