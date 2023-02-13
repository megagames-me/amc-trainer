import { PrismaClient } from "@prisma/client";
import { readFile, writeFile } from "fs/promises";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const _filename = (path) => {
  return fileURLToPath(path);
};

const _dirname = (path) => {
  return dirname(_filename(path));
};

const dir = _dirname(import.meta.url);

const prisma = new PrismaClient();

async function main() {
	await prisma.contest.deleteMany({});
	await prisma.problem.deleteMany({});
	// await prisma.$executeRaw(`ALTER TABLE Contest AUTO_INCREMENT = 0;`);
	// await prisma.$executeRaw(`ALTER TABLE Problem AUTO_INCREMENT = 0;`);
	
	const rawData = await readFile(dir + "/result.json", {encoding: "utf8"});
	const jsonData = JSON.parse(rawData);

	let createManyData = [];
	for (let contestType of Object.values(jsonData)) {
		// console.log(contestType);
		createManyData = [...createManyData, ...Object.values(contestType.contests).map(contest => {
			return {
				title: contest.title,
				year: contest.year,
				formattedTitle: contest.formattedTitle,
				link: contest.link,
				type: contestType.name.toUpperCase()
			}
		})]
	}
	
	await prisma.contest.createMany({
		data: createManyData
	});

	const contests = await prisma.contest.findMany({});

	let problemManyData = [];
	for (let contestType of Object.values(jsonData)) {
		for (let contest of Object.values(contestType.contests)) {
			problemManyData = [...problemManyData, ...Object.values(contest.problems).map(problem => {
				// console.log(problem.title);
				return {
					title: problem.title,
					year: problem.year,
					formattedTitle: problem.formattitle,
					link: problem.link,
					type: contestType.name.toUpperCase(),
					contestId: contests.find(ct => ct.title == problem.contest).id,
					problemNum: Number(problem.formattitle.slice(8)),
					answer: problem.data.answer, // 
					problem: problem.data.problem, //
					solutions: problem.data.solutions //
				}
			})]
		}
	}

	const problems = await prisma.problem.createMany({data: problemManyData});
	// console.log(problems);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
		await writeFile(dir + "/error.log", e.stack);
    console.error("There was an error. Please check ./error.log")
    await prisma.$disconnect()
    process.exit(1)
  })