# KYC Platform Backend

A robust Node.js Express backend API with authentication, MongoDB integration, and OAuth support.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to backend**
```bash
cd Backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kyc-platform
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
FRONTEND_URL=http://localhost:3000
```

4. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "dateOfBirth": "1990-01-01"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

#### Refresh Token
```http
POST /auth/refresh
Cookie: refreshToken={refresh_token}
```

### OAuth Endpoints

#### Google OAuth
```http
GET /auth/oauth/google
```

#### Facebook OAuth
```http
GET /auth/oauth/facebook
```

#### GitHub OAuth
```http
GET /auth/oauth/github
```

#### Get Available Providers
```http
GET /auth/oauth/providers
```

### User Endpoints

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "dateOfBirth": "1990-01-01"
}
```

#### Get Public Profile
```http
GET /users/{userId}
```

## 🔧 Features

### 🔐 Authentication
- **JWT Tokens**: Access & refresh token system
- **Password Security**: bcrypt hashing with 12 rounds
- **Account Lockout**: Protection against brute force attacks
- **Session Management**: Multiple device support

### 🌐 OAuth Integration
- **Google OAuth 2.0**
- **Facebook OAuth**
- **GitHub OAuth**
- **Account Linking**: Link multiple OAuth providers

### 🛡️ Security
- **Rate Limiting**: Prevent abuse
- **CORS Protection**: Configurable origins
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation
- **Error Handling**: Secure error responses

### 📊 Database
- **MongoDB**: Document database
- **Mongoose ODM**: Schema validation
- **Indexes**: Optimized queries
- **Connection Pooling**: Performance optimization

## 🏗️ Project Structure

```
Backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── passport.js          # OAuth strategies
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   └── User.js              # User schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── oauth.js             # OAuth routes
│   └── user.js              # User routes
├── utils/
│   └── jwt.js               # JWT utilities
├── .env.example             # Environment template
├── package.json             # Dependencies
└── server.js                # Main server file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kyc-platform` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_SECRET` | Refresh token secret | Required |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `30d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Optional |
| `FACEBOOK_APP_ID` | Facebook app ID | Optional |
| `FACEBOOK_APP_SECRET` | Facebook app secret | Optional |
| `GITHUB_CLIENT_ID` | GitHub client ID | Optional |
| `GITHUB_CLIENT_SECRET` | GitHub client secret | Optional |

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:5000/api/auth/oauth/google/callback`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create new app
3. Add Facebook Login product
4. Add redirect URI: `http://localhost:5000/api/auth/oauth/facebook/callback`

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings
2. Create new OAuth app
3. Set callback URL: `http://localhost:5000/api/auth/oauth/github/callback`

## 🚦 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": {...},
    "token": "jwt_token"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": [...]
}
```

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'
```

## 🚀 Deployment

### Production Checklist
- [ ] Set secure JWT secrets (32+ characters)
- [ ] Configure production MongoDB URI
- [ ] Set NODE_ENV=production
- [ ] Configure OAuth redirect URIs for production
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📈 Monitoring

### Health Endpoint
- **URL**: `/health`
- **Method**: GET
- **Response**: Server status and environment info

### Logs
- **Development**: Console logging with colors
- **Production**: Structured logging recommended

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details