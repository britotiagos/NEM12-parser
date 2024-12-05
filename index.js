const fs = require("fs");
const readline = require("readline");
const { processLine } = require("./helpers");

const outputFilePath = "./output.sql";

async function parseFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const writeStream = fs.createWriteStream(outputFilePath);
  writeStream.write("-- SQL Statements Generated from NEM12 File\n");

  let currentNMI = null;
  let intervalLength = null;

  for await (const line of rl) {
    const result = processLine(line, currentNMI, intervalLength);

    if (result.nmi) currentNMI = result.nmi;
    if (result.intervalLength) intervalLength = result.intervalLength;

    if (result.sql) {
      writeStream.write(result.sql + "\n"); // Write SQL to the file
    }
  }

  writeStream.end(() => {
    console.log(`SQL statements written to ${outputFilePath}`);
  });
}

// Entry point
const filePath = "sample.nem12 ";
parseFile(filePath).catch((err) => {
  console.error(`Error processing file: ${err.message}`);
});
