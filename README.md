**ValidPrompt: AI-Powered Prompt Builder ✨**

ValidPrompt is an innovative AI-powered prompt builder, designed to streamline your creative workflow. Simply input a concise idea, and this application leverages state-of-the-art AI to generate detailed, optimized prompts for large language models. It features a sleek user interface built with Next.js, a robust API for prompt generation and usage tracking, and integrates seamlessly with the OpenAI platform. 🚀

## Overview

ValidPrompt offers a dynamic platform for generating high-quality AI prompts from minimal input. It combines a modern Next.js frontend with an API layer that manages user requests, integrates with an external AI service, and tracks usage to ensure fair access.

## Features

*   **AI-Optimized Prompt Generation**: Craft detailed, high-quality prompts tailored for AI models like GPT-5-nano with just a few words of input.
*   **Intuitive User Interface**: A modern, responsive, and animated user experience built with Next.js and Framer Motion.
*   **Efficient & Fast**: Generate prompts rapidly, designed for quick iteration and seamless creative flow.
*   **Usage Tracking & Rate Limiting**: The backend API includes a robust system to track daily usage per IP address and enforce a rate limit, ensuring responsible resource allocation.
*   **Scalable Architecture**: Built on Next.js API routes with Prisma ORM for database interactions, offering a foundation for future scalability.
*   **Cross-Origin Resource Sharing (CORS)**: Properly configured CORS for flexible integration.

## Getting Started

Follow these steps to set up and run the ValidPrompt project locally.

### Installation

*   **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/validprompt.git
    cd validprompt
    ```
*   **Install Dependencies**:
    ```bash
    npm install
    ```
*   **Set up Prisma**:
    Initialize and generate the Prisma client based on the `schema.prisma` file, then apply the database schema.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

*   `DATABASE_URL`: The URL for your database. For local development with SQLite, this will be:
    ```
    DATABASE_URL="file:./dev.db"
    ```
*   `OPENAI_API_KEY`: Your API key for accessing the OpenAI service.
    ```
    OPENAI_API_KEY="your_openai_api_key_here"
    ```

### Running the Application

Once installed and configured, you can start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Usage

1.  Navigate to `http://localhost:3000` in your web browser.
2.  In the "Start Crafting Your Perfect Prompt" section, enter your initial idea, topic, or goal into the input field. Keep it concise (up to 250 characters).
3.  Click the "Generate Prompt" button.
4.  The AI-powered backend will process your input and display a detailed, optimized prompt in the "Your Generated Prompt" section.
5.  Use the "Copy" button to easily copy the generated prompt to your clipboard.

## Technologies Used

| Technology         | Description                                        | Link                                                                        |
| :----------------- | :------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Next.js**        | React framework for production (frontend & API)    | [Next.js](https://nextjs.org/)                                              |
| **React**          | Frontend JavaScript library for building UIs       | [React](https://react.dev/)                                                 |
| **TypeScript**     | Superset of JavaScript for type safety             | [TypeScript](https://www.typescriptlang.org/)                               |
| **Tailwind CSS**   | Utility-first CSS framework for rapid styling      | [Tailwind CSS](https://tailwindcss.com/)                                    |
| **Framer Motion**  | Production-ready motion library for React          | [Framer Motion](https://www.framer.com/motion/)                             |
| **Prisma**         | Next-generation ORM for Node.js and TypeScript     | [Prisma](https://www.prisma.io/)                                            |
| **SQLite**         | Lightweight, file-based relational database        | [SQLite](https://www.sqlite.org/index.html)                                 |
| **Axios**          | Promise-based HTTP client for the browser and Node | [Axios](https://axios-http.com/)                                            |
| **OpenAI API**     | AI service for advanced language models            | [OpenAI](https://openai.com/docs/api-reference)                             |
