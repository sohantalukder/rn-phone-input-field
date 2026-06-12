import constants from './constants';
import type { CountryCode, EachCountry } from './constants.d';

export const getCountries = (): EachCountry[] =>
  (Object.keys(constants) as CountryCode[]).map((code) => constants[code]);
