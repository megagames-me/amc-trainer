import fetch from "cross-fetch"
import { JSDOM } from "jsdom"
import fs from "fs"

async function getDOM(link) {
	try {
		var data = await fetch(link);	
	} catch {
		console.error("Could not fetch data from " + link);
	}
	const dataJSON = await data.json();
	return new JSDOM(dataJSON.parse.text["*"]);
}

async function getAMC12Data(chunkDone) {
	const contestListDOM = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page=AMC_12_Problems_and_Solutions&format=json");
	
  let finalData = {};

  const contestLinks = contestListDOM.window.document.querySelectorAll("tr > td > a")

	
  for (let contestLink of contestLinks) {
		// Repeating through every contest
		
    const serializedContestTitle = contestLink.title.replace(/\ /g, "_");

		// Make sure that the link starts with a number, just in case that we select a link that we don't want.
    if (isNaN(parseInt(contestLink.title[0]))) continue;

    finalData[serializedContestTitle] = {
      title: serializedContestTitle,
      year: Number(serializedContestTitle.slice(0, 4)),
      formattedTitle: contestLink.title + " Contest",
      link: "https://artofproblemsolving.com/" + contestLink.href,
      problems: {}
    }
    // console.log("Getting " + serializedContestTitle + "...")

		// Get list of all problems in contest i and the answer key for the contest
    const contestProblemListDOM = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page="+ serializedContestTitle+ "&format=json");
    const contestAnswerListDOM = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page=" + serializedContestTitle + "_Answer_Key&format=json");
		chunkDone("Getting " + serializedContestTitle + "...");
		
    let problemLinks = contestProblemListDOM.window.document.querySelectorAll("li > ul > li > a");
		if (problemLinks.length == 0) {
			problemLinks = Array.from(contestProblemListDOM.window.document.querySelectorAll("ul > li > a")).filter(t => t.textContent.includes("Problem "));
		}
    const answers = contestAnswerListDOM.window.document.querySelectorAll("ol > li");

		// asynchronous fetching
		let problemAsync = [];
		
    for (let [problemIndex, problemLink] of problemLinks.entries()) {
			// Repeating through every problem in contest i

			problemAsync.push(new Promise(async (resolve, reject) => {
				const serializedProblemTitle = problemLink.title.replace(/\ /g, "_");
	      finalData[serializedContestTitle].problems[serializedProblemTitle] = {
	        title: serializedProblemTitle,
	        formattitle: "Problem " + String(problemIndex + 1),
	        contest: serializedContestTitle,
	        link: "https://artofproblemsolving.com/" + problemLink.href,
	        data: {
	          problem: "",
	          solutions: {},
	          answer: answers[problemIndex].textContent
	        }
	      }
				
	      
	
	      const problemDOM = await getDOM("https://artofproblemsolving.com/wiki/api.php?action=parse&page="+ serializedProblemTitle+ "&format=json");
	
	      const problemInfoEle = problemDOM.window.document.querySelector(".mw-parser-output");
	
				// remove unneeded bloat (edit wiki section link)
	      const editLinks = problemDOM.window.document.querySelectorAll(".mw-editsection");
	      for (const ele of editLinks) {
	        ele.remove();
	      }
	
				// change local links so that they work properly in this website
	      const links = problemDOM.window.document.querySelectorAll("a");
	      for (let i = 0; i < links.length; i++) {
	        if (links[i].href.startsWith("/wiki")) {
	          links[i].href = "https://artofproblemsolving.com" + links[i].href;
	        }
	      }
	
				// start scraping data on problem description and all solutions
	
				// mode tells what data we are currently looking at so that we can correctly add data
	      let mode = [null, null];
				
				// repeat through every element in problemInfoEle
	      for (let curEle of problemInfoEle.children) {
					// check if curEle is a heading element, if so then we know that it would be time to change sections
	        if (curEle instanceof problemDOM.window.HTMLHeadingElement) {
	          if (curEle
								.textContent
								.toLocaleLowerCase()
								.startsWith("problem")) {
	            mode = ["p", curEle];
	          } else if ((curEle
												.textContent
												.toLocaleLowerCase()
												.startsWith("solution") || 
												curEle
												.textContent
												.toLocaleLowerCase()
												.startsWith("video")) && 
												!curEle
												.textContent
												.toLocaleLowerCase().
												startsWith("solutions")) {
	            mode = ["s", curEle];
							finalData[serializedContestTitle]
								.problems[serializedProblemTitle]
								.data.solutions[curEle.textContent] = {
	              title: curEle.textContent,
	              text: ""
	            };
	          } 
						// if not problem or solution, ignore current area
						else {
	            mode = [null, null];
	          }
	        } 
					// if not a heading, probably scrumptious data. however, we must check whether the dom elements are stuff that we want to save.
					else if ((curEle instanceof problemDOM.window.HTMLParagraphElement) 
									 || (curEle instanceof problemDOM.window.HTMLUListElement) 
									 || (curEle instanceof problemDOM.window.HTMLOListElement) 
									 || (curEle instanceof problemDOM.window.HTMLLIElement) 
									 || (curEle instanceof problemDOM.window.HTMLImageElement) 
									 || (curEle instanceof problemDOM.window.HTMLPreElement) 
									 || curEle.tagName == "CENTER") {
	          switch (mode[0]) {
	            case "p":
								// add all data to problem information
	              finalData[serializedContestTitle]
									.problems[serializedProblemTitle]
									.data.problem += curEle.outerHTML;
	              break;
	        
	            case "s":
								// add all data to solution information, with solution title
	              finalData[serializedContestTitle]
									.problems[serializedProblemTitle]
									.data.solutions[mode[1].textContent]
									.text += curEle.outerHTML;
	              break;
	          }
	        } else if (!(curEle instanceof problemDOM.window.HTMLLIElement) 
										 && !(curEle instanceof problemDOM
													.window.HTMLUListElement) 
										 && !(curEle instanceof problemDOM
													.window.HTMLOListElement)) {
	            mode = [null, null];
	        }
	      } 
	      finalData[serializedContestTitle]
					.problems[serializedProblemTitle]
					.data
					.solutions = 
					Object.values(
						finalData[serializedContestTitle]
						.problems[serializedProblemTitle].data.solutions);	
				// console.log("Got " + serializedProblemTitle + ".")
				resolve("");
				chunkDone("Got " + serializedProblemTitle + ".");
			}));
			
      
    } 
    await Promise.all(problemAsync);
	}
  
  return finalData;
}

export default getAMC12Data;
