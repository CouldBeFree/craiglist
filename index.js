const request = require('request-promise');
const cheerio = require('cheerio');

//37
const url = 'https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof';

const scrapeResults = [];
async function scrapeCraigList() {
  try{
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);

    $('.result-info').each((index, element) => {
      const resultTitle = $(element).children('.result-title');
      const title = resultTitle.text();
      const url = resultTitle.attr('href');
      const datePosted = new Date($(element).children('time').attr('datetime'));
      const scrapeResult = { title, url, datePosted };
      scrapeResults.push(scrapeResult);
    });

    console.log(scrapeResults);
  } catch (err) {
    console.error(err)
  }
}

scrapeCraigList();