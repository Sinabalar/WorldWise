# WorldWise

WorldWise is a React-based web application built with Vite that allows users to track and manage cities they've visited.
Users can view cities on a map, add new cities,add notes for each visited city, and organize their travel memories.

## Features

- 📍 Interactive city tracking and management
- 🗺️ Interactive map using Leaflet
- 📅 Date selection for visits using React DatePicker
- 🔒 Protected routes with authentication
- 📱 Responsive design
- 🌍 Country-wise city organization
- 🔄 Mock backend using JSON Server
- ✨ Modern React routing with React Router v6

## Tech Stack

- React 18
- Vite 4
- React Router v6
- Leaflet for maps
- React DatePicker
- JSON Server for mock backend
- ESLint for code quality
- Modern JavaScript (ES6+)

## Project Structure

```
src/
├── components/
│   ├── CityList.jsx
│   ├── CountryList.jsx
│   ├── City.jsx
│   └── Form.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── Product.jsx
│   ├── Pricing.jsx
│   ├── Login.jsx
│   ├── AppLayout.jsx
│   ├── PageNotFound.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── citiesContext.jsx
│   └── FakeAuthContext.jsx
├── data/
│   └── cities.json
└── App.jsx
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Sinabalar/WorldWise.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start the JSON server (in a separate terminal):

```bash
npm run server
```

The app will be available at ` http://localhost:5174/`, and the mock API will run at `http://localhost:8000`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON server (mock backend)
- `npm run lint` - Run ESLint

## Dependencies

### Main Dependencies

```json
{
  "json-server": "^0.17.3",
  "leaflet": "^1.9.4",
  "react": "^18.2.0",
  "react-datepicker": "^7.5.0",
  "react-dom": "^18.2.0",
  "react-leaflet": "^4.2.1",
  "react-router-dom": "^6.27.0"
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.2.15",
  "@types/react-dom": "^18.2.7",
  "@vitejs/plugin-react": "^4.0.3",
  "eslint": "^8.57.1",
  "eslint-config-react-app": "^7.0.1",
  "eslint-plugin-react": "^7.32.2",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.3",
  "vite": "^4.4.5",
  "vite-plugin-eslint": "^1.8.1"
}
```

## API Endpoints

The JSON server provides the following endpoints:

- `GET /cities` - Get all cities
- `GET /cities/:id` - Get a specific city
- `POST /cities` - Add a new city
- `DELETE /cities/:id` - Delete a city

## State Management

- `CitiesProvider`: Manages the state of cities and related operations
- `AuthProvider`: Handles user authentication state and methods

## Protected Routes

The application implements protected routes using a custom `ProtectedRoute` component. Users must be authenticated to
access the main application features.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [your-email@example.com]
Project Link: [https://github.com/yourusername/worldwise]

## Acknowledgments

- Vite team for the blazing fast build tool
- React Router team for the excellent routing solution
- Leaflet team for the amazing mapping library
- JSON Server team for the fake REST API
