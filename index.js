import { input, select } from "@inquirer/prompts";
import fs from "node:fs";


const ID_STRING = "\"ipc-metadata-list-summary-item__t\"";

const searchAnswer = await input({ message: "Search:" });
const encodedAnswer = encodeURI(searchAnswer);
const scrapedSearch = await fetch("https://www.imdb.com/find/?q="+encodedAnswer+"&ref_=nv_sr_sm").then(res => res.text());

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

const resultsAnswer = await select({ message: "Select one of the following results:", choices: searchResults });
const scrapedTitle = await fetch(resultsAnswer).then(res => res.text()).then(res => {fs.writeFile("scraped.html", res, err => {}); return res});

const titleIndex = scrapedTitle.indexOf("<span class=\"sc-bde20123-1 cMEQkK\">")+1;
console.log("Rating: " + scrapedTitle.substring(scrapedTitle.indexOf(">", titleIndex)+1, scrapedTitle.indexOf("<", titleIndex)));
