# MobiSwap Application Documentation

## 1. Project Overview

MobiSwap is a modern, responsive web application designed as a one-stop-shop for buying, selling, and exchanging mobile phones. It features a clean, professional user interface and leverages AI to provide personalized product recommendations.

## 2. Tech Stack

The application is built with a modern, production-ready tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **UI Library**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (for generative AI features)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## 3. Project Structure

The codebase is organized into the following key directories:

-   `src/app/`: Contains all the pages and routes for the application, following the Next.js App Router convention. Each folder represents a route segment.
-   `src/components/`: Houses all reusable React components, organized by function (e.g., `layout`, `ui`).
    -   `src/components/ui/`: Contains the base components from ShadCN UI.
-   `src/ai/`: Holds the AI-related logic.
    -   `src/ai/flows/`: Defines the Genkit flows that interact with the generative models.
    -   `src/ai/genkit.ts`: Configures and initializes the Genkit instance.
-   `src/data/`: Contains static data used throughout the application, such as product lists and customer reviews.
-   `src/lib/`: Includes utility functions, such as the `cn` helper for merging Tailwind classes.
-   `public/`: Stores static assets like images and SVGs.

## 4. Key Features

### Homepage (`/`)

-   **Hero Section**: An engaging introduction with clear calls-to-action.
-   **Featured Products**: A grid showcasing select mobile phones.
-   **Why Choose Us**: A section highlighting key benefits like fast delivery and secure payments.
-   **AI Phone Finder**: An interactive component allowing users to get phone recommendations based on a natural language query.
-   **Customer Reviews**: A carousel of user testimonials.

### Products Listing (`/products`)

-   A comprehensive grid of all available mobile phones.
-   Features robust filtering by search term, condition, and company.
-   Includes sorting options for price and name.
-   "Load More" functionality for improved performance.

### Product Details (`/products/[id]`)

-   A detailed view of a single product.
-   Displays key specifications, a detailed description, and price.
-   Includes "Buy Now" and "Request Exchange" buttons.

### Exchange Request Form (`/exchange`)

-   A dedicated form for users to submit details about a phone they wish to exchange.
-   Includes fields for the device model, condition, contact information, and optional image uploads.
-   Uses Zod for robust form validation.

### Contact Page (`/contact`)

-   A user-friendly contact form for inquiries.
-   Displays business contact information (address, phone, email).

### AI Phone Finder

-   This feature is integrated into the homepage.
-   It uses a Genkit flow (`recommend-phones-flow.ts`) to send a user's query and a list of available products to a generative model.
-   The model analyzes the query and returns a list of recommended product IDs, which are then displayed to the user.

## 5. Getting Started

To run the application locally, follow these steps:

1.  **Install Dependencies**:
    Open a terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    To start the Next.js application, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Run the Genkit Development Server (Optional)**:
    The AI features are powered by Genkit. To inspect and test flows locally, you can run the Genkit development server in a separate terminal:
    ```bash
    npm run genkit:dev
    ```
    The Genkit development UI will be available at `http://localhost:4000`.
