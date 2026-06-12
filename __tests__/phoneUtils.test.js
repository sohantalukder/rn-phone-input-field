const {
  getMaxNationalNumberLength,
  getCountryByCode,
  isValidForCountry,
  parsePhoneValue,
  sanitizePhoneInputValue,
} = require('../dist/main/phone-input/phoneUtils');

describe('phone value parsing', () => {
  it('selects Bangladesh and returns the national number from +880', () => {
    const result = parsePhoneValue('+8801865741212', 'US');

    expect(result.country.countryCode).toBe('BD');
    expect(result.nationalNumber).toBe('1865741212');
  });

  it('selects Bangladesh and returns the national number from 880', () => {
    const result = parsePhoneValue('8801865741212', 'US');

    expect(result.country.countryCode).toBe('BD');
    expect(result.nationalNumber).toBe('1865741212');
  });

  it('keeps the default country for a local value without an international prefix', () => {
    const result = parsePhoneValue('1865741212', 'BD');

    expect(result.country.countryCode).toBe('BD');
    expect(result.nationalNumber).toBe('1865741212');
  });

  it('does not crash for an unknown prefix', () => {
    const result = parsePhoneValue('+999123456789', 'US');

    expect(result.country.countryCode).toBe('US');
    expect(result.nationalNumber).toBe('999123456789');
  });

  it('matches the longest calling code first for hyphenated country codes', () => {
    const result = parsePhoneValue('+13451234567', 'US');

    expect(result.country.countryCode).toBe('KY');
    expect(result.nationalNumber).toBe('1234567');
  });

  it('falls back to US for unknown default country codes', () => {
    const country = getCountryByCode('XX');

    expect(country.countryCode).toBe('US');
  });
});

describe('phone input sanitization', () => {
  it('limits Botswana national numbers to 8 digits', () => {
    const country = getCountryByCode('BW');

    expect(getMaxNationalNumberLength(country)).toBe(8);
    expect(sanitizePhoneInputValue('7123123123123', country)).toBe('71231231');
  });

  it('removes non-digits before applying the country length limit', () => {
    const country = getCountryByCode('BD');

    expect(sanitizePhoneInputValue('01865-741 212abc', country)).toBe(
      '0186574121'
    );
  });

  it('validates countries whose regex used a plain d quantifier typo', () => {
    const country = getCountryByCode('BW');

    expect(isValidForCountry(country, '71231231')).toBe(true);
  });
});
