# Playlist Length

<div align="center">

![Playlist Length Logo](./screenshots/logo.png)

**Your Smart YouTube Playlist Companion**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Internationalization](#-internationalization)
- [Styling](#-styling)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Playlist Length** is a comprehensive YouTube playlist management tool designed to help users browse, analyze, and track their YouTube playlists with precision and clarity. Whether you're following educational courses, binge-watching series, or managing fitness programs, Playlist Length provides all the insights and tracking capabilities you need.

### 🎯 Why Playlist Length?

- **⚡ Instant Analysis**: Get complete playlist information in seconds
- **📊 Progress Tracking**: Monitor your viewing progress with intelligent calculators
- **🔖 Smart Bookmarking**: Save frequently used playlists for quick access
- **🌍 Bilingual Support**: Full support for both English and Arabic (RTL/LTR)
- **🎨 Modern UI**: Beautiful, responsive design with dark/light mode
- **📱 Mobile-First**: Optimized for all screen sizes

---

## ✨ Features

### 🔍 Browse & Search

- **Quick Search**: Paste any YouTube playlist URL and get instant results
- **Auto-Save**: Automatically save frequently used playlists
- **Smart Paste**: One-click paste from clipboard
- **Keyboard Shortcuts**: Press Enter to search instantly
- **Saved Links**: Access all your saved playlists in one place
- **Error Handling**: Clear, helpful error messages

### 📊 Insights & Analytics

- **Playlist Information**: Name, channel, thumbnail, and description
- **Duration Metrics**: Total duration, average video length
- **Video Statistics**: Video count, privacy status
- **Publication Data**: Published date and last update
- **Smart Text Detection**: Automatic language detection for mixed-language content
- **Interactive Tooltips**: Hover for additional information

### 📈 Progress Tracking

- **Completion Calculator**: Track how many videos you've watched
- **Visual Progress Bars**: See your progress at a glance
- **Time Analytics**: Watched time vs. remaining time
- **Dual Percentage Tracking**: By video count and duration
- **Daily Viewing Calculator**: Set your pace and predict completion date
- **Smart Calculations**: Based on actual video durations

---

## 🎥 Demo

### Live Demo

🔗 [Visit Playlist Length](https://your-demo-link.com)

---

## 📸 Screenshots

<div align="center">

### Browse Section

![Browse Section](./screenshots/browse.png)
_Search and save YouTube playlists with ease_

### Dark Mode

![Dark Mode](./screenshots/dark-mode.png)
_Beautiful dark theme for comfortable viewing_

</div>

---

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.x** - Modern UI library
- **TypeScript 5.x** - Type-safe development
- **Vite** - Lightning-fast build tool

### State Management

- **Redux Toolkit** - Predictable state container

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **React Hot Toast** - Beautiful notifications

### Internationalization

- **React i18next** - Complete i18n solution
- **RTL Support** - Full right-to-left support

### API Integration

- **YouTube Data API v3** - Fetch playlist data
- **Axios** - HTTP client

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **YouTube Data API Key** ([Get one here](https://console.cloud.google.com/apis/credentials))

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/playlist-length.git
   cd playlist-length
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   VITE_API_BASE_URL=https://www.googleapis.com/youtube/v3
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 📘 Usage

### Basic Workflow

1. **Search for a Playlist**
   - Paste a YouTube playlist URL in the search field
   - Press Enter or click the Search button
   - Optionally enable auto-save to keep the link

2. **Explore Insights**
   - View playlist name, channel, and thumbnail
   - Check total duration and video count
   - Read the playlist description
   - See publication and update dates

3. **Track Progress**
   - Enter how many videos you've completed
   - View completion percentage and progress bar
   - See watched time and remaining time
   - Set daily viewing pace for completion prediction

### Keyboard Shortcuts

- **Enter**: Search for playlist (when in search field)
- **Ctrl/Cmd + V**: Paste from clipboard (when paste button is focused)

### Tips & Tricks

- 💡 Enable auto-save to keep track of your favorite playlists
- 💡 Use the dark mode toggle for comfortable night viewing
- 💡 Switch languages anytime using the language selector
- 💡 Check the tooltips for additional information

---

## 🔑 Key Components

### Search Component (`Search.tsx`)

Handles playlist URL input, validation, and API requests. Features auto-save, smart paste, and keyboard shortcuts.

### Info Component (`Info.tsx`)

Displays comprehensive playlist information including metadata, thumbnail, description, and statistics.

### Track Component (`Track.tsx`)

Provides progress tracking with completion calculators, progress bars, and daily viewing predictions.

### FieldDemo Component

Reusable numeric input field with increment/decrement buttons and validation.

### ProgressBar Component

Visual progress indicator with percentage display and RTL/LTR support.

### ErrorPopup Component

User-friendly error dialog with clear messages and dismissal options.

---

## 🔌 API Integration

### YouTube Data API v3

The application uses the YouTube Data API v3 to fetch playlist information.

**Endpoints Used:**

- `GET /playlists` - Fetch playlist metadata
- `GET /playlistItems` - Fetch playlist videos

**Rate Limits:**

- 10,000 quota units per day (default)
- Implement caching to reduce API calls

**Example API Call:**

```typescript
const response = await axios.get(
  `https://www.googleapis.com/youtube/v3/playlists`,
  {
    params: {
      part: "snippet,contentDetails",
      id: playlistId,
      key: YOUTUBE_API_KEY,
    },
  },
);
```

---

### Redux Slices

- **playlistApiSlice**: Handles API calls and playlist data
- **playlistSlice**: Manages playlist link state
- **savedLinksSlice**: Manages saved playlists
- **modeSlice**: Manages theme (light/dark)
- **languageSlice**: Manages language (en/ar)
- **errorPopupSlice**: Manages error popup visibility
- **inputFocusSlice**: Manages input focus state

---

## 🌍 Internationalization

### Supported Languages

- **English (en)** - Left-to-Right (LTR)
- **Arabic (ar)** - Right-to-Left (RTL)

### Translation Files

```
src/locales/
├── en/
│   └── translation.json
└── ar/
    └── translation.json
```

### Adding Translations

1. Add keys to both `en/translation.json` and `ar/translation.json`
2. Use the `t()` function in components:
   ```tsx
   const { t } = useTranslation();
   <span>{t("key")}</span>;
   ```

### RTL Support

The application automatically switches text direction based on the selected language:

- Arabic: `dir="rtl"`
- English: `dir="ltr"`

---

### Dark Mode

Toggle between light and dark themes:

```tsx
const mode = useSelector((state: RootState) => state.mode.value);
<div className={mode === "dark" ? "dark" : ""}>{/* Content */}</div>;
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### How to Contribute

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/playlist-length.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code of Conduct

Please be respectful and considerate in all interactions. We're building a welcoming community!

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Playlist Length

Copyright © 2026 Mahmoud Badr Ali
All Rights Reserved.

This web application, including but not limited to its source code,
user interface, design, logic, algorithms, structure, content,
and overall concept, is the exclusive intellectual property
of Mahmoud Badr Ali.

No part of this project may be copied, reproduced, modified,
reverse engineered, distributed, sublicensed, or used
for commercial or non-commercial purposes without
explicit written permission from the owner.

Unauthorized use of this project is strictly prohibited.
```

---

## 📧 Contact

**Project Maintainer**: Mahmoud Badr Ali

- 📧 Email: mahmoudbadrali15@gmail.com

**Project Repository**: [https://github.com/yourusername/playlist-length](https://github.com/yourusername/playlist-length)

---

### Version History

- **v1.0.0** (Current) - Initial release with core features
  - Browse & Search functionality
  - Insights & Analytics
  - Progress Tracking
  - Bilingual support (EN/AR)
  - Dark/Light mode

---

## ⭐ Show Your Support

If you find this project useful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** code
- 📢 **Sharing** with others

---

<div align="center">

**Crafted with passion by [Mahmoud Badr Ali](https://github.com/MahmoudBadrAli)**

</div>
