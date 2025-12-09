# 🌍 PROLO.sa (برولو) — Professional Logistics Platform

A modern logistics and delivery web platform for **Saudi Arabia**, built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
The platform offers multi-language support (🇬🇧 English + 🇸🇦 Arabic Najdi dialect with MSA where appropriate), designed for **businesses and individuals** to manage shipments, track orders, explore logistics services, and access industry solutions efficiently.

---

## 🏗️ Project Overview

**PROLO.sa** is a fully responsive, bilingual logistics website representing a next-gen shipping and fulfillment company based in Riyadh, Saudi Arabia.

It highlights:

- **Services** — Individual and commercial logistics solutions
- **Industries** — E-commerce, food, factories, hospitality
- **Blogs** — Industry insights and knowledge
- **FAQs** — Customer support and guidance
- **Testimonials & Contact** — Customer feedback and inquiries

Built with **performance, SEO, accessibility**, and **modularity** in mind.

### 🔹 Arabic (Najdi + MSA)

**برولو** هو موقع حديث للخدمات اللوجستية والتوصيل داخل المملكة العربية السعودية، مبني بتقنيات **Next.js** و **TypeScript** و **Tailwind CSS**.
يقدّم تجربة سلسة وسريعة للمستخدم، ويدعم اللغتين (الإنجليزية والعربية بلهجة نجدية مع العربية الفصحى عند الحاجة).
الموقع مصمم بعناية ليعرض:

- خدمات الشركة للأفراد والقطاع التجاري
- القطاعات التي تخدمها برولو مثل التجارة الإلكترونية، الأغذية، المصانع، والضيافة
- مدونات ومقالات لتثقيف العملاء
- أسئلة شائعة لتسهيل التعامل مع الخدمات
- آراء العملاء ومعلومات التواصل

---

## 🚀 Tech Stack / التقنيات المستخدمة

- **Next.js 14+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **next-intl** — Multilingual support
- **Lucide Icons & HugeIcons** — UI icons
- **Framer Motion** — Smooth animations
- **Vercel** — Deployment

---

## 📂 Folder Structure / هيكل المجلدات

```
prolo/
├── app/
│   ├── [locale]/          # Multilingual routes
│   ├── _components/        # Shared UI components
│   ├── layout.tsx
│   └── page.tsx
├── public/                # Static assets (images, logos, icons)
├── i18n/                  # Translation JSON files (en.json, ar.json)
├── types/                 # TypeScript interfaces & types
├── package.json
└── README.md
```

---

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/prolo.sa.git

# Navigate to project
cd prolo.sa

# Install dependencies
npm install

# Run local dev server
npm run dev
```

Your project will run on:
👉 [pre-deploy](https://prolo-olive.vercel.app)
👉 [staging](https://prolo.netlify.app)

---

## 🌍 Localization / الترجمة

The platform is fully **bilingual**, structured for **regional accuracy**:

- `/en` → English content
- `/ar` → Arabic (Najdi + MSA mix)

All key sections are localized:

- Hero
- Services (individual & commercial)
- Industries
- Blogs
- FAQ
- Footer

Each translation is stored in JSON files (`en.json`, `ar.json`) for easy updates and scalability.

---

## 🧩 Features / المميزات

✅ Fully responsive design for mobile, tablet, and desktop
✅ Bilingual content with Najdi Arabic + MSA for clarity
✅ SEO optimized with structured data & meta tags
✅ Modular and reusable component architecture
✅ Dynamic content rendering via Next.js App Router
✅ High performance & Lighthouse optimized
✅ Blogs, FAQs, testimonials, and industry-specific content
✅ Contact forms, tracking, and call-to-action sections
✅ Smooth animations and transitions using Framer Motion
✅ JSON-based i18n support for all sections

---

## 📦 Content Integration

The project integrates the following **structured content JSONs**:

1. **Services JSON** (`en.json`, `ar.json`)
   - Individual services (Bullet Delivery, Refrigerated Shipping, Temporary Storage)
   - Commercial sector services (B2B Shipping, Fulfillment, Operational Leasing, etc.)

2. **Industries JSON**
   - E-commerce, Food, Factories & Suppliers, Hospitality

3. **Blogs JSON**
   - Example: "How Express Delivery Impacts E-Commerce Growth"

4. **FAQs JSON**
   - Customer support questions and answers, bilingual

All JSON files are stored in `/i18n/` and structured for **Next.js dynamic rendering**.

---

## 💡 Development Notes / ملاحظات التطوير

- Follow clean code and accessibility best practices
- Tailwind CSS customized with themes and arbitrary variants
- Each page section separated for reusability
- Arabic follows **Najdi dialect** for UX friendliness, with MSA for clarity in formal content
- JSON-based content allows future expansion of services, industries, blogs, or FAQs without code changes

---

## 🚀 Deployment / النشر

- **Vercel**: Continuous deployment with automatic builds from `main` branch
- Arabic deployment ensures **fast performance** and **regional optimization**

---

## 🏁 License / الترخيص

This project is licensed under the **MIT License**.
Use freely for learning or development purposes. Please credit the original author when sharing publicly. 🙌

---

## ✳️ Summary (ملخّص)

PROLO.sa (برولو) combines **speed, precision, and user experience** to represent **Saudi Arabia’s modern logistics innovation**, built with **passion, performance, and purpose**.
The platform leverages multilingual support, structured content, and modern web technologies to offer **efficient, scalable, and user-friendly logistics solutions**.
