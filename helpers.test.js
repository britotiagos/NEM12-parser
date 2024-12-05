const { generateSQL, calculateTimestamp } = require("./helpers");

describe("generateSQL", () => {
  it("should generate correct SQL", () => {
    const sql = generateSQL("NEM1201009", "2024-12-01T00:30:00.000Z", "0.461");
    expect(sql.trim()).toBe(
      `
      INSERT INTO meter_readings (nmi, timestamp, consumption)
      VALUES ('NEM1201009', '2024-12-01T00:30:00.000Z', 0.461);
    `.trim()
    );
  });
});

describe("calculateTimestamp", () => {
  it("should calculate correct timestamp for 30-minute intervals", () => {
    const timestamp = calculateTimestamp("20241201", 1, 30);
    expect(timestamp).toBe("2024-12-01T00:30:00.000Z");
  });

  it("should calculate correct timestamp for 60-minute intervals", () => {
    const timestamp = calculateTimestamp("20241201", 2, 60);
    expect(timestamp).toBe("2024-12-01T02:00:00.000Z");
  });
});
