# Netflix Clone

A high-performance Netflix clone built with React, Tailwind CSS, and Firebase. This application features movie discovery via the TMDB API, secure authentication, and a personal watchlist.

## 🚀 Features

- **Authentication**: Sign up and Log in using Email/Password or Google.
- **Dynamic Content**: Fetches real-time movie/TV show data from TMDB.
- **Hero Banner**: Displays a random trending movie with playback options.
- **Categorized Rows**: Scrollable rows for Trending, Top Rated, Action, Comedy, Horror, Romance, and Documentaries.
- **Search**: Interactive search bar with real-time results grid.
- **My List**: Add or remove movies from your personal watchlist, persisted in Firebase Firestore.
- **Detailed Modal**: View movie details, ratings, and watch YouTube trailers directly in the app.
- **Responsive UI**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **API Client**: Axios
- **Backend/Auth**: Firebase (Authentication & Firestore)
- **Data Source**: TMDB API

## 📋 Prerequisites

Before you begin, ensure you have:
- [Node.js](https://nodejs.org/) installed (v16 or higher recommended).
- A [TMDB API Key](https://www.themoviedb.org/documentation/api).
- A [Firebase Project](https://console.firebase.google.com/).

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your API keys:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** and activate **Email/Password** and **Google** sign-in methods.
3. Enable **Cloud Firestore** and create a database in "Test Mode" or set up rules to allow authenticated users to write to `users/{userId}/myList/{movieId}`.

### 5. Run the application
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure
```
src/
  components/    # Reusable UI components (Navbar, Row, Modal, etc.)
  pages/         # Full-page components (Home, Search, MyList, Auth)
  context/       # AuthContext for global state management
  services/      # TMDB API service and configurations
  firebase.js    # Firebase initialization
  App.jsx        # Routing and layout
  main.jsx       # Application entry point
```

## 📄 License
This project is for educational purposes only.
