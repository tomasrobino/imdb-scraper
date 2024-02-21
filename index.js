import { input, select } from "@inquirer/prompts";


const ID_STRING = "\"ipc-metadata-list-summary-item__t\"";

const searchAnswer = await input({ message: "Search:" });
const encodedAnswer = encodeURI(searchAnswer);
let scrapedSearch;
scrapedSearch = await fetch("https://www.imdb.com/find/?q="+encodedAnswer+"&ref_=nv_sr_sm").then(res => res.text());

const searchResults = [];
let indexVal = 0;
for (let i = 0; i < 5; i++) {
    indexVal = scrapedSearch.indexOf("href", scrapedSearch.indexOf(ID_STRING, indexVal)) + 6;
    let endIndex = scrapedSearch.indexOf("\"", indexVal);
    searchResults.push({
        name: scrapedSearch.substring(endIndex+2,scrapedSearch.indexOf("<", endIndex)),
        value: "https://www.imdb.com/" + scrapedSearch.substring(indexVal, endIndex)
    });
}

const resultsAnswer = select({ message: "Select one of the following results:", choices: searchResults })