# rn-phone-input-field

[![npm version](https://badge.fury.io/js/rn-phone-input-field.svg)](https://www.npmjs.com/package/rn-phone-input-field)
[![Downloads](https://img.shields.io/npm/dm/rn-phone-input-field.svg)](https://www.npmjs.com/package/rn-phone-input-field)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A lightweight React Native phone number input with a built-in country code picker, country-aware validation, TypeScript types, and no runtime dependencies.

<img width="295" height="640" alt="Simulator Screen Recording - iPhone 17 Pro - 2026-06-12 at 20 09 52" src="https://github.com/user-attachments/assets/dfaf542b-8e97-42c9-b925-db7be5d18339" />

## Features

- Built for React Native iOS and Android
- No runtime dependencies
- Country picker with calling codes
- Country-aware phone number validation
- Automatic digit sanitization and country-specific max length
- Light and dark mode support
- Fully typed TypeScript API
- Customizable container, text input, country code, arrow icon, and search input

## Installation

```sh
npm install rn-phone-input-field
```

```sh
yarn add rn-phone-input-field
```

```sh
pnpm add rn-phone-input-field
```

## Peer Dependencies

This package expects React and React Native to be installed in your app:

```json
{
  "react": ">=16.8.0",
  "react-native": ">=0.60.0"
}
```

## Quick Start

```tsx
import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import PhoneInput, { type PhoneInputRef } from 'rn-phone-input-field';

export default function App() {
  const phoneInputRef = useRef<PhoneInputRef>(null);
  const [message, setMessage] = useState('');

  const handleChange = (phoneNumber: string) => {
    const isValid = phoneInputRef.current?.isValidNumber?.(phoneNumber) ?? false;

    setMessage(isValid ? 'Valid phone number.' : 'Enter a valid phone number.');
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <PhoneInput
          ref={phoneInputRef}
          defaultCountry="US"
          placeholder="Enter phone number"
          onChangeText={handleChange}
          onSelectCountryCode={(country) => {
            console.log(country.countryCode);
            console.log(country.callingCode);
          }}
        />

        {!!message && <Text style={{ marginTop: 8 }}>{message}</Text>}
      </View>
    </SafeAreaView>
  );
}
```

You can also use the named export:

```tsx
import { PhoneInput } from 'rn-phone-input-field';
```

## Default Value

`defaultValue` accepts local or international-looking values. If the value starts with a known calling code, the component selects that country and stores the national number in the input.

```tsx
<PhoneInput defaultCountry="BD" defaultValue="+8801712345678" />
```

The value emitted by `onChangeText` is sanitized to digits only.

## Validation

Use the component ref to validate the current input against the selected country.

```tsx
import React, { useRef } from 'react';
import PhoneInput, { type PhoneInputRef } from 'rn-phone-input-field';

const phoneInputRef = useRef<PhoneInputRef>(null);

const isValid = phoneInputRef.current?.isValidNumber?.('1712345678') ?? false;
```

`isValidNumber` can validate a national number, a number with the selected calling code, or a number with a `+` prefix.

## Custom Styling

```tsx
<PhoneInput
  defaultCountry="GB"
  placeholder="Mobile number"
  placeholderColor="#6B7280"
  containerStyle={{
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
  }}
  codeTextStyle={{
    color: '#111827',
    fontWeight: '700',
  }}
  textInputStyle={{
    color: '#111827',
    fontSize: 16,
  }}
/>
```

## Dark Mode

```tsx
<PhoneInput darkMode placeholder="Enter phone number" />
```

## TextInput Props

Use `inputProps` for the phone number input and `searchInputProps` for the country picker search input.

```tsx
<PhoneInput
  inputProps={{
    accessibilityLabel: 'Phone number',
    returnKeyType: 'done',
  }}
  searchInputProps={{
    placeholder: 'Search country',
  }}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onChangeText` | `(value: string) => void` | `undefined` | Called with the sanitized phone number whenever the input changes. |
| `onSelectCountryCode` | `(country: SelectedCountry) => void` | `undefined` | Called when the selected country changes. |
| `defaultCountry` | `CountryCode` | `'US'` | Initial country, using an ISO country code such as `'US'`, `'BD'`, or `'GB'`. |
| `defaultValue` | `string` | `''` | Initial phone number value. |
| `containerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the outer input container. |
| `placeholder` | `string` | `undefined` | Phone input placeholder text. |
| `placeholderColor` | `ColorValue` | `'#999'` | Placeholder text color. |
| `inputProps` | `TextInputProps` | `undefined` | Props passed to the phone number `TextInput`. |
| `textInputStyle` | `StyleProp<TextStyle>` | `undefined` | Style for the phone number text input. |
| `downArrowIcon` | `React.ReactNode` | built-in icon | Custom country picker arrow icon. |
| `iconContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the country selector area. |
| `codeTextStyle` | `StyleProp<TextStyle>` | `undefined` | Style for the calling code text. |
| `darkMode` | `boolean` | `false` | Uses the built-in dark color set. |
| `searchInputProps` | `TextInputProps` | `undefined` | Props passed to the country picker search input. |

## Ref Methods

| Method | Type | Description |
| --- | --- | --- |
| `isValidNumber` | `(value: string) => boolean` | Validates a phone number for the currently selected country. |
| `onChangeText` | `(value: string) => void` | Programmatically updates the input value. |
| `defaultCountry` | `(code: CountryCode) => void` | Programmatically changes the selected country. |
| `defaultValue` | `(text: string) => void` | Programmatically applies a new default value. |

## TypeScript

```tsx
import PhoneInput, {
  type CountryCode,
  type PhoneInputProps,
  type PhoneInputRef,
} from 'rn-phone-input-field';
```

`onSelectCountryCode` returns:

```ts
type SelectedCountry = {
  countryCode: string;
  callingCode: string;
};
```

## Example App

This repository includes a React Native example app in the `example` directory.

```sh
cd example
npm install
npm run android
```

or:

```sh
cd example
npm install
npm run ios
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

MIT. See [LICENSE](LICENSE) for details.

## Support

- Issues: [GitHub Issues](https://github.com/sohantalukder/rn-phone-input-field/issues)
- Email: [mdtalukder.sohan@gmail.com](mailto:mdtalukder.sohan@gmail.com)
