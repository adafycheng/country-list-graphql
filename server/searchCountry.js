import { getCountries } from './db/countries.js';
import { getCountry } from './db/countries.js';

export async function handleListAll(req, res) {
  const countries = await getCountries();
  res.send(countries);
}

export async function handleSearch(req, res) {
  const isoCode = req.query.code;
  const country = await getCountry(isoCode);
  if (country == null) {
    res.sendStatus(404);
  } else {
    res.send(country);
  }
}
  