import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StatusBar, useColorScheme } from 'react-native';
import { pickerStyles } from './styles/picker.style';

const { height } = Dimensions.get('window');
interface props {
  component?: React.FC;
  componentProps?: any;
}
declare global {
  var openCountryModal: (value: props) => void;
}

const CountryPickerModal: React.FC = () => {
  const scheme = useColorScheme();
  const styles = pickerStyles(scheme);
  const [isOpen, setIsOpen] = useState(false);
  const animationValue = useState(new Animated.Value(height))[0];
  const statusBarHeight = StatusBar.currentHeight || 0;
  const componentRef = useRef<props | null>();
  global.openCountryModal = ({ component = null, componentProps = null }) => {
    toggleAnimation();
    component
      ? (componentRef.current = { component, componentProps })
      : (componentRef.current = null);
  };

  const toggleAnimation = () => {
    if (isOpen) {
      Animated.spring(animationValue, {
        toValue: height,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.spring(animationValue, {
        toValue: statusBarHeight,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle = {
    transform: [{ translateY: animationValue }],
  };
  const Component = componentRef.current?.component;
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {Component && isOpen && (
        <Component {...componentRef.current?.componentProps} />
      )}
    </Animated.View>
  );
};

export default CountryPickerModal;
