# Gemini Node.js Playground

This is a simple Node.js application demonstrating different ways to interact with the **Google AI Gemini API**, using your own API key from **Google AI Studio**. The app showcases various Gemini features such as generating text, understanding images, maintaining chat context, & streaming responses for a smooth user experience.

---

## 📦 Project Structure

The project contains **four variants**, each exploring a unique capability of the Gemini API.

### 1. `gemini-start.js` - 🧠 Predefined Prompt
A simple script that sends a **predefined prompt** to Gemini & logs the AI's response.

- Perfect for quick tests & single-shot queries.
- Just run & see the response.

---

### 2. `gemini-file-read.js` - 🖼️ Image-to-Text
Demonstrates Gemini's **multimodal capabilities** by analyzing a preloaded image.

- The image is read & passed to Gemini.
- The model attempts to describe or interpret the image contents.

---

### 3. `gemini-chat.js` - 💬 Chat with Memory
Implements a **conversational chat** system where user input is remembered across turns.

- Maintains **context** using the same thread/session.
- Ideal for longer conversations or multi-step interactions.

---

### 4. `gemini-streaming.js` - ⚡ Streaming Responses
Adds **real-time streaming** to chat, where responses are sent as they're generated.

- Delivers a smoother, interactive **user experience**.
- Output is chunked & streamed, mimicking live typing.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/neerajnishad5/gemini-nodejs-app.git
cd gemini-nodejs-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your Gemini API Key

Create a `.local.env` file in the root directory:

```bash
touch .env
```

Add your API key from [Google AI Studio](https://aistudio.google.com/app/apikey) like so:

```env
GEMINI_API_KEY=your-api-key-here
MODEL=your-gemini-model
```

### 4. Run the Scripts

Each file is standalone & can be executed directly using Node.js:

```bash
node gemini-start.js          # Predefined prompt
node gemini-file-read.js      # Image analysis
node gemini-chat.js           # Chat with memory
node gemini-streaming.js      # Chat with streaming
```

---

## 🛠️ Requirements

* Node.js (v18+ recommended)
* Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)
* Internet connection

---

## 📂 Example Images

If you're using `gemini-file-read.js`, make sure the image exists & is correctly referenced in your script. You can replace it with your own test image for experimentation.

---

## 📌 Notes

* All scripts use the Gemini 1.5 model family.
* Streaming mode uses async iteration to handle response chunks.
* The chat mode retains context by reusing the chat history.
* This project is meant for educational & exploratory use. Be mindful of your API usage limits.

---

## 🤖 Powered By

* [Google AI Studio](https://aistudio.google.com/)
* Gemini API via `@google/generative-ai`
* Node.js ❤️

---

## ✨ Contributions

PRs & ideas are welcome! Feel free to fork & improve.

---

```

Let me know if you'd like me to auto-generate a `package.json` file or add code comments to the individual `.js` files.
```
