# 🚀 Full Stack Intern Task — o8m Labs  
## Giakaa Clone with CMS, SEO & Dual Database Architecture

---

## 📌 Project Overview

This project is a production-ready Giakaa-style landing page built as part of a Full Stack Intern assignment.

It includes:

- 🎯 CMS-managed Hero Slider
- 📝 Blog CMS with Draft & Publish workflow
- 🔗 SEO-friendly dynamic URLs (`/blog/:slug`)
- 🧠 Dynamic Meta Tags (React Helmet)
- 🗺 Auto-generated XML Sitemap
- 🛡 Input Validation & Sanitization
- 🌐 Production Deployment (Vercel + Render)
- 🗄 MongoDB implementation
- 🧩 PostgreSQL relational schema design

The application enables admin users to manage hero content and blog posts without modifying frontend code.

---

# 🌍 Live Deployment

### 🔵 Frontend (Vercel)
https://o8m-giakaa-clone-c484.vercel.app/

### 🟢 Backend (Render)
https://o8m-giakaa-clone.onrender.com/api

### 🗺 Sitemap
https://o8m-giakaa-clone.onrender.com/sitemap.xml

---

# 🏗 System Architecture

Client (React - Vite)  
        ↓  
Axios API Layer  
        ↓  
Node.js + Express Backend  
        ↓  
MongoDB (Primary Data Store)

---

# 🗄 Database Strategy

| Data Type | Implementation | Purpose |
|------------|----------------|----------|
| Hero Slider | MongoDB | Flexible content structure |
| Blog Posts | MongoDB | CMS-driven dynamic content |
| Blog (Relational Design) | PostgreSQL (Schema Only) | Demonstrates normalized relational modeling |

---

# 🧠 Key Features

## 1️⃣ Hero CMS
- Add / Edit / Delete slides
- Image or video support
- CTA button support
- Order-based sorting
- Active/Inactive toggle

---

## 2️⃣ Blog CMS
- Create blog posts
- SEO slug generation
- Draft & Publish system
- Auto-generated meta title & description
- Public vs Admin blog filtering

---

## 3️⃣ SEO Optimization
- Dynamic `<title>` & meta tags
- Canonical URLs
- Sitemap.xml generation
- Clean slug-based routing
- React Helmet integration

---

## 4️⃣ Security Implementation
- express-validator for input validation
- sanitize-html to prevent XSS
- Helmet middleware for HTTP headers
- CORS configuration
- Environment-based secrets handling

---

# 🧩 PostgreSQL Relational Schema (Designed)

```sql
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    featured_image TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_slug ON blogs(slug);
CREATE INDEX idx_blog_published ON blogs(is_published);
```

This schema demonstrates normalized relational modeling and indexing strategy for scalable blog systems.

---

# 🛠 Tech Stack

## Frontend
- React (Vite)
- React Router DOM
- Axios
- react-helmet-async

## Backend
- Node.js
- Express.js
- express-validator
- sanitize-html
- Helmet

## Databases
- MongoDB (Cloud)
- PostgreSQL (Schema Design)

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📂 Folder Structure

```
o8m-giakaa-clone/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/api.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 How To Run Locally

## Backend
```bash
cd backend
npm install
npm start
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

---

# 📈 Production Considerations

- Free-tier backend auto-sleep handling
- Environment-based configuration
- SEO ready
- Scalable CMS architecture
- Clean API structure
- Easily extendable to authentication system

---

# 🎯 Assignment Objectives Covered

✅ CMS implementation  
✅ SEO optimization  
✅ Clean routing  
✅ Validation & security  
✅ MongoDB implementation  
✅ PostgreSQL schema design  
✅ Deployment  
✅ Production-ready configuration  

---

# 💡 Future Improvements

- Admin authentication (JWT)
- Role-based access control
- Image upload via Cloudinary
- Redis caching
- CI/CD pipeline
- Docker containerization

---

# 👨‍💻 Author

**Baddam Shashikanth Reddy**  
Full Stack Developer | React | Node.js | MongoDB | PostgreSQL  

---
