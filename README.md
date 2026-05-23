# WomenRise

A full-stack women's empowerment platform providing resources, community, opportunities, safety tools, and an e-commerce shop — all in one place.

**Author:** Anjali Verma

## Tech Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Frontend | React 19, Tailwind CSS 4, React Router 7, TanStack Query 5 |
| Backend  | Node.js, Express, Mongoose (MongoDB)                        |
| Payments | Razorpay                                                    |
| Storage  | Cloudinary (images)                                         |
| Email    | Nodemailer (SMTP)                                           |
| Auth     | JWT (access + refresh tokens)                               |

## Features

### Authentication
- Signup, Login, Logout with JWT refresh tokens
- Forgot / Reset password via email OTP

### Community
- Create, like, and comment on posts
- Report inappropriate content

### Opportunities Board
- Browse scholarships, jobs, internships, and skill-development listings
- Save/bookmark opportunities

### Resource Hub
- Categorized resources — legal, health, self-defense, govt schemes, emergency

### Safety Hub
- Safety tips, emergency contact numbers, national organizations

### Shop & E-Commerce
- Product catalog with filters and search
- Cart, checkout, and Razorpay payment
- Order tracking, wishlists, coupons, product reviews

### Blog
- Published articles, stories, and event updates

### Notifications
- Real-time notifications via Server-Sent Events (SSE)

### Newsletter & Contact
- Email newsletter subscription
- Contact form for inquiries

### Admin Panel
- Dashboard with analytics (Recharts)
- Manage: Users, Posts, Resources, Opportunities, Products, Orders, Blog, Coupons
- Manage: Hero Slides, Media Coverage, Partners, Testimonials, Categories, Tags
- View newsletter subscribers and contact messages
- Content moderation and report resolution
- Audit logs

## Project Structure

```
GULLY_CLASSES/
├── client/            # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI & domain components
│   │   ├── context/      # AuthContext, CartContext
│   │   ├── hooks/        # 20+ custom data-fetching hooks
│   │   └── pages/        # All route pages + admin/
│   └── public/
└── server/            # Express backend
    ├── controllers/
    ├── models/           # 22 Mongoose models
    ├── routes/
    ├── middleware/
    ├── utils/            # Email, templates, helpers
    └── seeds/            # Admin & content seeders
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/anjali04853/GULLY_CLASSES.git
cd GULLY_CLASSES
```

### 2. Setup server

```bash
cd server
npm install
cp .env.example .env     # edit .env with your credentials
npm run seed:admin        # create default admin user
npm run dev               # starts on http://localhost:5000
```

### 3. Setup client

```bash
cd client
npm install
npm run dev               # starts on http://localhost:5173
```

### Environment Variables

See `.env.example` for the full list. Key variables:

| Variable             | Purpose                 |
| -------------------- | ----------------------- |
| `MONGO_URI`          | MongoDB connection      |
| `JWT_SECRET`         | Access token signing    |
| `RAZORPAY_KEY_ID`    | Payment gateway         |
| `CLOUDINARY_*`       | Image uploads           |
| `SMTP_*`             | Email service           |
| `CLIENT_URL`         | CORS & email links      |

## License

This project is for educational purposes.
