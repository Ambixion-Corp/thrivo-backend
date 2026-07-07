# Thrivo Backend ⚙️

[![Database](https://img.shields.io/badge/Database-PostgreSQL%20(Supabase)-blue.svg?logo=postgresql&logoColor=white)](https://supabase.com)
[![Runtime](https://img.shields.io/badge/Runtime-Node.js%20v20.x-green.svg?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Security](https://img.shields.io/badge/Security-AES--256%20%7C%20Supabase%20RLS-success.svg)](#)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

Welcome to the backend repository for **Thrivo** — a secure, high-trust, multi-sided discovery ecosystem. 

This repository houses the database schemas, API server logic, secure webhook handlers, real-time connection gateways, and automated trust layer architectures.

---

## 🛠️ Technology Stack & Infrastructure

- **Database:** Supabase (PostgreSQL)
- **Real-Time Layer:** Socket.io (Node.js) & Supabase Realtime
- **Authentication:** Supabase Auth (Google & Email provider) with custom DPDP consent workflows
- **Storage:** Supabase Storage (AES-256 encrypted at rest for sensitive data like NDAs and pitch decks)
- **Payment Processing:** Razorpay API & Webhook handler
- **Push Notifications:** Firebase Admin SDK (Node.js)
- **Deployment/Hosting:** Docker containers / Supabase Edge Functions

---

## 🛡️ Security & Compliance (DPDP-Ready)

Thrivo is designed from the ground up to protect intellectual property and user privacy:
1. **Supabase Row Level Security (RLS):** Policies are mathematically set up so that only verified, founder-approved accounts (such as accredited investors who signed a specific NDA) can read sensitive financial metrics.
2. **IP & NDA Protections:** Secure digital signing engine verifying contracts and logging audit trails on-chain or through encrypted logs.
3. **Data Protection:** Implements TLS 1.3 for transit, AES-256 for private PDFs/metrics, and complies with India's **DPDP Act (Digital Personal Data Protection Act, 2023)** (explicit consent log, data minimization, 72-hour breach response plan).

---

## 📂 Repository Structure

```
thrivo-backend/
├── supabase/                 # Supabase configuration directory
│   ├── migrations/           # Database migration files (DQL/DDL)
│   ├── config.toml           # Supabase environment configuration
│   └── functions/            # Supabase Edge Functions (Deno runtime)
│       ├── razorpay-webhook/ # Handles Razorpay payment confirmations
│       └── document-signer/  # Handles secure NDA digital signatures
├── src/                      # Express/Node.js API & Socket.io server
│   ├── index.js              # Entry point
│   ├── config/               # Database, firebase, and global configs
│   ├── controllers/          # Business logic controllers
│   ├── middleware/           # Auth validation, DPDP consent checks, rate-limiting
│   ├── models/               # Database schema models (Postgres adapters)
│   └── sockets/              # Socket.io handlers for real-time messaging
├── tests/                    # Integration and unit tests
├── Dockerfile                # Deployment container configuration
└── package.json              # Node.js dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- Docker (for local Supabase dev environment)
- Supabase CLI
- PostgreSQL client tool (optional)

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Ambixion-Corp/thrivo-backend.git
   cd thrivo-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize local Supabase stack:
   ```bash
   supabase init
   supabase start
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   RAZORPAY_KEY_ID=your-razorpay-key
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json
   ```

5. Start the Node.js Socket.io / API server:
   ```bash
   npm run dev
   ```

---

## 🧪 Testing

We target `>70%` code coverage before merging changes into `main`.
```bash
# Run unit and integration tests
npm test
```