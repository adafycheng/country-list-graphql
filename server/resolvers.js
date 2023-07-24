import { getCountries } from './db/countries.js';

export const resolvers = {
    Query: {
        countries: () => getCountries()
    },
}