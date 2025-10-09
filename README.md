# Rationa - Enterprise AI Agent Systems

Welcome to Rationa's corporate website repository.

## About Rationa

Rationa builds enterprise-grade AI agent systems that transform how businesses handle customer support, sales, and operations. Our AI agents deliver intelligent, context-aware interactions at 10-100x the speed and 30-70% lower cost than traditional solutions.

## Our Products

### 1. AI Messaging & Customer Support Agent (Available Now)
Enterprise-grade conversational AI for customer support, ticketing, and service automation.

**Key Features:**
- Multi-channel support (Chat, SMS, Voice)
- Native mobile SDKs (iOS & Android)
- Multi-modal processing (Image, Voice, Document)
- Advanced analytics and monitoring
- 99.9% uptime with self-healing capabilities

**Pricing:** Starting at $2,000/month

### 2. AI Sales Agent (Coming Q2 2025)
Intelligent sales automation for lead qualification, quote generation, and pipeline management.

**Key Features:**
- Lead qualification and scoring
- Automated quote generation
- CRM integration (Salesforce, HubSpot)
- Sales pipeline automation
- Revenue attribution

**Pricing:** Starting at $3,000/month

### 3. AI CFO & Operations Agent (Coming Q4 2025)
Intelligent financial and operational automation for forecasting, budgeting, and strategic decision-making.

**Key Features:**
- Financial forecasting and modeling
- Automated reporting and dashboards
- Budget optimization
- Operational efficiency analysis
- Strategic recommendations

**Pricing:** Starting at $2,500/month

## Technology Stack

- **AI/ML**: Qwen3-4B-Instruct, Google Cloud Vertex AI, LoRA Fine-tuning
- **Infrastructure**: Redis, Qdrant Vector DB, OpenTelemetry, Circuit Breakers
- **APIs**: REST, GraphQL, Native Mobile SDKs
- **Integrations**: Twilio, Slack, Teams, Zapier, Webhooks

## Performance

- **Response Time**: 5-20ms (cached), 100-500ms (uncached)
- **Scalability**: 10,000+ concurrent users, 1,000+ requests/second
- **Uptime**: 99.9% SLA guarantee
- **Cost Reduction**: 30-70% vs traditional solutions

## Website Development

This website is built with:
- Pure HTML5, CSS3, and JavaScript
- Responsive design for all devices
- Modern gradient aesthetics
- Smooth animations and transitions
- No framework dependencies

## Deployment

### GitHub Pages (Recommended)
```bash
# Already configured - just push to main branch
git add .
git commit -m "Initial website deployment"
git push origin main

# Enable GitHub Pages in repository settings:
# Settings → Pages → Source: main branch → Save
```

### Custom Domain
```bash
# Add CNAME file
echo "www.rationa.ai" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main

# Configure DNS:
# Add CNAME record: www → abelcuskelly.github.io
# Add A records for apex domain
```

### Local Development
```bash
# Serve locally
python3 -m http.server 8000

# Or with Node.js
npx serve

# Open browser
open http://localhost:8000
```

## Contact

- **Website**: www.rationa.ai
- **Sales**: sales@rationa.ai
- **Support**: support@rationa.ai
- **Investors**: investors@rationa.ai

## License

© 2024 Rationa. All rights reserved.
