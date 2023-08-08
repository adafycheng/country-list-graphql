import {getCountries, getCountryByIsoCode} from './db/countries.js';

export const resolvers = {
    Query: {
        countries: () => getCountries(),
        country: (_root, { isoCode }) => getCountryByIsoCode(isoCode),
    },
}