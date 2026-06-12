import constants from '../constants/constants';
import type { CountryCode, EachCountry } from '../constants/constants.d';
import { getCountries } from '../constants/countryUtils';

export type ParsedPhoneValue = {
  country?: EachCountry;
  nationalNumber: string;
};

const NON_DIGIT_REGEX = /\D/g;
const MAX_PHONE_NUMBER_LENGTH = 20;

export const normalizeDigits = (value: string): string =>
  String(value || '').replace(NON_DIGIT_REGEX, '');

export const normalizeCallingCode = (callingCode: string): string =>
  normalizeDigits(callingCode);

export const normalizePhoneRegex = (regex: string): string =>
  String(regex || '').replace(/(^|[^\\])d\{/g, '$1\\d{');

const countriesByCallingCode = getCountries().sort(
  (left, right) =>
    normalizeCallingCode(right.callingCode).length -
    normalizeCallingCode(left.callingCode).length
);

export const getCountryByCode = (
  code: CountryCode | string | undefined
): EachCountry => {
  const fallback = constants.US;

  if (!code) {
    return fallback;
  }

  return constants[code.toUpperCase() as CountryCode] || fallback;
};

export const toSelectedCountryPayload = (
  country: EachCountry
): Pick<EachCountry, 'countryCode' | 'callingCode'> => ({
  countryCode: country.countryCode,
  callingCode: country.callingCode,
});

export const parsePhoneValue = (
  value: string,
  defaultCountry?: CountryCode
): ParsedPhoneValue => {
  const rawValue = String(value || '').trim();
  const digits = normalizeDigits(rawValue);

  if (!digits) {
    return {
      country: defaultCountry ? getCountryByCode(defaultCountry) : undefined,
      nationalNumber: '',
    };
  }

  const hasInternationalPrefix = rawValue.startsWith('+');
  const matchedCountry = countriesByCallingCode.find((country) => {
    const callingCode = normalizeCallingCode(country.callingCode);

    if (!callingCode || !digits.startsWith(callingCode)) {
      return false;
    }

    return hasInternationalPrefix || callingCode.length > 1;
  });

  if (!matchedCountry) {
    return {
      country: defaultCountry ? getCountryByCode(defaultCountry) : undefined,
      nationalNumber: digits,
    };
  }

  const callingCode = normalizeCallingCode(matchedCountry.callingCode);

  return {
    country: matchedCountry,
    nationalNumber: digits.slice(callingCode.length),
  };
};

const readQuantifier = (
  pattern: string,
  startIndex: number
): { repeat: number; nextIndex: number } => {
  if (pattern[startIndex] !== '{') {
    return { repeat: 1, nextIndex: startIndex };
  }

  const endIndex = pattern.indexOf('}', startIndex);

  if (endIndex === -1) {
    return { repeat: 1, nextIndex: startIndex };
  }

  const [min, max] = pattern
    .slice(startIndex + 1, endIndex)
    .split(',')
    .map((value) => Number(value));

  return {
    repeat: Number.isFinite(max) ? max : min,
    nextIndex: endIndex + 1,
  };
};

const calculateMaxPatternLength = (pattern: string): number => {
  let maxLength = 0;
  let index = 0;

  while (index < pattern.length) {
    const token = pattern[index];

    if (token === '\\') {
      const quantifier = readQuantifier(pattern, index + 2);

      maxLength += quantifier.repeat;
      index = quantifier.nextIndex;
      continue;
    }

    if (token === '[') {
      const endIndex = pattern.indexOf(']', index + 1);

      if (endIndex === -1) {
        index += 1;
        continue;
      }

      const quantifier = readQuantifier(pattern, endIndex + 1);

      maxLength += quantifier.repeat;
      index = quantifier.nextIndex;
      continue;
    }

    if (/\d/.test(token)) {
      const quantifier = readQuantifier(pattern, index + 1);

      maxLength += quantifier.repeat;
      index = quantifier.nextIndex;
      continue;
    }

    index += 1;
  }

  return maxLength;
};

export const getMaxNationalNumberLength = (country: EachCountry): number => {
  const nationalPattern = normalizePhoneRegex(country.regex)
    .replace(/^\^/, '')
    .replace(/\$$/, '')
    .replace(/^\([^)]*\)\?/, '');
  const maxLength = calculateMaxPatternLength(nationalPattern);

  return maxLength || MAX_PHONE_NUMBER_LENGTH;
};

export const sanitizePhoneInputValue = (
  value: string,
  country: EachCountry
): string => normalizeDigits(value).slice(0, getMaxNationalNumberLength(country));

export const isValidForCountry = (
  country: EachCountry,
  value: string
): boolean => {
  const digits = normalizeDigits(value);
  const callingCode = normalizeCallingCode(country.callingCode);
  const valuesToTest = [digits, `${callingCode}${digits}`, `+${callingCode}${digits}`];
  const regex = new RegExp(normalizePhoneRegex(country.regex));

  return valuesToTest.some((candidate) => regex.test(candidate));
};
