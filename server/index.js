const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure converted directory exists
const CONVERTED_DIR = path.join(__dirname, '..', 'converted_tests');
if (!fs.existsSync(CONVERTED_DIR)) {
    fs.mkdirSync(CONVERTED_DIR, { recursive: true });
}

app.post('/api/convert', async (req, res) => {
    const { sourceCode } = req.body;

    if (!sourceCode) {
        return res.status(400).json({ error: 'Source code is required' });
    }

    try {
        const prompt = `
        You are an expert Automation Engineer. Convert the following Selenium Java (TestNG) code into Playwright TypeScript.
        
        ### Rules:
        - Use Playwright Test runner.
        - Use async/await.
        - Map TestNG annotations to Playwright hooks.
        - Return ONLY the TypeScript code. No explanations.
        
        ### Source Code:
        ${sourceCode}
        `;

        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'qwen2.5-coder:1.5b',
            prompt: prompt,
            stream: false
        });

        const convertedCode = response.data.response;

        // Save to file
        const fileName = `converted_${Date.now()}.spec.ts`;
        const filePath = path.join(CONVERTED_DIR, fileName);
        fs.writeFileSync(filePath, convertedCode);

        res.json({
            status: 'success',
            convertedCode,
            filePath: filePath,
            message: 'Conversion completed and saved to ' + fileName
        });

    } catch (error) {
        console.error('Error during conversion:', error.message);
        res.status(500).json({ status: 'failure', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
