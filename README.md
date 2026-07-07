# Thrivo Backend

[![Backend Stack](https://img.shields.io/badge/Stack-NestJS%20%7C%20Fastify-red.svg?logo=nestjs&logoColor=white)](#)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Redis-blue.svg?logo=postgresql&logoColor=white)](#)
[![Storage](https://img.shields.io/badge/Storage-Cloudflare%20R2%20%7C%20S3-orange.svg)](#)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

Welcome to the backend repository for the Thrivo ecosystem — a unified, decoupled multi-tenant backend architecture designed to serve custom operational endpoints optimized for both the web application and mobile clients.

---

## Technology Stack & Infrastructure

- **Application Backend API:** Node.js, NestJS Framework, Fastify Core Transport Engine (TypeScript-native enterprise-grade modular routing layout for high performance and low memory allocation).
- **Database & Cache Engine:** Distributed PostgreSQL, Supabase Auth Core, Redis Stack Cluster (coordinating real-time signaling layers and immediate volatile cache).
- **File & Media Routing:** AWS S3 Storage Clusters, Cloudflare R2 (zero-egress fees), and Cloudflare Stream CDN (device-optimized video transcoding pipeline).

---

## Production Database Architecture

The database architecture implements a polymorphic identity pattern coupled with concrete extensions to support maximum system structural speed while guaranteeing strong isolated state consistency.

### Systemic Structural Validation Rule
The fundamental constraint asserts that transaction flow matches exactly across the node ecosystem:

$$\text{T\_balance} = \sum \text{Escrow\_credits} - \sum \text{Disbursed\_debits}$$

Every user object maintains global role tracking flags to permit cross-tenant identity traversal without record cloning.

### Concrete Schemas

1. **Core User Model Ledger (`users`)**
   - `id`: uuid (PRIMARY KEY, DEFAULT gen_random_uuid())
   - `email`: varchar(255) (UNIQUE, INDEXED)
   - `password_hash`: varchar(512) (Argon2id secure structure)
   - `role_flags`: bits(4) (Position maps: [Founder, Creator, Investor, Consumer])
   - `is_verified`: boolean (DEFAULT false)
   - `created_at`: timestamp with time zone (DEFAULT now())

2. **Founder Extensions (`founder_profiles`)**
   - `id`: uuid (PRIMARY KEY, REFERENCES users(id) ON DELETE CASCADE)
   - `company_name`: varchar(255)
   - `legal_entity_identifier`: varchar(100)
   - `pitch_deck_url`: varchar(2048) (Authenticated S3 reference only)
   - `funding_goal`: numeric(15, 2)

3. **Escrow Transaction Ledger (`escrow_deals`)**
   - `id`: uuid (PRIMARY KEY)
   - `creator_id`: uuid (REFERENCES users(id))
   - `founder_id`: uuid (REFERENCES users(id))
   - `contracted_amount`: numeric(12, 2)
   - `escrow_status`: enum('funds_deposited', 'milestone_1_released', 'completed', 'disputed')

---

## Low-Latency System Security Strategy

### Biometric Access & Token Control Loop
Client communication cycles rely on dual JWT configurations (short-lived access parameters with a lifespan of 15 minutes alongside a sliding renewal token expiring in 7 days). On mobile layers, renewal keys are sealed natively within hardware-encrypted secure storage blocks triggered by biometric authentication signatures (iOS FaceID / Android BiometricPrompt APIs).

### Creator Likeness Digital Signature Verification
To prevent generative identity exploitation or unauthorized duplication of promotional media assets, every piece of video material uploaded by verified creators undergoes server-side frame analysis and receives a metadata-injected cryptographic watermarking footprint using SHA-256 block chains before propagation across CDN edge caches.

---

## Repository Structure

```
thrivo-backend/
├── src/                      # NestJS TypeScript codebase
│   ├── app.module.ts         # Main Application Module
│   ├── main.ts               # Application entry point using Fastify adapter
│   ├── auth/                 # Supabase Auth Core service & Biometric Token verification
│   ├── users/                # Users management modules
│   ├── profiles/             # Polymorphic profile extensions (Founders, Creators)
│   ├── escrow/               # Escrow deals tracking & ledger verification engine
│   ├── media/                # AWS S3 / Cloudflare R2 / Cloudflare Stream controller
│   └── websocket/            # Redis Stack-coordinated Socket.io signaling layers
├── prisma/                   # Prisma Schema for PostgreSQL relations
│   └── schema.prisma
├── Dockerfile                # Deployment container configuration
└── package.json              # NestJS dependencies & build scripts
```

---

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- Docker (for local database & Redis Stack services)

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

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
   REDIS_URL=redis://localhost:6379
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_JWT_SECRET=your-jwt-secret
   R2_BUCKET_NAME=thrivo-pitches
   R2_ACCESS_KEY_ID=your-access-key
   R2_SECRET_ACCESS_KEY=your-secret-key
   ```

4. Start the NestJS API server in development mode:
   ```bash
   npm run start:dev
   ```

---

## Testing

We target high code coverage before merging changes into the main branch.
```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e
```