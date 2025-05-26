# rn-phone-input-field

[![npm version](https://badge.fury.io/js/rn-phone-input-field.svg)](https://badge.fury.io/js/rn-phone-input-field)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/rn-phone-input-field.svg)](https://npmjs.org/package/rn-phone-input-field)

![PhoneInput](https://github.com/user-attachments/assets/6ecd0f96-7b34-4c81-9209-271bc51763e7)

## 🚀 Ultra-Lightweight Phone Input Component

**Zero Dependencies. Maximum Performance.**

`rn-phone-input-field` is a high-performance React Native phone input component engineered for production applications that demand both functionality and minimal bundle impact. Built entirely without external dependencies, it delivers enterprise-grade features while maintaining an exceptionally small footprint.

## ✨ Key Features

- **🪶 Zero Dependencies**: Completely self-contained with no external packages
- **⚡ Ultra-Lightweight**: Minimal bundle size impact on your application
- **🌍 Comprehensive Country Support**: Built-in country code database
- **✅ Smart Validation**: Real-time phone number format validation
- **🎨 Fully Customizable**: Extensive styling and configuration options
- **📱 React Native Optimized**: Native performance and platform consistency
- **🔧 TypeScript Ready**: Complete type definitions included

## Why Choose rn-phone-input-field?

In an ecosystem where dependencies can quickly bloat your application, `rn-phone-input-field` stands out by providing full functionality without any external packages. This results in:

- **Faster app startup times**
- **Reduced bundle size**
- **Fewer security vulnerabilities**
- **Simplified dependency management**
- **Better long-term maintainability**

## Installation

```bash
# npm
npm install rn-phone-input-field

# yarn
yarn add rn-phone-input-field

# pnpm
pnpm add rn-phone-input-field
```

## Quick Start

```typescript
import React, { useRef } from 'react';
import { View } from 'react-native';
import { PhoneInput, PhoneInputRef } from 'rn-phone-input-field';

const App = () => {
  const phoneInputRef = useRef<PhoneInputRef>(null);

  const handlePhoneChange = (phoneNumber: string) => {
    console.log('Phone number:', phoneNumber);

    // Validate the number
    const isValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    console.log('Is valid:', isValid);
  };

  return (
    <View style={{ padding: 20 }}>
      <PhoneInput
        ref={phoneInputRef}
        placeholder="Enter phone number"
        defaultCountry="US"
        onChangeText={handlePhoneChange}
        onSelectCountryCode={(country) => {
          console.log('Selected country:', country.name);
        }}
      />
    </View>
  );
};

export default App;
```

## API Reference

### PhoneInputProps

| Property              | Type                             | Default  | Description                             |
| --------------------- | -------------------------------- | -------- | --------------------------------------- |
| `onChangeText`        | `(value: string) => void`        | -        | Callback fired when input value changes |
| `onSelectCountryCode` | `(country: CountryInfo) => void` | -        | Callback fired when country is selected |
| `defaultCountry`      | `CountryCode`                    | `"US"`   | Initial country code                    |
| `defaultValue`        | `string`                         | `""`     | Initial input value                     |
| `placeholder`         | `string`                         | -        | Input placeholder text                  |
| `placeholderColor`    | `ColorValue`                     | `"#999"` | Placeholder text color                  |
| `containerStyle`      | `StyleProp<ViewStyle>`           | -        | Container styling                       |
| `textInputStyle`      | `StyleProp<TextStyle>`           | -        | Text input styling                      |
| `codeTextStyle`       | `StyleProp<TextStyle>`           | -        | Country code text styling               |
| `iconContainerStyle`  | `StyleProp<ViewStyle>`           | -        | Dropdown icon container styling         |
| `downArrowIcon`       | `React.ReactNode`                | -        | Custom dropdown arrow component         |
| `inputProps`          | `TextInputProps`                 | -        | Additional TextInput props              |
| `searchInputProps`    | `TextInputProps`                 | -        | Country search input props              |

### PhoneInputRef Methods

| Method           | Type                               | Description                         |
| ---------------- | ---------------------------------- | ----------------------------------- |
| `isValidNumber`  | `(phoneNumber: string) => boolean` | Validates phone number format       |
| `onChangeText`   | `(value: string) => void`          | Programmatically update input value |
| `defaultCountry` | `(code: CountryCode) => void`      | Change default country              |
| `defaultValue`   | `(text: string) => void`           | Set default input value             |

## Advanced Usage

### Custom Styling

```typescript
<PhoneInput
  containerStyle={{
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 12,
  }}
  textInputStyle={{
    fontSize: 16,
    color: '#2c3e50',
  }}
  codeTextStyle={{
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
  }}
  placeholderColor="#95a5a6"
/>
```

### Form Integration

```typescript
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  phone: Yup.string().required('Phone number is required'),
});

const ContactForm = () => {
  const phoneInputRef = useRef<PhoneInputRef>(null);

  return (
    <Formik
      initialValues={{ phone: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const isValid = phoneInputRef.current?.isValidNumber(values.phone);
        if (isValid) {
          console.log('Valid phone:', values.phone);
        }
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={values.phone}
          onChangeText={(phone) => setFieldValue('phone', phone)}
        />
      )}
    </Formik>
  );
};
```

## Performance Metrics

| Metric         | rn-phone-input-field | Typical Alternatives      |
| -------------- | -------------------- | ------------------------- |
| Bundle Size    | **~15KB**            | ~1-3MB                    |
| Dependencies   | **0**                | 3-8 packages              |
| Install Time   | **Fast**             | Slower                    |
| Security Audit | **Clean**            | Potential vulnerabilities |

## TypeScript Support

Full TypeScript support is included out of the box with comprehensive type definitions for all props and methods.

```typescript
import { PhoneInput, PhoneInputRef, CountryCode } from 'rn-phone-input-field';
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: [mdtalukder.sohan@gmail.com](mailto:mdtalukder.sohan@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/rn-phone-input-field/issues)
- 💼 **Freelance Work**: Available for React/React Native projects

---

<div align="center">

**Built with ❤️ for the React Native community**

[⭐ Star this repo](https://github.com/your-username/rn-phone-input-field) if you found it helpful!

</div>
