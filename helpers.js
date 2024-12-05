function processLine(line, currentNMI, intervalLength) {
  const parts = line.split(",");

  if (line.startsWith("200")) {
    // Parse 200 record
    return {
      nmi: parts[1], // Extract NMI
      intervalLength: parseInt(parts[8], 10), // Extract interval length
    };
  }

  if (line.startsWith("300")) {
    // Parse 300 record
    const timestamp = parts[1];
    const consumptions = parts.slice(2, -4); // Adjust based on file structure

    const sqlStatements = consumptions
      .map((consumption, index) => {
        if (consumption !== "A" && consumption.trim()) {
          const intervalTime = calculateTimestamp(
            timestamp,
            index,
            intervalLength
          );
          return generateSQL(currentNMI, intervalTime, consumption);
        }
        return null;
      })
      .filter((sql) => sql !== null);

    return { sql: sqlStatements.join("\n") };
  }

  return {}; // No action for other records
}

function calculateTimestamp(date, index, intervalLength) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const baseTime = Date.UTC(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    0,
    0,
    0
  );
  const intervalMillis = index * intervalLength * 60 * 1000;
  return new Date(baseTime + intervalMillis).toISOString();
}

function generateSQL(nmi, timestamp, consumption) {
  return `INSERT INTO meter_readings (nmi, timestamp, consumption)
      VALUES ('${nmi}', '${timestamp}', ${consumption});`;
}

module.exports = { processLine, calculateTimestamp, generateSQL };
