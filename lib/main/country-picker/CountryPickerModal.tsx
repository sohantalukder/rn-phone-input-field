import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Picker from './Picker';
import { type EachCountry } from '../constants/constants.d';
import { type PickerOpenRef } from './Picker.d';
import { countryPickerStyles } from './styles/picker.style';

const { height } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 0;
interface Props {
  darkMode: boolean;
  onSelect: (value: EachCountry) => void;
}

const CountryPickerModal = forwardRef<PickerOpenRef, Props>(
  ({ darkMode, onSelect }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const animationValue = useState(new Animated.Value(height))[0];

    useImperativeHandle(ref, () => ({
      openModal: () => {
        toggleAnimation(true);
        setIsOpen(true);
      },
    }));
    const toggleAnimation = (open: boolean) => {
      if (open) {
        Animated.spring(animationValue, {
          toValue: height, // Move modal out of view
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(animationValue, {
          toValue: statusBarHeight, // Start modal below the status bar
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }).start();
      }
    };

    const animatedStyle = {
      transform: [{ translateY: animationValue }],
    };
    const closeModal = () => {
      toggleAnimation(false);
      setIsOpen(false);
    };
    return (
      <>
        <StatusBar
          barStyle={darkMode ? 'light-content' : 'dark-content'}
          backgroundColor={darkMode ? '#000000' : '#FFFFFF'}
        />
        <Animated.View style={animatedStyle}>
          {isOpen && (
            <Modal visible={isOpen} transparent animationType="slide">
              <SafeAreaView
                style={[countryPickerStyles.flex, countryPickerStyles.mb40]}
              >
                <Picker
                  onSelect={onSelect}
                  darkMode={darkMode}
                  closeModal={closeModal}
                />
              </SafeAreaView>
            </Modal>
          )}
        </Animated.View>
      </>
    );
  }
);

export default CountryPickerModal;
