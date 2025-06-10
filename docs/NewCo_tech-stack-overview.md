# 📘 Technische Architektur & Stack-Planung

## 🔰 Phase 1 – MVP Stack (lean & modern)

### 🎯 Ziel
Schneller und effizienter Aufbau eines funktionierenden MVPs mit minimalem Aufwand, gutem Developer Experience und DSGVO-Konformität.

### 🔧 Tech Stack (MVP)

| Komponente     | Technologie              | Begründung |
|----------------|--------------------------|------------|
| Frontend       | Next.js + TailwindCSS + shadcn/ui | Moderne UI, SSR-fähig, schnell produktiv |
| Authentifizierung | Supabase Auth / Clerk | DSGVO-konform, Magic Link Login |
| Backend        | Next.js API Routes / Supabase Functions | Schnell integrierbar, keine Serververwaltung |
| Datenbank      | PostgreSQL (via Supabase) | Stabil, relational, mit Supabase-UI |
| Payments       | Stripe (SetupIntent)     | Autorisierung der Zahlung ohne Abbuchung |
| E-Mail         | Resend / Mailchimp       | SMTP, Transaktionale E-Mails |
| Hosting        | Vercel                   | CI/CD, einfache Previews |
| Kalender       | Google/Microsoft/Apple   | OAuth 2.0 für Integration mit Kundenkalendern |

---

## 🧱 Phase 2 – Post-Stipendium / VC (Enterprise-ready)

### 🎯 Ziel
Modulare, wartbare, teamfähige Architektur für langfristige Skalierung, neue Features, fundiertes Monitoring & DevOps.

### 🔧 Backend (NestJS, Microservices)

| Komponente     | Technologie               | Begründung |
|----------------|---------------------------|------------|
| Core Backend   | NestJS + PostgreSQL       | Typisierung, Testbarkeit, modulare Struktur |
| APIs           | REST (MVP) → GraphQL      | REST für Einfachheit, GraphQL bei komplexen UIs |
| Job Queue      | BullMQ / RabbitMQ         | Terminüberwachung, Batch-Jobs |
| Caching        | Redis                     | Schnelle Lesezugriffe, Sessions |
| Auth / Tokens  | OAuth2 / JWT / Keycloak   | Enterprise-Level Authentifizierung |
| Echtzeit       | Websockets / SSE          | Live-Updates für Dashboard etc. |
| AI / LLM       | FastAPI + HuggingFace     | NLP, KI-Unterstützung (z. B. automatische Erinnerungen) |
| Notifications  | Twilio (SMS), Mailjet     | Skalierbare Benachrichtigungen |
| Monitoring     | Sentry, Prometheus, Grafana| Logging, Metriken, Error Tracking |

---

### 🔧 Frontend (Admin + B2B Kundenportal)

| Komponente     | Technologie                | Begründung |
|----------------|----------------------------|------------|
| Frontend       | Angular + TailwindCSS      | Struktur, Skalierung, NgRx für State |
| UI Dev         | Storybook                  | Komponentengetrieben, dokumentiert |
| State Mgmt     | NgRx                       | Predictable, testbar |
| Hosting        | GitLab + AWS / Hetzner     | Kontrolle über Infrastruktur, DSGVO-konform |

---

### 🌍 Marketingseite

- `Webflow` oder `WordPress`
  - Für SEO, einfache Contentpflege durch Nicht-Tech-Team
  - Separat von Hauptanwendung gehalten (Landing Page, Blog, etc.)

---

### 🛠️ DevOps & CI/CD

| Bereich       | Tool                        |
|---------------|-----------------------------|
| CI/CD         | GitLab CI / GitHub Actions  |
| Deployment    | Docker + Helm               |
| Cloud         | AWS, Azure, GCP, IONOS      |
| Secrets Mgmt  | Vault / Doppler             |
| Monitoring    | Grafana, Prometheus, Sentry |

---

### 📈 Mögliche Erweiterungen

- Kundenbewertungen, Follow-ups per E-Mail
- Auto-Kalenderblocker mit Kalender-Priorität
- Smart Pricing Engine (AI)
- Multi-Language & White-Label-Versionen
