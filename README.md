# Prolo Logistics - Modern Logistics Solutions

A comprehensive logistics company website built with cutting-edge technologies to provide seamless international shipping services.

![Project Screenshot](public/screenshot.png)

## Features

- **Multi-language Support**: Full RTL/LTR support for English and Arabic
- **Internationalization**: Dynamic content translation with next-intl
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Dynamic metadata generation and structured data
- **Shipment Management**:
  - Create shipments with automated reference numbers
  - Real-time tracking system
  - Label printing functionality
  - Payment integration
- **Customer Engagement**:
  - Contact forms with email notifications
  - Quote request system
  - Newsletter subscription
- **Content Management**:
  - Blog section with dynamic routing
  - Service pages with detailed information
  - Industry-specific solutions showcase
- **Interactive Components**:
  - Testimonials slider
  - FAQ accordion
  - Process diagrams
  - Tracking interface

## Key Sections

### Homepage

- Hero banner with call-to-action
- Company overview and value proposition
- Services showcase with visual icons
- Feature highlights and benefits
- Industry solutions presentation
- Customer testimonials
- Frequently asked questions
- Company statistics counter

### Services

Detailed pages for each logistics service including:

- Air freight
- Sea freight
- Land transportation
- Warehousing
- Customs brokerage
- Insurance services

### Tracking System

- Barcode-based shipment tracking
- Real-time status updates
- Detailed shipment history
- Delivery timeline visualization

### Get a Quote

Interactive form for instant shipping quotes with:

- Origin and destination selection
- Package dimensions and weight
- Service type preferences
- Automated quote calculation

### Contact & Support

- Multiple contact options
- Branch locations directory
- Business inquiry forms
- Customer support portal

## Technologies Used

### Frontend

- **Next.js 14** (App Router) - React framework for production
- **TypeScript** - Strongly typed programming language
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library for React applications
- **Swiper** - Modern touch slider library
- **Headless UI** - Unstyled, accessible UI components

### Backend & Services

- **Firebase**:
  - Firestore for database storage
  - Authentication for admin access
  - Cloud Functions for server-side logic
- **React Email** - Email component library
- **Sharp** - High performance image processing

### Internationalization

- **next-intl** - Internationalization library for Next.js
- Complete RTL support for Arabic language

### Development Tools

- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting standardization
- **PostCSS** - CSS processing tool

## Project Structure

```

src/
├── app/ # Next.js app router pages
│ ├── [locale]/ # Localized pages
│ │ ├── \_components/ # Reusable UI components
│ │ ├── blogs/ # Blog section
│ │ ├── contact/ # Contact page and forms
│ │ ├── get-a-quote/ # Quote request system
│ │ ├── industries/ # Industry solutions
│ │ ├── services/ # Service detail pages
│ │ └── tracking/ # Shipment tracking system
├── i18n/ # Internationalization configuration
├── lib/ # Business logic and utilities
│ ├── api.ts # External API integrations
│ ├── createShipment.ts # Shipment creation logic
│ ├── getTracking.ts # Tracking data retrieval
│ ├── printLabel.ts # Label printing functionality
│ ├── processPayment.ts # Payment processing
│ ├── emails/ # Email templates and sending
│ └── firebase/ # Firebase configuration and helpers
└── seo/ # SEO metadata files

```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@prologistics.com or open an issue on GitHub.
