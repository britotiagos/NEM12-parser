# NEM12 File Parser

A Node.js utility that converts NEM12 (National Electricity Market) meter reading files into SQL statements for database insertion.

## Features

- Parses NEM12 format files containing meter reading data
- Handles both 200 (configuration) and 300 (reading) record types
- Generates SQL INSERT statements for meter readings
- Supports configurable interval lengths (30 or 60 minutes)
- Writes output to a SQL file for easy database import

## Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
yarn install
```

## Usage

```bash
node index.js [path-to-nem12-file]
```

The program will:
1. Read the specified NEM12 file
2. Process each record
3. Generate corresponding SQL statements
4. Write the statements to `output.sql` in the project directory

## File Format Support

### Input (NEM12)
The parser expects NEM12 files with:
- 200 records: Contains meter configuration
  - NMI (National Meter Identifier)
  - Interval length (30 or 60 minutes)
- 300 records: Contains consumption readings
  - Timestamp
  - Consumption values

### Output (SQL)
Generates SQL INSERT statements in the format:
```sql
INSERT INTO meter_readings (nmi, timestamp, consumption)
VALUES ('NMI123456789', '2024-01-01T00:30:00.000Z', 0.123);
```

## Testing

```bash
# Run tests
yarn test
```

## Project Structure

- `index.js`: Main entry point and file processing logic
- `helpers.js`: Utility functions for parsing and SQL generation
- `helpers.test.js`: Test suite for utility functions
- `output.sql`: Generated SQL statements (created when program runs)

## Dependencies

- Node.js built-in modules:
  - `fs`: File system operations
  - `readline`: Line-by-line file reading
- Development dependencies:
  - `jest`: Testing framework

## License

MIT
