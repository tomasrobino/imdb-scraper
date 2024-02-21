import { input } from "@inquirer/prompts";



//const answer = await input({ message: "Search:" });
const answer = "starship tr"
const encodedAnswer = encodeURI(answer);
let scrapedSearch;
scrapedSearch = await fetch("https://www.imdb.com/find/?q="+encodedAnswer+"&ref_=nv_sr_sm").then(res => res.text());