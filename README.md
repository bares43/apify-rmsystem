# RMSystem stocks scraper

This RMSystem stocks scraper provides an API for retrieving data about stocks that are traded on Czech RMSystem.

## Features

- Base data: name, code, ISIN and url
- Price
  - Current price
  - Open and close price for last trading day
  - Minimum and maximum price for last trading day
- Volume for last trading day
- EasyClick lots
- Depth of market

## Examples

### Load all stocks

- You can use different lists like https://www.rmsystem.cz/kurzy-online/akcie/easyclick or https://www.rmsystem.cz/kurzy-online/akcie/oficialni-trh etc.

#### Input

```json
{
  "startUrls": [
    {
      "url": "https://www.rmsystem.cz/kurzy-online/akcie/easyclick"
    }
  ], 
  "resultType": "list"
}
```

#### Output

```json
{
  "BAAGOOGL": {
    "name": "ALPHABET",
    "code": "BAAGOOGL",
    "isin": "US02079K3059",
    "url": "https://www.rmsystem.cz/akcie-95488-Google",
    "price": 71200,
    "openPrice": 71200,
    "closePrice": 71200,
    "minimumPrice": 71200,
    "maximumPrice": 71200,
    "volume": 0,
    "volumeMoney": 0,
    "easyClickLot": 5,
    "depth": [
      {
        "price": 70000,
        "amount": 1,
        "orders": 1
      },
      {
        "price": 64240,
        "amount": 5,
        "orders": 2
      }
    ],
    "scrapedAt": "2022-01-01T17:19:56.399Z"
  },
  ...
}
```

### Load one specific stock

#### Input

```json
{
  "startUrls": [
    {
      "url": "https://www.rmsystem.cz/akcie-95488-Google"
    }
  ], 
  "resultType": "single"
}
```

#### Output

```json
{
  "name": "ALPHABET",
  "code": "BAAGOOGL",
  "isin": "US02079K3059",
  "url": "https://www.rmsystem.cz/akcie-95488-Google",
  "price": 71200,
  "openPrice": 71200,
  "closePrice": 71200,
  "minimumPrice": 71200,
  "maximumPrice": 71200,
  "volume": 0,
  "volumeMoney": 0,
  "easyClickLot": 5,
  "depth": [
    {
      "price": 70000,
      "amount": 1,
      "orders": 1
    },
    {
      "price": 64240,
      "amount": 5,
      "orders": 2
    }
  ],
  "scrapedAt": "2022-01-01T18:56:16.105Z"
}
```

### Load more specific stocks

#### Input

```json
{
  "startUrls": [
    {
      "url": "https://www.rmsystem.cz/akcie-95488-Google"
    },
    {
      "url": "https://www.rmsystem.cz/akcie-69716-microsoft"
    }
  ], 
  "resultType": "list"
}
```

#### Output

```json
{
  "BAAGOOGL": {
    "name": "ALPHABET",
    "code": "BAAGOOGL",
    "isin": "US02079K3059",
    "url": "https://www.rmsystem.cz/akcie-95488-Google",
    "price": 71200,
    "openPrice": 71200,
    "closePrice": 71200,
    "minimumPrice": 71200,
    "maximumPrice": 71200,
    "volume": 0,
    "volumeMoney": 0,
    "easyClickLot": 5,
    "depth": [
      {
        "price": 70000,
        "amount": 1,
        "orders": 1
      },
      {
        "price": 64240,
        "amount": 5,
        "orders": 2
      }
    ],
    "scrapedAt": "2022-01-01T18:57:52.557Z"
  },
  "BAAMICRC": {
    "name": "MICROSOFT CORP",
    "code": "BAAMICRC",
    "isin": "US5949181045",
    "url": "https://www.rmsystem.cz/akcie-69716-microsoft",
    "price": 8500,
    "openPrice": 8500,
    "closePrice": 8500,
    "minimumPrice": 8500,
    "maximumPrice": 8588,
    "volume": 170880,
    "volumeMoney": 20,
    "easyClickLot": 50,
    "depth": [
      {
        "price": 8998,
        "amount": 20,
        "orders": 5
      },
      {
        "price": 8800,
        "amount": 19,
        "orders": 4
      },
      {
        "price": 8790,
        "amount": 13,
        "orders": 2
      },
      {
        "price": 8600,
        "amount": 12,
        "orders": 1
      },
      {
        "price": 8400,
        "amount": 5,
        "orders": 1
      },
      {
        "price": 8350,
        "amount": 7,
        "orders": 2
      },
      {
        "price": 7494,
        "amount": 57,
        "orders": 3
      }
    ],
    "scrapedAt": "2022-01-01T18:57:52.531Z"
  }
}
```