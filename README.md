# 📰 Trendly Times

**Trendly Times** is a modern, responsive news aggregator web app built with **React**, **TypeScript**, **Vite**, and **React-Bootstrap** on the frontend, paired with a Node.js backend proxy server. It fetches the latest news articles from the [NewsAPI.org](https://newsapi.org/) through a backend proxy to keep the API key secure.

---

## 🚀 Live Demo

Frontend deployed on GitHub Pages:  
[https://guru1316.github.io/Trendly-Times-Frontend/](https://guru1316.github.io/Trendly-Times-Frontend/)

Backend proxy deployed on Render:  
[https://trendly-times-backend.onrender.com](https://trendly-times-backend.onrender.com)

---

## 🧩 Features

- Fetches real-time news articles from NewsAPI via a secure backend proxy.
- Multiple news categories: General, Business, Entertainment, Health, Science, Sports, Technology.
- Search functionality to query news by keywords.
- Infinite scroll to load more news articles as you scroll down.
- Sorting news by date (publishedAt).
- Language selection support (default: English).
- Responsive design with Bootstrap for seamless experience across devices.
- Dark mode toggle for comfortable night-time reading.
- Scroll to top button for easy navigation.
- Graceful handling of images with default fallback.
- Pagination support handled internally via backend proxy.
- Backend proxy protects the NewsAPI key from exposure in frontend code.

---

## 🛠️ Tech Stack

| Frontend               | Backend           |
| ---------------------- | ----------------- |
| React + TypeScript     | Node.js + Express |
| Vite (Build Tool)      | Node Fetch        |
| React-Bootstrap        | CORS Middleware   |
| Axios (API requests)   |                   |
| GitHub Pages (Hosting) | Render (Hosting)  |

---
