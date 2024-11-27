# Outfit Tracker
> What have I worn recently?

This project scratches the quantified-self itch for tracking every outfit. 
Create a `data/clothing_options.json` file with the following template

```json
{
    "outerwear": [
      ],
    "top": [
      ],
    "shirt": [
      ],
    "pants": [
      ],
    "shoes": [   
      ]
}
```
and `data/saved_selections.json` with `[]` as its contents.

After running the app on node, you will see something like this.

![A screenshot of the app showing the UI. Several clothing category dropdowns and a button to save a selection.](/screenshot.png)

Fill the json with your clothing inventory and start tracking how much you wear each outfit!

Exporting data is as easy as copying the `saved_selectins.json` file.

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
- `index.html`: Frontend application
- `data/clothing_options.json`: Predefined clothing options
- `data/saved_selections.json`: Saved user selections
