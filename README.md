# AI Video Ad Generator Bot - Telegram SaaS

> Production-ready Telegram bot for AI-powered video generation with subscription management, referral system, and comprehensive analytics.

## 🚀 Features

### 🎥 AI Video Generation
- **Video Ads** - Generate professional video advertisements
- **Product Videos** - Create product showcase videos
- **Voiceovers** - AI text-to-speech generation
- **Script Writing** - AI-powered script generation
- **Thumbnails** - Auto-generated video thumbnails
- **Captions** - Automatic caption generation
- **Hooks** - Attention-grabbing video hooks
- **Short-form Reels** - Viral social media content

### 💳 Monetization
- **Stripe Integration** - Credit card payments
- **Crypto Payments** - ETH/USDC support
- **Subscription Plans** - Free, Pro ($9.99/mo), Lifetime ($99.99)
- **Credit System** - Pay-per-use model
- **Free Trial** - 50 credits for new users
- **Daily Rewards** - 10 free credits daily

### 👥 User Growth
- **Referral Program** - Share & earn 50 credits
- **Invite Rewards** - Bonuses for referrer & referee
- **Viral Watermarks** - Branded free tier output
- **User Analytics** - Engagement tracking
- **Admin Dashboard** - Revenue & user management

### 🔧 Technical
- **Node.js + TypeScript** - Type-safe backend
- **Telegraf** - Telegram bot framework
- **Supabase** - PostgreSQL database
- **Redis + Bull** - Async job queue
- **Stripe API** - Payment processing
- **OpenAI, Claude, ElevenLabs, Replicate** - AI integrations
- **Cloudflare R2** - Video storage
- **Pino** - Production logging

## 📋 Architecture

```
adgenius-bot/
├── src/
│   ├── config/              # Configuration & logging
│   ├── database/            # Supabase setup & migrations
│   ├── services/            # Business logic (payments, queue, AI)
│   ├── handlers/            # Bot command handlers
│   ├── middleware/          # Auth, rate limiting, validation
│   ├── types/               # TypeScript types
│   ├── utils/               # Helper functions
│   ├── api/                 # REST API routes
│   ├── bot/                 # Bot initialization
│   └── index.ts             # Entry point
├── docker/                  # Docker configuration
├── scripts/                 # Deployment & setup scripts
├── .env.example             # Environment template
├── Dockerfile               # Container build
├── docker-compose.yml       # Local development
└── package.json             # Dependencies
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Bot Framework** | Telegraf 4.15 |
| **Language** | TypeScript 5.3 |
| **Runtime** | Node.js 18+ |
| **Database** | Supabase (PostgreSQL) |
| **Queue** | Bull + Redis |
| **Payments** | Stripe + Web3 |
| **Storage** | Cloudflare R2 |
| **Logging** | Pino |
| **API** | Express.js |
| **Deployment** | Docker + Railway/Render |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (via Supabase)
- Redis instance
- Stripe API keys
- Telegram Bot Token
- OpenAI API key

### Installation

```bash
# Clone repository
git clone https://github.com/AI-Analysis-tab/adgenius-bot.git
cd adgenius-bot

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### Docker Setup

```bash
# Build image
docker build -t adgenius-bot .

# Run with docker-compose
docker-compose up -d
```

## 📚 Documentation

### Environment Variables
See `.env.example` for complete list:
- `BOT_TOKEN` - Telegram Bot API token
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase anonymous key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `OPENAI_API_KEY` - OpenAI API key
- `REDIS_URL` - Redis connection URL
- And more...

### Database Schema

