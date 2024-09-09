Weather Forecast Web Application

A weather forecast web application built with React.js, TypeScript, Axios, and Tailwind CSS, which allows users to search for cities and view detailed weather information using the Geonames API and OpenWeather API. The app is responsive, user-friendly, and offers additional features like favorite cities, infinite scrolling, and real-time weather updates.


City Search with Autocomplete:

Users can search for cities worldwide using the Geonames API.
Displays city names, countries, and timezones.
Includes infinite scrolling for seamless browsing.

Weather Details:

Displays detailed weather information for selected cities using the OpenWeather API.
Includes current temperature, humidity, wind speed, pressure, and weather description.
Features a dynamic weather icon and optional Celsius/Fahrenheit toggle.

Favorites Management:

Allows users to add or remove cities from a favorites list for quick access.
Favorite cities persist throughout the session.

Responsive Design:

The app is fully responsive and works across various screen sizes and devices.
Tailwind CSS ensures fast, flexible, and consistent UI development.

Error Handling:

Gracefully handles API errors with user-friendly error messages.
Handles edge cases such as invalid city queries and network failures.

Usage
Search for a City:

Use the search bar to enter a city name. Autocomplete suggestions will appear as you type.
Select a city from the list to view its weather details.

View Weather Details:

The selected city’s weather page will show current weather data, including temperature, humidity, and wind speed.
A dynamic weather icon based on the current conditions will be displayed.

Add to Favorites:

Click the "Add to Favorites" button on any city's weather page to save it for future reference.
The button changes to "Remove from Favorites" once added.

Responsive Experience:

The app automatically adjusts its layout for mobile, tablet, and desktop devices.


API Integration

Geonames API:
Used for fetching city data (name, country, timezone).
http://api.geonames.org/searchJSON?formatted=true&q=city_name&maxRows=10&username=your_username


OpenWeather API:
Used for fetching current weather data.
https://api.openweathermap.org/data/2.5/weather?q=city_name&appid=your_api_key

Available Scripts

In the project directory, you can run the following scripts:

npm start: Runs the app in development mode on http://localhost:3000/.

npm run build: Builds the app for production to the build folder. It bundles React in production mode for optimized performance.

npm test: Runs the test suite for all components (using Jest and React Testing Library).

npm run eject: Ejects the app configuration for advanced customization (use with caution).