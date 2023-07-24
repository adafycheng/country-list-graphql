DROP TABLE country;

CREATE TABLE country (
    isoCode         CHAR(2)         primary key,    /* ISO Alpha-2 code */
    isoCodeA3       CHAR(3),                        /* ISO Alpha-3 code */
    isoNumCode      CHAR(3),                        /* ISO Numeric code */
    countryCode     VARCHAR(15),                    /* Country code, phone calling code */
    nameEn          VARCHAR(60)                     /* Country Name in English */
);
