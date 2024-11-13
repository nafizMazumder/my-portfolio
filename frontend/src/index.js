// src/index.js

import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import App from './App'; // Import the main App component
import './styles.css'; // Import the CSS styles

// Create a root for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
