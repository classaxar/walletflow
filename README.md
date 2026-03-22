# WalletFlow 💸

WalletFlow is a modern, privacy-first personal finance tracker built directly in React. It uses a unique **Envelope Budgeting** system to automatically separate physical cash/bank balances from virtual savings goals.

## Core Difference
Normally, expense trackers just track money in and money out. **WalletFlow** separates physical locations from conceptual bounds.
For example, if you withdraw 500 Cash from the Bank for pocket money, WalletFlow automatically drops your Bank balance by 500, raises your physical Cash balance by 500, and immediately deducts 500 from your virtual "Heart" Pocket Money bucket. 

## Features
- **Instant Local Setup**: All data is securely stored purely in the browser's `localStorage`. No sign-up required.
- **Envelope Math Engine**: Automatically deducts from physical and virtual wallets intelligently based on the mode of payment (Cash vs. Online).
- **Premium Dark Mode Glassmorphism**: A stunning built-from-scratch UI using Contextual styling.
- **Roll-Over Logic**: Leftover allocation cash instantly rolls into the next month's bucket as a savings reward.

## Tech Stack
- React + Vite
- Context API (State Management)
- Vanilla CSS Variables (No external libraries!)

## Running Locally

Clone the project and run the server:

```bash
npm install
npm run dev
```

The application will run on `http://localhost:5173`.
