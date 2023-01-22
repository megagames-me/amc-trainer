import getAMC8Data from "./data/amc8.js"
import getAMC10Data from "./data/amc10.js"
import getAMC12Data from "./data/amc12.js"
import getAHSMEData from "./data/ahsme.js"
import totalChunks from "./data/chunks.js"
import fs from "fs"
import cliProgress from "cli-progress"

const timeBefore = Date.now();


console.log("BEGINNING COMPILE PROCESS.")
console.log("THIS PROCESS TAKES UP TO 6 MINUTES.")
console.log("CLICK CTRL-C NOW IF THIS PROGRAM IS RUNNING UNNECESSARILY.")
console.log("Getting total chunks...");

totalChunks().then(chunks => {
	// create a new progress bar instance and use shades_classic theme
	// create new container
	const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
		etaBuffer: 100,
		etaAsynchronousUpdate: true,
		hideCursor: true,
	}, cliProgress.Presets.shades_classic);

	process.on('SIGINT', function() {
    multibar.stop();
		bar1.stop();
    process.exit();
	});

	// add bars
	const bar1 = multibar.create(chunks, 0);

	
	function callback(text) {
		bar1.increment();
		multibar.log(text + "\n");
	}
	
	
	
	let data = [getAMC8Data(callback), getAMC10Data(callback), getAMC12Data(callback), getAHSMEData(callback)];
	// let data = [getAMC8Data(),2,3,4]
	
	Promise.all(data).then((values) => {
		let finalObject = {
			"amc8": {
				"name": "amc8",
				"formattedName": "AMC 8",
				"time": 1000 * 60 * 40,
				"correct": 1,
				"incorrect": 0,
				"blank": 0,
				"contests": values[0],
			},
			"amc10": {
				"name" : "amc10",
				"formattedName": "AMC 10",
				"time": 1000 * 60 * 75,
				"correct": 6,
				"incorrect": 0,
				"blank": 1.5,
				"contests": values[1],
			},
			"amc12": {
				"name" : "amc12",
				"formattedName": "AMC 12",
				"time": 1000 * 60 * 75,
				"correct": 6,
				"incorrect": 0,
				"blank": 1.5,
				"contests": values[2],
			},
			"ahsme": {
				"name" : "ahsme",
				"formattedName": "AHSME",
				"time": 1000 * 60 * 90,
				"correct": 5,
				"incorrect": 0,
				"blank": 2,
				"contests": values[3],
			}
		};
		console.log(finalObject);
	  const string = JSON.stringify(finalObject);
	  fs.writeFileSync('./tools/result.json', string);
		multibar.stop();
		bar1.stop();
	
	  console.log("Completed in", Date.now() - timeBefore, "ms." )
	});


});

