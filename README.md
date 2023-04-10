# MyNews

MyNews is a simple frontend application built using Next.js and Sass/SCSS, that displays news articles from different categories and sources. This project was built as a part of a coding challenge to showcase my skills in front-end development.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Design Decisions](#design-decisions)
- [Technologies Used](#technologies-used)
- [API Choice](#api-choice)
- [API Key](#api-key)

## Requirements
- The app should contain a "homepage" for all articles grouped by categories and sorted chronologically.
"Latest news" widget must implement infinite scroll functionality.
- Each category must be clickable and lead to a "category page" where you can find all articles from that category.
- The app should have a search filter (by name) for the article list.
- The app should have a feature for bookmarking favorite articles (use app state or browser storage).
- There is no design for bookmarking the articles. Feel free to choose an approach you think is most useful, and be ready to explain why.
- Display favorites on the "homepage" under "Favorites" category.

## Installation
To install MyNews, first clone the repository:
```
$ git clone https://github.com/ncecic/mynews.git
```
Then, install the dependencies using npm:
```
$ cd mynews
$ npm install
```

## Usage
To start the application, run:
```
$ npm start
```
Access the app on http://localhost:3000/.

## Design Decisions
- Used a clean and simple design to make the user interface easy to navigate.
- Used SCSS to improve the CSS readability and maintainability.
- Used Next.js to leverage its server-side rendering and better SEO optimization.
- Used React hooks for state management and to make the code more modular and reusable.
- Implemented the "Favorites" feature using the browser's local storage instead of using an external database or server. This was done to simplify the implementation and reduce the app's dependencies, making it easier to deploy and maintain. i Choose to put it at the bottom of news article element where it is easy to see and use in both mobile and desktop view

## Technologies Used
- React - A JavaScript library for building user interfaces.
- Next.js - A React framework for server-side rendering and better SEO optimization.
- TypeScript - A typed superset of JavaScript that compiles to plain JavaScript.
- Sass/SCSS - A CSS preprocessor that adds features like variables, nesting, and mixins.
- Prettier - A code formatter that helps maintain consistent code style.
- React Router - A library for declarative routing in React.
- React Infinite Scroller - A component for implementing infinite scrolling.
- React Icons - A library of icons for React.

## API Choice
The NewsAPI was used in this project instead of the New York Times API due to the following reasons:
- The NewsAPI has a simpler and more straightforward documentation compared to the New York Times API.
- The NewsAPI provides news articles from various sources and categories, while the New York Times API only provides articles from the New York Times.

## API Key
MyNews uses the NewsAPI to fetch news articles. To use the app, you need to obtain an API key from NewsAPI and add it to a .env.local file in the root of the project:
```
API_KEY=<your API key here>
```