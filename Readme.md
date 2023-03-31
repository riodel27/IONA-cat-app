# IONA Cat App

Welcome to the IONA Cat App! This application allows users to browse a variety of cat breeds and view images of cats. This project was built using React and TypeScript.

## Features

- Browse cat images by breed
- Load more cat images
- View cat details

## Installation

1. Clone the repository:

   ```
   $  git clone https://github.com/riodel27/IONA-cat-app.git
   ```

2. Install dependencies:

   ```
   $ yarn
   ```

3. Create a `.env` file in the root directory with the following content:

   ```
   $ touch .env

   VITE_REACT_APP_BASE_URL=https://api.thecatapi.com/v1
   ```

4. Run the app:

   ```
   $ yarn dev
   ```

## Usage

- Select a breed from the dropdown menu to view cats for that breed.
- Click the "Load more" button to load more cats.
- Click on a cat card to view cat details.

## Technologies

- react-router-dom
- react-bootstrap
- axios (or fetch API)
- Context API (for state management)
- styled-components (for styling)
- typescript (recommended)
- eslint
