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
} from 'react-native';
import { type EachCountry } from '../constants/constants.d';
import Picker from './Picker';
import { type PickerOpenRef } from './Picker.d';
import { countryPickerStyles } from './styles/picker.style';

const { height: screenHeight } = Dimensions.get('window');
const statusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const OPEN_DURATION = 260;
const CLOSE_DURATION = 220;

interface Props {
  darkMode: boolean;
  onSelect: (value: EachCountry) => void;
  searchInputProps?: TextInputProps;
}

const CountryPickerModal = forwardRef<PickerOpenRef, Props>(
  ({ darkMode, onSelect, searchInputProps }, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const translateY = useRef(new Animated.Value(screenHeight)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const animateModal = useCallback(
      (toValue: number, toOpacity: number, duration: number, onComplete?: () => void) => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: toOpacity,
            duration,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            onComplete?.();
          }
        });
      },
      [opacity, translateY]
    );

    const openModal = useCallback(() => {
      if (isModalVisible || isAnimating) return;

      translateY.setValue(screenHeight);
      opacity.setValue(0);
      setIsModalVisible(true);
      setIsAnimating(true);
      animateModal(statusBarHeight, 1, OPEN_DURATION, () => {
        setIsAnimating(false);
      });
    }, [animateModal, isAnimating, isModalVisible, opacity, translateY]);

    const closeModal = useCallback(() => {
      if (!isModalVisible || isAnimating) return;

      setIsAnimating(true);
      animateModal(screenHeight, 0, CLOSE_DURATION, () => {
        requestAnimationFrame(() => {
          setIsModalVisible(false);
          setIsAnimating(false);
        });
      });
    }, [animateModal, isAnimating, isModalVisible]);

    const handleCountrySelect = useCallback(
      (country: EachCountry) => {
        onSelect(country);
        closeModal();
      },
      [closeModal, onSelect]
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
        translateY.setValue(screenHeight);
        opacity.setValue(0);
      }
    }, [isModalVisible, opacity, translateY]);

    // Cleanup animation on unmount
    useEffect(() => {
      return () => {
        translateY.stopAnimation();
        opacity.stopAnimation();
      };
    }, [opacity, translateY]);

    // Memoize animated style
    const animatedStyle = useMemo(
      () => ({
        flex: 1,
        opacity,
        transform: [{ translateY }],
      }),
      [opacity, translateY]
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
