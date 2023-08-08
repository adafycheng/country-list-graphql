import { getCountries, getCountryByIsoCode } from './db/countries.js';

export async function handleListAll(req, res) {
  const countries = await getCountries();
  res.send(countries);
}

export async function handleSearchByIsoCode(req, res) {
  const isoCode = req.query.code;
  const country = await getCountryByIsoCode(isoCode);
  if (country == null) {
    res.sendStatus(404);
  } else {
    res.send(country);
  }
}
  