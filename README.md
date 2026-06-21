# KrishiLink 🌾

> Decentralised Agri-Coordination Platform — Solve for India Hackathon | Theme 03: Agriculture & Rural Systems | PS 02

KrishiLink is an open-protocol backend that enables farmers, transporters, and buyers to coordinate without any central authority. Built with Node.js, Express, and MongoDB.

---
## 🎨 Wireframes & Page Structure

The platform's high-fidelity component architectures, neomorphic design frames, and absolute user flows are thoroughly mapped here:
* **Figma Design Canvas:** [KrishiLink Wireframes & Layout Blueprint](https://www.figma.com/design/5AXbqmDyvf0lCHNwLKIQuv/KrishiLink?node-id=0-1&t=QCF4kRzxzejLi4EQ-1)
---

## Tech Stack

### Frontend Mobile Container
* **Markup & Layout:** Semantic HTML5 Structure
* **Style Framework:** Component-Isolated CSS3 Absolute Positioning Resets
* **Dynamic Data Engine:** Native URL Query String Interp State-Injectors (JavaScript)

### Backend Open-Protocol
* **Runtime Environment:** Node.js
* **Web Framework:** Express.js v4
* **Database Management:** MongoDB Atlas + Mongoose ODM
* **Security & Hashing:** JWT Tokens + bcrypt Payload Scrambling
* **Live Reload Tooling:** Nodemon

---

## Project Structure

```
├── FRONTEND/
│   ├── global.css                 # Master typography, palette, resets
│   ├── home.html                  # Global system launchboard
│   ├── yay.js                     # Shared drawer menu navigation controller
│   ├── App-Onboard/               # Language and onboarding screens
│   ├── Borrow/
│   │   ├── borrow.html            # Equipment marketplace browse catalog
│   │   ├── borrow-chat.html       # Isolated client borrower dynamic messaging box
│   │   └── chat-renderer.js       # Contextual browser URL state parser
│   ├── Lend/
│   │   ├── lend.html              # Owner machinery listing dashboards
│   │   ├── lend-form.html         # Add new tool registration workflow panel
│   │   ├── lend-req.html          # Dynamic borrower connection inquiry boards
│   │   └── lend-chat.html         # Owner acceptance review control panel
│   └── Pool/
│       ├── pool.html              # Truck Pool operational split-hub routing options
│       ├── pool-form.html         # Logistics cargo load request setup page
│       ├── pool-myreq.html        # Active freight listings board
│       ├── pool-req.html          # Co-pooling companion incoming request boards
│       ├── pool-mychat.html       # Logistics companion connection control panels
│       ├── pool-feed.html         # Public open transport search grid view
│       ├── pool-otherchat.html    # Isolated delivery workspace conversation frame
│       └── pool-chat-renderer.js  # Dynamic contextual query parser engine
|
├── krishilink-backend/
├── index.js                  # Server entry point
├── .env                      # Environment variables (never commit)
├── package.json
└── src/
    ├── config/
    │   └── db.js             # MongoDB connection
    ├── models/
    │   ├── User.js           # Farmers, transporters, buyers
    │   ├── Lending.js        # Equipment listings
    │   ├── Borrowing.js      # Borrow requests
    │   ├── transport_pool.js # Transport requests + pool
    │   ├── connections.js    # User connections after accept
    │   └── AadhaarVerification.js  # Mock DigiLocker records
    ├── routes/
    │   ├── auth.js           # /auth
    │   ├── lending.js        # /lending
    │   ├── borrowing.js      # /borrowing
    │   ├── transport.js      # /transport
    │   └── users.js          # /users
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── lending.controller.js
    │   ├── transport.controller.js
    │   └── escrow.controller.js
    ├── services/
    │   ├── auth.service.js       # Mock DigiLocker + JWT
    │   ├── lending.service.js    # Lending + borrowing logic
    │   └── transport.service.js  # Transport + phone reveal logic
    └── middleware/
        ├── auth.middleware.js    # JWT verification
        └── error.middleware.js   # Global error handler
```

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/krishilink-backend.git
cd krishilink-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server
```bash
npm run dev
```

You should see:
```
MongoDB Connected
Server started on port 3000
```

---

## API Endpoints

**Base URL:** `http://localhost:3000`

> All endpoints except `/auth/register` and `/auth/login` require:
> `Authorization: Bearer <token>` in the request header

---

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user with mock Aadhaar | ❌ |
| POST | `/auth/login` | Login with phone + Aadhaar | ❌ |

**Register Body:**
```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543210",
  "role": "farmer",
  "aadhaarNumber": "123456789012",
  "coordinates": [88.3639, 22.5726]
}
```
Roles: `farmer` / `transporter` / `lender` / `borrower`

---

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/me` | Get logged in user profile | ✅ |

---

### Lending

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/lending/create` | Post a new equipment listing | ✅ |
| GET | `/lending/all` | Get all available listings (FYP) | ✅ |
| GET | `/lending/:id` | Get one listing by id | ✅ |
| POST | `/lending/:id/request` | Send a borrow request | ✅ |
| POST | `/lending/:id/accept/:borrowerId` | Owner accepts a request | ✅ |
| POST | `/lending/:id/reject/:borrowerId` | Owner rejects a request | ✅ |

**Create Lending Body:**
```json
{
  "itemName": "Tractor",
  "category": "machinery",
  "description": "Available for 2 days",
  "availableFromDate": "2026-06-25",
  "availableFromTime": "08:00",
  "coordinates": [88.3639, 22.5726]
}
```

---

### Borrowing

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/borrowing/my` | Get all my borrow requests | ✅ |

---

### Transport

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/transport/create` | Post a transport request | ✅ |
| GET | `/transport/all` | See all open transport requests | ✅ |
| GET | `/transport/:id` | Get one transport request | ✅ |
| POST | `/transport/:id/request` | Send a join request | ✅ |
| POST | `/transport/:id/accept/:senderId` | Accept — reveals both phone numbers | ✅ |
| POST | `/transport/:id/reject/:senderId` | Reject a join request | ✅ |

**Create Transport Body:**
```json
{
  "cropType": "Rice",
  "readyDate": "2026-06-25",
  "packageType": "Bags",
  "totalWeight": 500,
  "pickupCoordinates": [88.3639, 22.5726],
  "dropCoordinates": [88.4639, 22.6726]
}
```

> When a transport join request is **accepted**, the response contains both users' phone numbers so they can contact each other directly.

---

## Key Features

- **Mock DigiLocker Auth** — Simulates Aadhaar verification without real UIDAI API. Aadhaar number is hashed with bcrypt before storage, never stored in plain text.
- **Decentralised by design** — No admin or central authority. Owners and requesters coordinate directly.
- **Phone reveal on connect** — Phone numbers are only shared after mutual acceptance, protecting privacy.
- **Location-aware** — All listings store GPS coordinates for proximity matching.
- **JWT protected** — Every sensitive route requires a valid token.

---

## Team

**Team Alu Posto** — Solve for India Hackathon 2026
