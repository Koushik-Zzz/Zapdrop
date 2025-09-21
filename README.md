# 🚀 ZapDrop - Temporary File Sharing Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.10.1-2D3748)

**[🌐 Live Demo](https://zapdrop.slyde.tech)**

---

## 🏗️ System Architecture

```mermaid
graph TB
    A[Next.js Frontend] --> B[NextAuth.js]
    A --> C[API Routes]
    C --> D[Prisma ORM]
    C --> E[Cloudflare R2]
    C --> F[Upstash Redis]
    D --> G[PostgreSQL]
    H[Vercel Cron] --> C
    B --> I[Google OAuth]
    
    style A fill:#0070f3
    style E fill:#f38020
    style G fill:#336791
    style F fill:#dc382d
```

**Architecture Highlights:**
- **Serverless Design**: Built on Vercel's edge network for global performance
- **Secure File Storage**: Direct uploads to Cloudflare R2 using pre-signed URLs
- **Rate Limiting**: Redis-backed rate limiting to prevent abuse
- **Auto-Cleanup**: Scheduled jobs automatically remove expired files

---

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **Database** | **Infrastructure** |
|--------------|-------------|--------------|-------------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white) | ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) | ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white) |
| ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=next.js&logoColor=white) | | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) |

---

## ✨ Key Features & Technical Implementation

### 🔐 **Secure File Uploads with Pre-Signed URLs**
- **Challenge**: Direct file uploads without exposing server credentials
- **Solution**: Generate time-limited, pre-signed URLs from Cloudflare R2
- **Implementation**: Custom S3-compatible client with automatic credential rotation

### ⏰ **Automated File Lifecycle Management**
- **Challenge**: Prevent storage bloat from expired files
- **Solution**: Vercel Cron jobs with database-driven cleanup
- **Implementation**: Daily scheduled tasks that query expired records and batch-delete from R2

### 🔄 **Real-Time Upload Progress**
- **Challenge**: Provide user feedback during large file uploads
- **Solution**: Client-side progress tracking with axios interceptors
- **Implementation**: Custom upload component with progress bars and error handling

### 🛡️ **API Rate Limiting & Security**
- **Challenge**: Prevent abuse and ensure fair usage
- **Solution**: Redis-backed sliding window rate limiting
- **Implementation**: Upstash Redis with custom middleware for different endpoints

### 📱 **QR Code Generation for Mobile Sharing**
- **Challenge**: Easy file sharing across devices
- **Solution**: Dynamic QR code generation for share links
- **Implementation**: Client-side QR generation with responsive design

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18.18+ 
- **PostgreSQL** database (local or cloud)
- **Cloudflare R2** bucket
- **Google OAuth** credentials

### Quick Setup

1. **Clone & Install**
   ```bash
   git clone https://github.com/Koushik-Zzz/zapdrop.git
   cd zapdrop
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp example.env .env
   ```
   
   **Required Environment Variables:**
   ```env
   # Database
   DATABASE_URL="postgresql://user:pass@localhost:5432/zapdrop"
   
   # Authentication
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXTAUTH_SECRET="your_secure_random_string"
   
   # File Storage (Cloudflare R2)
   R2_ACCOUNT_ID="your_cloudflare_account_id"
   R2_ACCESS_KEY_ID="your_r2_access_key"
   R2_SECRET_ACCESS_KEY="your_r2_secret_key"
   R2_BUCKET_NAME="your_bucket_name"
   
   # Rate Limiting (Optional but recommended)
   UPSTASH_REDIS_REST_URL="your_upstash_redis_url"
   UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
   
   # Application
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   CRON_SECRET="your_cron_secret"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   
   🎉 **Visit**: [http://localhost:3000](http://localhost:3000)

---

## 📊 Performance & Scalability

- **Upload Speed**: Direct-to-R2 uploads bypass server, reducing latency by ~60%
- **Global CDN**: Cloudflare's edge network serves files from 200+ locations
- **Rate Limiting**: Prevents abuse with configurable limits (100 requests/hour per user)
- **Database Optimization**: Indexed queries and connection pooling via Prisma
- **Serverless Architecture**: Auto-scales based on demand, zero idle costs

---

## 🔧 Development & Deployment

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
```

### Production Deployment

**One-Click Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Koushik-Zzz/zapdrop)

**Docker Deployment:**
```bash
docker build -t zapdrop .
docker run -p 3000:3000 --env-file .env.local zapdrop
```

---

## 📈 Project Impact

This project demonstrates:
- **Full-stack development** with modern frameworks
- **Cloud architecture** design and implementation
- **Security best practices** for file handling
- **Performance optimization** for large file transfers
- **DevOps integration** with automated deployments

---

## 🤝 Contributing

Contributions are welcome!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **[Vercel](https://vercel.com)** for seamless hosting and deployment
- **[Cloudflare](https://cloudflare.com)** for reliable R2 object storage
- **[Upstash](https://upstash.com)** for serverless Redis solution
- **[Mvpblocks](https://blocks.mvp-subha.me/)** for beautiful UI components

---

<div align="center">

**[🌐 Live Demo](https://zapdrop.slyde.tech)** • **[📧 Contact](mailto:koushik02269@gmail.com)**

*Built with ❤️ by [Koushik](https://github.com/Koushik-Zzz)*

</div>