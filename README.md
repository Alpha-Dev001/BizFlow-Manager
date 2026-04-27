# HR & Business Management Platform

A modern, full-stack HR and business management platform built with Nest.js and TypeScript. Brooks Bridge streamlines business operations with comprehensive employee management, payroll processing, and departmental organization.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Employee Management**: Complete employee lifecycle management
- **Department Organization**: Hierarchical department structure
- **Payroll System**: Automated payroll processing and management
- **Real-time Dashboard**: Interactive dashboards with live data
- **Responsive Design**: Mobile-first responsive UI

### User Roles
- **Admin**: Full system access and user management
- **HR Manager**: Employee and payroll management
- **Employee**: Personal dashboard and time tracking

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Chart.js** - Data visualization

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe backend development
- **Express.js** - Web framework (underlying NestJS)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Prisma** - Database ORM
- **MySQL** - Database
- **Socket.IO** - Real-time communication

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vite** - Build optimization

## 📁 Project Structure

```
BROOKS BRIDGE/
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── common/          # Common utilities and decorators
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── users/       # User management module
│   │   │   ├── employees/   # Employee management module
│   │   │   ├── payroll/     # Payroll processing module
│   │   │   └── departments/ # Department management module
│   │   ├── prisma/          # Prisma database client
│   │   ├── app.module.ts    # Root application module
│   │   └── main.ts          # Application entry point
│   ├── prisma/
│   │   ├── migrations/      # Database migration files
│   │   └── schema.prisma    # Prisma database schema
│   ├── test/                # Test files
│   ├── .env                 # Environment variables
│   ├── .gitignore           # Git ignore file
│   ├── .prettierrc          # Prettier configuration
│   ├── eslint.config.mjs    # ESLint configuration
│   ├── nest-cli.json        # NestJS CLI configuration
│   ├── package.json         # Backend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   └── tsconfig.build.json  # Build TypeScript configuration
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── AuthPageLayout/
│   │   │   ├── Landing/
│   │   │   └── dashboard/
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── Landing.tsx   # Landing page
│   │   │   └── Dashboard.tsx  # Main dashboard
│   │   ├── styles/          # Global styles
│   │   ├── main.tsx         # App entry point
│   │   └── App.tsx          # Root component
│   ├── public/              # Static assets
│   ├── .sixth/              # Sixth skills configuration
│   ├── package.json         # Frontend dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   ├── tailwind.config.ts  # Tailwind CSS config
│   ├── vite.config.js      # Vite configuration
│   └── index.html           # HTML template
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BROOKS-BRIDGE
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secrets
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the backend server**
   ```bash
   npm run start:dev
   ```

6. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

### Backend Scripts
```bash
# Development
npm run start:dev    # Start development server with hot reload
npm run start:debug  # Start in debug mode
npm run build        # Build for production
npm run start:prod   # Start production server

# Database
npm run prisma:migrate      # Run database migrations
npm run prisma:generate     # Generate Prisma client
npm run prisma:studio       # Open Prisma Studio
npm run prisma:seed         # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode
```

### Frontend Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the backend root:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/brooks_bridge"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Application
NODE_ENV=development
PORT=4000

# Prisma
PRISMA_GENERATE_DATAPROXY=false
```

### Frontend Environment Variables
Create a `.env` file in the frontend root:

```env
# API Configuration
VITE_API_URL=http://localhost:4000

# JWT Configuration
VITE_JWT_SECRET=your-jwt-secret-key

# Application Settings
VITE_APP_NAME=Brooks Bridge
VITE_APP_VERSION=1.0.0
```

### TypeScript Configuration
The project uses TypeScript with strict mode enabled. Key configurations:

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: React JSX Transform
- **Strict Mode**: Enabled
- **Path Aliases**: Configured for clean imports

### Tailwind CSS Configuration
Custom theme with role-based color schemes:
- **Admin**: Purple color palette
- **Teacher**: Teal color palette  
- **Student**: Indigo color palette

## 🎯 Key Features

### Authentication System
- **Multi-role Authentication**: Admin, HR Manager, Employee
- **Secure Login**: JWT-based authentication with refresh tokens
- **Password Security**: Bcrypt password hashing
- **Session Management**: Secure session handling

### Dashboard System
- **Role-based Dashboards**: Different views for each user type
- **Real-time Data**: Live updates and notifications
- **Interactive Charts**: Data visualization with Chart.js
- **Responsive Design**: Works on all device sizes

### Employee Management
- **Complete Profiles**: Employee information and documents
- **Department Assignment**: Hierarchical organization
- **Performance Tracking**: Employee performance metrics
- **Document Management**: Secure document storage

### Payroll System
- **Automated Calculations**: Salary and benefits calculations
- **Tax Management**: Automatic tax deductions
- **Payment History**: Complete payment records
- **Reporting**: Comprehensive payroll reports

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption
- **Session Management**: Secure session handling
- **Role-based Access**: Granular permission control

### Data Security
- **Input Validation**: Comprehensive input sanitization
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Headers**: HTTP security headers

## 🎨 UI/UX Features

### Design System
- **Consistent Design**: Unified design language
- **Color Schemes**: Role-based color coding
- **Typography**: Readable and accessible fonts
- **Icons**: Lucide React icon library

### User Experience
- **Responsive Design**: Mobile-first approach
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliance

## 📊 Performance

### Frontend Optimization
- **Code Splitting**: Automatic code splitting
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Optimized images and assets
- **Caching**: Browser caching strategies

### Build Performance
- **Fast Builds**: Vite's fast HMR
- **Type Safety**: TypeScript compilation
- **Bundle Analysis**: Bundle size optimization
- **Source Maps**: Debug-friendly builds

## 🧪 Testing

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Manual Testing
- **Authentication Flow**: Test all login scenarios
- **Dashboard Functionality**: Verify all features work
- **Responsive Design**: Test on different screen sizes
- **Cross-browser Testing**: Test on multiple browsers

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Server**: Node.js server with static files

### Environment Setup
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Configure environment variables**
   Set production environment variables

3. **Deploy to hosting**
   Upload `dist` folder to your hosting provider

## 📝 Development Guidelines

### Code Style
- **TypeScript**: Use TypeScript for all new code
- **Components**: Functional components with hooks
- **CSS**: Tailwind CSS utility classes
- **Imports**: Use path aliases for clean imports

### Git Workflow
1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Maintenance tasks

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Ensure all tests pass**
6. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@brooksbridge.com
- **Documentation**: Check this README and code comments
- **Issues**: Report issues on GitHub

## 🗺 Roadmap

### Upcoming Features
- **Advanced Analytics**: Enhanced reporting and analytics
- **Mobile App**: React Native mobile application
- **API Integration**: Third-party service integrations
- **Advanced Security**: Multi-factor authentication
- **Performance Dashboard**: Real-time performance metrics

### Improvements
- **Enhanced UI/UX**: Continuous design improvements
- **Performance Optimization**: Ongoing performance enhancements
- **Security Updates**: Regular security patches
- **Documentation**: Improved developer documentation

---

**Built with ❤️ by the Brooks Bridge Team**
