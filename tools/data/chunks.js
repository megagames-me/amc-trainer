import fetch from "cross-fetch";
import { JSDOM } from "jsdom"

async function getDOM(link) {
	try {
		var data = await fetch(link);	
	} catch {
		console.error("Could not fetch data from " + link);
	}
	const dataJSON = await data.json();
	return new JSDOM(dataJSON.parse.text["*"]);
}

async function totalChunks() {
	let chunks = 1860;

	// amc8 list
	const amc8 = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page=AMC_8_Problems_and_Solutions&format=json");
	const amc8Contests = Array.from(amc8.window.document.querySelectorAll("ul > li > a"));
	chunks += amc8Contests.filter(ele => !isNaN(Number(ele.textContent[0]))).length * 26;
	
	const amc10 = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page=AMC_10_Problems_and_Solutions&format=json");
	chunks += amc10.window.document.querySelectorAll("tr > td > a").length * 26;

	const amc12 = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page=AMC_12_Problems_and_Solutions&format=json");
	chunks += amc12.window.document.querySelectorAll("tr > td > a").length * 26;

	return chunks;
}

export default totalChunks;