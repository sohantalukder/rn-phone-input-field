import React, { forwardRef, useImperativeHandle, useState, useCallback, useRef, useEffect } from 'react';
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
const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

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

    const openModal = useCallback(() => {
      setIsModalVisible(true);
      setIsAnimating(true);
      
      // Animate modal sliding up from bottom
      Animated.spring(animationValue, {
        toValue: statusBarHeight,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    }, [animationValue]);

    const closeModal = useCallback(() => {
      if (isAnimating) return; // Prevent multiple close calls during animation
      
      setIsAnimating(true);
      
      // Animate modal sliding down
      Animated.spring(animationValue, {
        toValue: screenHeight,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }).start(() => {
        setIsModalVisible(false);
        setIsAnimating(false);
      });
    }, [animationValue, isAnimating]);

    const handleCountrySelect = useCallback((country: EachCountry) => {
      onSelect(country);
      closeModal();
    }, [onSelect, closeModal]);

    useImperativeHandle(ref, () => ({
      openModal,
    }), [openModal]);

    // Reset animation value when modal closes
    useEffect(() => {
      if (!isModalVisible) {
        animationValue.setValue(screenHeight);
      }
    }, [isModalVisible, animationValue]);

    if (!isModalVisible) {
      return null;
    }

    return (
      <>
        <StatusBar
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          backgroundColor={darkMode ? '#000000' : '#FFFFFF'}
        />
        <Modal 
          visible={isModalVisible} 
          transparent 
          animationType="none" // We handle animation ourselves
          statusBarTranslucent={Platform.OS === 'android'}
          onRequestClose={closeModal} // Handle Android back button
        >
          <Animated.View 
            style={[
              {
                flex: 1,
                transform: [{ translateY: animationValue }],
              }
            ]}
          >
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