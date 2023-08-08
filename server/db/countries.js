import { connection } from './connection.js';

const getCountryTable = () => connection.table('country');

export async function getCountries() {
  return await getCountryTable();
}

export async function getCountryByIsoCode(isoCode) {
  return await getCountryTable().first().where({ isoCode });
}

export async function getCountryByNameEn(nameEn) {
  return await getCountryTable().first().where({ nameEn });
}
