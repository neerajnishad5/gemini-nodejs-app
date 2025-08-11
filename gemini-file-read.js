import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing in env variables.");
  process.exit(1);
}

function fileToGenerativeAI(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

// Generate content using Gemini
async function generateExplanation(promptText) {
  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.MODEL });


  try {
    const imageParts = [fileToGenerativeAI("image.jpeg", "image/jpeg")];

    const result = await model.generateContent([prompt, ...imageParts]);

    const response = await result.response;

    const responseText = response.text();
    console.log("📘 Explanation:", responseText);
  } catch (error) {
    console.error("❌ Failed to generate content:", error.message || error);
  }
}

const prompt = "Explain what is this image about?";

// Run the script
generateExplanation(prompt);
