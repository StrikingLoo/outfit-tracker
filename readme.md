# Clothing Selector App

## Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open a web browser and go to:
   ```
   http://localhost:3000
   ```

## Features
- Select clothing items from predefined categories
- Save selections to a JSON file on the server
- View previously saved selections
- Clear all saved selections

## Project Structure
- `app.js`: Express server with API endpoints
- `public/index.html`: Frontend application
- `data/clothing_options.json`: Predefined clothing options
- `data/saved_selections.json`: Saved user selections
