import type { TextInputProps } from 'react-native';
import type { EachCountry } from '../constants/constants.d';

/**
 * props for the picker
 */
interface PickerProps {
  /**
   * on select for the picker
   */
  onSelect: (value: EachCountry) => void;
  /**
   * dark mode for the picker
   */
  darkMode: boolean;
  /**
   * close modal for the picker
   */
  closeModal: () => void;
  /**
   * search input props for the picker
   */
  searchInputProps?: TextInputProps;
}

/**
 * props for the each option
 */
interface EachOptionProps {
  /**
   * on select for the each option
   */
  onSelect?: (value: EachCountry) => void;
  /**
   * item for the each option
   */
  item: EachCountry;
  /**
   * index for the each option
   */
  index: number;
  /**
   * dark mode for the each option
   */
  darkMode: boolean;
  /**
   * close modal for the each option
   */
  closeModal: () => void;
}

/**
 * ref for the picker
 */
interface PickerOpenRef {
  /**
   * open modal for the picker
   */
  openModal: () => void;
}
export type { EachOptionProps, PickerOpenRef, PickerProps };
