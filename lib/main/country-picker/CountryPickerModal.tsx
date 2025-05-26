import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  TextInputProps,
  Platform,
  ViewStyle,
} from 'react-native';
import { type EachCountry } from '../constants/constants.d';
import Picker from './Picker';
import { type PickerOpenRef } from './Picker.d';
import { countryPickerStyles } from './styles/picker.style';

const { height: screenHeight } = Dimensions.get('window');
const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

// Animation configuration
const ANIMATION_CONFIG = {
  friction: 8,
  tension: 50,
  useNativeDriver: true,
};

interface Props {
  darkMode: boolean;
  onSelect: (value: EachCountry) => void;
  searchInputProps?: TextInputProps;
}

const CountryPickerModal = forwardRef<PickerOpenRef, Props>(
  ({ darkMode, onSelect, searchInputProps }, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationValue = useRef(new Animated.Value(screenHeight)).current;

    const animateToValue = useCallback(
      (toValue: number, onComplete?: () => void) => {
        Animated.spring(animationValue, {
          ...ANIMATION_CONFIG,
          toValue,
        }).start(onComplete);
      },
      [animationValue]
    );

    const openModal = useCallback(() => {
      setIsModalVisible(true);
      setIsAnimating(true);
      animateToValue(statusBarHeight, () => {
        setIsAnimating(false);
      });
    }, [animateToValue]);

    const closeModal = useCallback(() => {
      if (isAnimating) return;

      setIsAnimating(true);
      animateToValue(screenHeight, () => {
        requestAnimationFrame(() => {
          setIsModalVisible(false);
          setIsAnimating(false);
        });
      });
    }, [isAnimating, animateToValue]);

    const handleCountrySelect = useCallback(
      (country: EachCountry) => {
        onSelect(country);
        closeModal();
      },
      [onSelect, closeModal]
    );

    useImperativeHandle(
      ref,
      () => ({
        openModal,
      }),
      [openModal]
    );

    // Reset animation value when modal closes
    useEffect(() => {
      if (!isModalVisible) {
        animationValue.setValue(screenHeight);
      }
    }, [isModalVisible, animationValue]);

    // Cleanup animation on unmount
    useEffect(() => {
      return () => {
        animationValue.stopAnimation();
      };
    }, [animationValue]);

    // Memoize animated style
    const animatedStyle = useMemo<ViewStyle>(
      () => ({
        flex: 1,
        transform: [{ translateY: animationValue }],
      }),
      [animationValue]
    );

    if (!isModalVisible) return null;

    return (
      <>
        <StatusBar
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          backgroundColor={darkMode ? '#000000' : '#FFFFFF'}
        />
        <Modal
          visible={isModalVisible}
          transparent
          animationType="none"
          statusBarTranslucent={Platform.OS === 'android'}
          onRequestClose={closeModal}
        >
          <Animated.View style={animatedStyle}>
            <SafeAreaView
              style={[countryPickerStyles.flex, countryPickerStyles.mb40]}
            >
              <Picker
                onSelect={handleCountrySelect}
                darkMode={darkMode}
                closeModal={closeModal}
                searchInputProps={searchInputProps}
              />
            </SafeAreaView>
          </Animated.View>
        </Modal>
      </>
    );
  }
);

CountryPickerModal.displayName = 'CountryPickerModal';

export default CountryPickerModal;
