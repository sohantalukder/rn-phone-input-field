# rn-phone-input-field

![iPhone 16 Pro Simulator Recording Jan 8 2025](https://github.com/user-attachments/assets/db697376-9628-44b9-ba7d-fc0f74e96bd1)

`rn-phone-input-field` is a powerful and fully customizable React Native component designed for seamless phone number input, complete with a built-in country code selector and validation capabilities. It offers developers the flexibility to tailor every aspect of the component through an extensive range of props, making it adaptable to a wide variety of design and functional requirements.  

One of its standout features is that it is implemented **without any dependencies**, ensuring a lightweight and performance-focused solution. This approach minimizes package bloat and allows for smooth integration into projects of any size.

## Description

`rn-phone-input-field` provides an intuitive and user-friendly way to input and validate phone numbers in React Native applications. It is designed to streamline the user experience with features like automatic country code detection, validation, and a customizable UI that fits seamlessly into any design system.  

This component offers:  
- **Automatic Country Code Detection**: Easily identifies the user's country code for a smooth experience.  
- **Full Customization**: Modify styles, behavior, and features through props to match your application's requirements.  
- **Validation Built-In**: Ensures the phone number format adheres to the selected country’s standards.  

One of its key advantages is that it is built **without any dependencies**, making it lightweight and ensuring no additional bloat in your project.  

With `rn-phone-input-field`, developers can effortlessly integrate a flexible, performant, and feature-rich phone number input field into their applications, improving both functionality and user experience.

## Installation

You can install `rn-phone-input-field` using either npm or yarn:

### Using npm:

```bash
npm install rn-phone-input-field
```

### Using yarn:

```bash
yarn add rn-phone-input-field
```

## Usage

Here's an example of how to use the `RNPhoneInput` component:

```javascript
import React from 'react';
import { View } from 'react-native';
import RNPhoneInput from 'rn-phone-input-field';

const MyComponent = () => {
  return (
    <View>
      <RNPhoneInput
        placeholder="Enter your phone number"
        onChangeText={(value) => console.log(value)}
        onSelectCountryCode={(value) => console.log(value)}
      />
    </View>
  );
};

export default MyComponent;
```

## Props

### `RNPhoneInputProps`

| Prop                 | Type                                          | Description                                                  |
|----------------------|-----------------------------------------------|--------------------------------------------------------------|
| `onChangeText`       | `(value: string) => void`                    | Callback triggered when the text input value changes.        |
| `defaultCountry`     | `CountryCode`                                | The default country code for the phone input.               |
| `defaultValue`       | `string`                                     | The initial value displayed in the text input field.         |
| `containerStyle`     | `StyleProp<ViewStyle>`                       | Custom style for the container of the phone input component. |
| `placeholder`        | `string`                                     | Placeholder text displayed when the text input is empty.     |
| `inputProps`         | `TextInputProps`                             | Additional props passed to the underlying TextInput component.|
| `textInputStyle`     | `StyleProp<TextStyle>`                       | Custom style for the text input field.                      |
| `onSelectCountryCode`| `(value: Omit<EachCountry, 'countryCode', 'callingCode'>) => void` | Callback triggered when a country code is selected. |
| `downArrowIcon`      | `React.ReactNode`                            | Custom React element or icon rendered as the dropdown arrow. |
| `placeholderColor`   | `ColorValue`                                 | Custom color for the placeholder text.                      |
| `iconContainerStyle` | `StyleProp<ViewStyle>`                       | Custom style for the container of the dropdown arrow icon.  |
| `codeTextStyle`      | `StyleProp<TextStyle>`                       | Custom style for the text displaying the country code.      |

## `RNPhoneInputRef`

### Methods

| Method            | Type                            | Description                                      |
|-------------------|---------------------------------|------------------------------------------------|
| `isValidNumber`   | `(value: string) => boolean`   | Validates if the given phone number is valid.  |
| `onChangeText`    | `(value: string) => void`      | Updates the text value of the input.           |
| `defaultCountry`  | `(code: CountryCode) => void`  | Sets the default country code.                 |
| `defaultValue`    | `(text: string) => void`       | Sets the default text value for the input.     |

## License

MIT
