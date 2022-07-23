# [React Toolkit Essentials Tutorial; Part 3 Basic Redux Data Flow](https://redux.js.org/tutorials/essentials/part-2-data-flow)


## Introduction

*We'll build a small social medial like application.*

## Project Setup

For this tutorial, we've created a pre-configured starter project that already has React and Redux set up, includes some
default styling, and has a fake REST API that will allow us to write actual API requests in our app. You'll use this as
the basis for writing the actual application code.

Clone from the example app repo:

    git clone git@github.com:reduxjs/redux-essentials-example-app.git
    rm -rf redux-essentials-example-app/.git

### Initial Project Files

- /public: the HTML host page template and other static files like icons
- /src
  - index.js: the entry point file for the application. It renders the React-Redux \<Provider\> component and the main
    \<App\> component.
  - App.js: the main application component. Renders the top navbar and handles client-side routing for the other
    content.
  - index.css: styles for the complete application
  - /api
    - client.js: a small AJAX request client that allows us to make GET and POST requests
    - server.js: provides a fake REST API for our data. Our app will fetch data from these fake endpoints later.
  - /app
    - Navbar.js: renders the top header and nav content
    - store.js: creates the Redux store instance

If you start the app and look in Redux DevTools you'll see that the current state is completely empty.

## Main Posts Feed

The primary feature of our app is a list of posts.  First we'll need the ability to post.

Create new slice in `features/posts/postsSlice.js`

We need to add the new slice's reducer to the store.

`app/store.js`

```js
//...
import postsReducer from '../features/posts/postsSlice'
//...
  reducer: () => ({
    posts: postsReducer
  })
//...
```