#### Users Table
```sql
- id: UUID (primary key)
- telegram_id: BIGINT (unique)
- username: TEXT
- credits: INTEGER (default: 50)
- plan: ENUM (free, pro, lifetime)
- referral_code: TEXT (unique)
- referred_by: UUID (foreign key)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### Projects Table
```sql
- id: UUID
- user_id: UUID (foreign key)
- type: ENUM (video_ad, product, voiceover, script, thumbnail, captions, hook, reel)
- status: ENUM (pending, processing, completed, failed)
- prompt: TEXT
- config: JSONB
- output_url: TEXT
- created_at: TIMESTAMP
```

#### Payments Table
```sql
- id: UUID
- user_id: UUID (foreign key)
- amount: DECIMAL
- currency: TEXT
- payment_method: ENUM (stripe, crypto)
- stripe_id: TEXT
- tx_hash: TEXT (for crypto)
- status: ENUM (pending, completed, failed)
- created_at: TIMESTAMP
```

## 🎮 Bot Commands

| Command | Description |
|---------|------------|
| `/start` | Start bot & login |
| `/menu` | Main dashboard |
| `/create` | Create new video |
| `/subscribe` | View pricing plans |
| `/stats` | User analytics |
| `/refer` | Referral program |
| `/help` | Help & support |
| `/admin` | Admin panel (admin only) |

## 💰 Subscription Plans

| Plan | Price | Credits/Month | Features |
|------|-------|---------------|----------|
| **Free** | $0 | 50 initial + 10/day | Basic generation, Watermark |
| **Pro** | $9.99 | 1000/month | Unlimited gen, No watermark |
| **Lifetime** | $99.99 | Unlimited | Lifetime access, Priority support |

## 🔌 API Integrations

### AI Generation
- **OpenAI GPT-4** - Script writing, description generation
- **Claude 3** - Advanced prompt optimization
- **ElevenLabs** - Text-to-speech voiceovers
- **Replicate** - Video generation models
- **Runway ML** - Video editing & effects
- **Kling AI** - Advanced video synthesis

### Payment Processing
- **Stripe** - Credit card payments, subscriptions
- **Crypto** - ETH/USDC via Web3.js, Ethers.js

### Storage
- **Cloudflare R2** - Unlimited video storage

## 📊 Admin Features

Access `/admin` command for:
- User analytics dashboard
- Revenue tracking
- Credit management
- Broadcast messaging
- API usage monitoring
- Payment history
- Referral stats

## 🔐 Security

- **Authentication** - Telegram login verification
- **Rate Limiting** - 60 requests/minute per user
- **Input Validation** - Joi schema validation
- **Error Handling** - Comprehensive error catching
- **Logging** - All actions logged with Pino
- **Environment Isolation** - Secure .env handling

## 📈 Scaling Strategy

### Phase 1: MVP (Current)
- Single Node.js instance
- Supabase managed database
- Redis for queue processing

### Phase 2: Growth (100K+ users)
- Horizontal scaling with load balancer
- Database read replicas
- CDN for video distribution
- Kubernetes orchestration

### Phase 3: Enterprise (1M+ users)
- Microservices architecture
- Advanced caching layers
- Machine learning optimization
- Multi-region deployment

## 🚀 Deployment

### Railway
```bash
railway link
railway up
```

### Render
```bash
git push heroku main
```

### Docker
```bash
docker build -t adgenius-bot .
docker run -d --env-file .env adgenius-bot
```

## 📝 API Documentation

### REST Endpoints

#### Authentication
- `POST /api/auth/telegram` - Verify Telegram login
- `GET /api/auth/verify` - Check auth status

#### Users
- `GET /api/users/me` - Current user profile
- `GET /api/users/:id/stats` - User statistics
- `POST /api/users/credits` - Add credits (admin)

#### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects` - List user projects
- `GET /api/projects/:id` - Project details
- `DELETE /api/projects/:id` - Delete project

#### Payments
- `POST /api/payments/checkout` - Create Stripe session
- `POST /api/payments/webhook` - Stripe webhook
- `GET /api/payments/history` - Payment history

#### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/revenue` - Revenue analytics
- `POST /api/admin/broadcast` - Send message to users

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Discord**: [Community Server]
- **Email**: support@adgenius.io
- **Telegram**: @adgenius_support

## 🙏 Acknowledgments

Built with ❤️ by AI-Analysis-tab team

---

**Made with ❤️ for creators, agencies, and e-commerce brands**
