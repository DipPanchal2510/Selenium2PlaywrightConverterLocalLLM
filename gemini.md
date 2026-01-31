# Gemini - Project Constitution

## Data Schemas

### Conversion Request (Input)
```json
{
  "sourceCode": "string",
  "sourceFramework": "TestNG/Java",
  "targetLanguage": "JavaScript/TypeScript",
  "options": {
    "outputDirectory": "string"
  }
}
```

### Conversion Response (Output)
```json
{
  "convertedCode": "string",
  "filePath": "string",
  "status": "success | failure",
  "message": "string"
}
```

## Behavioral Rules
- **Convert Everything:** Every meaningful Selenium action, assertion, and TestNG annotation must have a Playwright equivalent.
- **UI First:** The primary interface for interaction is a web UI where users paste code.
- **Deterministic Mapping:** Use a robust mapping for Selenium to Playwright API calls.
- **Project Structure:** Maintain a clean directory structure for converted files.


## Architectural Invariants
- `architecture/` contains technical SOPs in Markdown.
- `tools/` contains deterministic scripts (Python/Node.js).
- `.tmp/` is used for intermediate file operations.
- `.env` stores environment variables and secrets.
