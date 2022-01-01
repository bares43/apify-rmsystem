const Apify = require('apify');
const { handleList, handleDetail, getPageType } = require('./src/routes');

const { utils: { log } } = Apify;

Apify.main(async () => {
  const { startUrls, resultType } = await Apify.getInput();

  const requestList = await Apify.openRequestList('start-urls', startUrls);
  const requestQueue = await Apify.openRequestQueue();

  const data = {};
  data.Stocks = [];

  const crawler = new Apify.CheerioCrawler({
    requestList,
    requestQueue,
    maxConcurrency: 50,
    handlePageFunction: async (context) => {
      const { $, request } = context;

      const pageType = getPageType(request);

      if (pageType === 'list') {
        await handleList(request, $, requestQueue);
      } else if (pageType === 'detail') {
        await handleDetail(request, $, data);
      }
    },
  });

  log.info('Starting the crawl.');
  await crawler.run();
  log.info('Crawl finished.');

  data.Stocks.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  if (resultType === 'single') {
    await Apify.pushData(data.Stocks);
  } else {
    const result = {};

    for (const item of data.Stocks) {
      result[item.code] = item;
    }

    await Apify.pushData(result);
  }
});
