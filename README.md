# Country List

This is a project which demonstrates GraphQL.

It uses Apollo Server with Express, and GraphQL-Request and Apollo Client as GraphQL clients. The application is used to explain queries, mutations, custom object types, authentication, etc.


## Data - SQLite

1. Download a copy of pre-built binaries from the official download page. Or by apt install in Ubuntu Linux.

```shell
apt install sqlite3
```

2. In Terminal / Command Prompt, create an empty database, namely e.g. country.db.

```shell
sqlite3 country.db
```

3. Import table schema from file.

```shell
.read create_tables.sql
```

4. Insert data from file.

```shell
.read insert_data.sql
```

## Server

A Node.js express server responding to the queries for countries using Apollo GraphQL server.

### Development

1. Create package.json.

    ```json
    {
        "name": "country-list-server",
        "private": true,
        "license": "MIT",
        "type": "module",
        "scripts": {
            "start": "nodemon server.js"
        },
        "dependencies": {
            "better-sqlite3": "^8.3.0",
            "@apollo/server": "^4.7.5",
            "graphql": "^16.7.1",
            "knex": "^2.4.2"
        },
        "devDependencies": {
        "nodemon": "^2.0.22"
        },
        "nodemonConfig": {
        "ext": "graphql,js"
        }
    }
    ```

2. Install dependencies.

    ```shell
    npm install
    ```

3. Create server.js.

4. Start server.

    ```shell
    npm start
    ```

### Test Locally

1. Open http://localhost:9000/graphqlOt-graphql.vercel.app/ in browser.

2. Get all countries at https://country-list-graphql.vercel.app/countries.

3. Get country by code at https://country-list-graphql.vercel.app/country?code=HK.

4. To search for a specific country by ISO Code, type the following command in Terminal / Command Prompt:

```shell
export GRAPHQL_SERVER=https://country-list-graphql.vercel.app

curl --request POST \
--header 'content-type: application/json' \
--url "$GRAPHQL_SERVER" \
--data '{"query":"query { country(isoCode: \"HK\") { countryCode isoCode isoCodeA3 nameEn } }"}' | jq
```
