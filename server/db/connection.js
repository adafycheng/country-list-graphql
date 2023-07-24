import knex from 'knex';
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname + "/";
const resolvedPath = path.resolve(baseDir + '../data/country.db');

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: resolvedPath,
  },
  useNullAsDefault: true,
});
