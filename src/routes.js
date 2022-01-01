const { formatFloat, formatInt } = require('./utils');

exports.handleList = async (request, $, requestQueue) => {
  for (const row of $('table.tbl1 tr a')) {
    const $row = $(row);

    const href = $row.attr('href');

    const url = `https://www.rmsystem.cz/${href}`;

    await requestQueue.addRequest({ url });
  }
};

exports.handleDetail = async (request, $, data) => {
  const baseData = $('#detailcp-souhrn h1').text().split('(');

  const name = baseData[0].trim();
  const code = baseData[1].split(',')[0];
  const isin = baseData[1].split(',')[1].replace(')', '').trim();

  const price = $('#souhrn-body h5').text();

  const openPrice = $('#souhrn-body table tr').eq(0).find('td').eq(1).text();
  const minimumPrice = $('#souhrn-body table tr').eq(1).find('td').eq(1).text();
  const maximumPrice = $('#souhrn-body table tr').eq(2).find('td').eq(1).text();
  const closePrice = $('#souhrn-body table tr').eq(3).find('td').eq(1).text();

  const volume = $('#souhrn-body table tr').eq(0).find('td').eq(3).text();
  const volumeMoney = $('#souhrn-body table tr').eq(1).find('td').eq(3).text();

  const easyClickLot = $('#souhrn-body table tr').eq(1).find('td').eq(5).text();

  const depth = [];

  for (const depthItem of $('#hloubka-tbl table tr:not(.stred)')) {
    if ($(depthItem).find('td').is('.th')) {
      continue;
    }

    depth.push({
      price: formatFloat($(depthItem).find('td').eq(0).text()),
      amount: formatInt($(depthItem).find('td').eq(1).text()),
      orders: formatInt($(depthItem).find('td').eq(2).text()),
    });
  }

  data.Stocks.push({
    name,
    code,
    isin,
    url: request.url,
    price: formatFloat(price),
    openPrice: formatFloat(openPrice),
    closePrice: formatFloat(closePrice),
    minimumPrice: formatFloat(minimumPrice),
    maximumPrice: formatFloat(maximumPrice),
    volume: formatInt(volume),
    volumeMoney: formatInt(volumeMoney),
    easyClickLot: formatInt(easyClickLot),
    depth,
    scrapedAt: new Date(),
  });
};

exports.getPageType = (request) => {
  if (request.url.includes('akcie-')) {
    return 'detail';
  }

  return 'list';
};
