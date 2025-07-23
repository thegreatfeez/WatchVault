# Movies Watchlist App

A web application to search for movies using the OMDb API and manage your personal watchlist, with data stored locally in the browser.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- 🔍 **Search** movies by title
- 🎥 Display detailed info: poster, title, rating, runtime, genre, plot
- ⭐️ **Add** movies to your watchlist (persisted in LocalStorage)
- 🗑️ **Remove** movies from your watchlist
- 💻 Responsive design powered by Tailwind CSS

---

## Demo

<details>
<summary>Search & Results</summary>

![Search Results](docs/screenshot-search.png)

</details>

<details>
<summary>My Watchlist</summary>

![Watchlist](docs/screenshot-watchlist.png)

</details>

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for OMDb API requests
- An **OMDb API key** (free at [OMDb API](http://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone** this repository:
   ```bash
   git clone https://github.com/thegreatfeez/WatchVault.git
   cd WatchVault
   ```
2. No additional dependencies or build steps are required—this is a static frontend project.

### Configuration

1. Open `script.js` in your editor.
2. Locate the line where the API key is defined:
   ```js
   const API_KEY = 'YOUR_OMDB_API_KEY';
   ```
3. Replace `'YOUR_OMDB_API_KEY'` with your actual key and save.

---

## Usage

1. Open `index.html` in your browser.
2. Enter a movie name and click **Search**.
3. Click **Add to watchlist** to save a movie.
4. Navigate to **My Watchlist** via the header link to view or remove saved items.

---

## Project Structure

```
├── index.html         # Main search page
├── watchlist.html     # Watchlist display page
├── script.js          # Application logic (search, add, remove)
├── image/             # Static assets (icons, backgrounds)
└── README.md          # Project documentation
```

---

## Technologies

- **HTML5** & **CSS3**
- **JavaScript (ES6+)**
- **Tailwind CSS** for utility-first styling
- **OMDb API** for movie data
- **LocalStorage** for client-side persistence

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add feature: YourFeature"`.
4. Push to your branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

- [OMDb API](http://www.omdbapi.com/) for movie data
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
