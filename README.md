<div align="center">
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=blue" alt="react" />
    <img src="https://img.shields.io/badge/-Tailwind-00BCFF?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Ollama-black?style=for-the-badge&logoColor=white&logo=llama&color=green" alt="ollama" />
  </div>

  <h3 align="center">HormoziGPT - Get Real Business Advice</h3>

   <div align="center">
     A chatbot application that simulates conversations with Alex Hormozi, providing valuable business advice and coaching.
    </div>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🚀 [Project Structure](#project-structure)

## 🤖 Introduction

HormoziGPT is a chatbot application that simulates a conversation with Alex Hormozi, a successful entrepreneur and business coach. The chatbot provides valuable business advice and coaching to users, drawing from Alex's experience in customer acquisition, monetization, and scaling businesses.

The application features a modern Next.js frontend with a clean, responsive UI built using Tailwind CSS and Radix UI components. The backend uses Ollama to generate responses in the style of Alex Hormozi, providing focused, practical, and direct business advice.

## ⚙️ Tech Stack

* **[Next.js](https://nextjs.org/)** - A powerful React framework that enables the development of fast, scalable web applications with features like server-side rendering and API routes.

* **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces, allowing for the creation of reusable UI components.

* **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework that allows developers to design custom user interfaces by applying low-level utility classes directly in HTML.

* **[TypeScript](https://www.typescriptlang.org/)** - A superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection.

* **[Radix UI](https://www.radix-ui.com/)** - A low-level UI component library with a focus on accessibility, customization, and developer experience.

* **[Ollama](https://ollama.ai/)** - An open-source platform for running large language models locally, enabling the generation of text in the style of Alex Hormozi without relying on external APIs.

## 🔋 Features

👉 **Business Advice** - Get focused, practical, and direct business advice in the style of Alex Hormozi.

👉 **Modern UI/UX** - Clean, responsive design built with Tailwind CSS and Radix UI components for a sleek user experience.

👉 **Real-time Chat** - Engage in a conversation with a chatbot that emulates Alex Hormozi's communication style.

👉 **Local Processing** - Uses Ollama to run the language model locally, ensuring privacy and reducing dependency on external APIs.

👉 **Cross-Device Compatibility** - Fully responsive design that works seamlessly across all devices.

👉 **Code Reusability** - Leverages reusable components and a modular codebase for efficient development.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Python](https://www.python.org/) (for the Ollama integration)
- [Ollama](https://ollama.ai/) (for running the language model locally)

**Cloning the Repository**

```bash
git clone https://github.com/yourusername/hormozigpt.git
cd hormozigpt
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

1. Start the Ollama server:

```bash
ollama run llama3
```

2. Start the Next.js development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🚀 Project Structure

The project is organized into the following directories:

- **app/** - Contains the Next.js pages and API routes
- **components/** - Reusable UI components
- **hooks/** - Custom React hooks
- **lib/** - Utility functions and shared code
- **public/** - Static assets like images and fonts
- **styles/** - Global CSS and Tailwind configuration
- **HormoziGPT/** - Python code for the Ollama integration