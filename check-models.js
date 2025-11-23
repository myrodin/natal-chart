import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Read .env file manually since we don't have dotenv installed
const envPath = path.resolve(process.cwd(), '.env');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error("Error reading .env file:", e.message);
}

if (!apiKey || apiKey.includes("여기에")) {
    console.error("API Key not found or invalid in .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Fetching available models...");
        // For listing models, we don't need to instantiate a specific model first.
        // The SDK might not expose listModels directly on the instance easily without a model, 
        // but let's try to get a model and catch the error, or use the model manager if available.
        // Actually, the SDK documentation says we can use the model manager or just try to generate content.
        // But wait, the error message said: "Call ListModels to see the list of available models".
        // Let's try to find the correct method. 
        // In the Node SDK, it's usually `genAI.getGenerativeModel` but listing is different.
        // Let's try to use the raw API if needed, but let's check if the SDK has it.
        // Looking at common usage, it might be `genAI.makeRequest` or similar, but simpler is to just try a known stable model like 'gemini-1.0-pro' if 'gemini-pro' failed.
        // However, the user asked to LIST models.

        // Since I can't easily browse SDK docs, I will try a standard fetch to the API endpoint directly using the key.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("\nAvailable Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
