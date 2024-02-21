import { input } from "@inquirer/prompts";



const ID_STRING = "\"ipc-metadata-list-summary-item__t\"";

//const answer = await input({ message: "Search:" });
const answer = "starship tr"
const encodedAnswer = encodeURI(answer);
let scrapedSearch;
scrapedSearch = await fetch("https://www.imdb.com/find/?q="+encodedAnswer+"&ref_=nv_sr_sm").then(res => res.text());
//const idStringIndex = scrapedSearch.indexOf(ID_STRING);

const searchResults = [];
let indexVal = 0;
for (let i = 0; i < 5; i++) {
    indexVal = scrapedSearch.indexOf("href", scrapedSearch.indexOf(ID_STRING, indexVal)) + 6;
    let endIndex = scrapedSearch.indexOf("\"", indexVal);
    searchResults.push(scrapedSearch.substring(indexVal, endIndex));
}

console.log(searchResults);