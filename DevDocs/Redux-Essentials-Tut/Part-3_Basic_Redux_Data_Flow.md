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

### Creating the Posts Slice for the Store

Create new slice in `features/posts/postsSlice.js`

We need to add the new slice's reducer to the store.

`app/store.js`

```js
//...
import postsReducer from '../features/posts/postsSlice'
//...
  reducer: {
    posts: postsReducer
  }
//...
```

So we have created a slice, and added its reduce to the store.  You can now refresh the Application and see that the
state is initialized with our two posts.

***Note:***: *The pattern of initializing your slice and wiring it up with an initialState is a good practice.  This
allows you to get your reducer wired up quickly and see that it works in DevTools.*

### Showing the Posts List

Now that we have some mock data in the store, we can create a component to view lists of posts.

New component: `features/posts/PostsList.js`

We can create a new view by replacing the default route in `App.js`.

```js
//...
import { PostsList} from "./features/posts/PostsList";
//...
    render={ () => (
      <React.Fragment>
        <PostsList />
      </React.Fragment>
    )}
//...
```

The app should now be rendering the posts (via live update).

### Adding New Posts

We'll create an 'Add New Post' form that allows us to write and save posts.  First create the empty form and add it to
the page view and then wire it up to the store so that new posts are added when we click a 'Save Post' button.

#### Adding the New Post Form

Create `features/posts/AddPostForm.js`

Import the form into `App.js`

```js
<React.Fragment>
  <AddPostForm/>
  <PostsList/>
</React.Fragment>
```

With Live Reload you should now see the Add new post form and input elements.  ***Note:*** *Since the form is not yet
wired up to the store you will not be able to save a new posts.*

#### Saving new Posts

We need to add a reducer to our 'postsSlice' to handle the `action` necessary to add a new post.

Add a `postAdded = ( state, action ) => `  reducer to our posts slice.  ***Note:*** *Since our postsSlice is only
responsible for the slice of state under 'posts', the `state` passed to this reducer contains only the state held under
the `posts` key.

The `action` payload passed to the reducer will hold the data from the form input.

`createSlice` will automatically create an 'action creator' fucntion with the same name as the reducer function.  We
will export this creator function so that we can use it our UI components to dispatch the appropriate action when the
user clicks "Save Post".

`features/posts/postsSlice`

```js
//...
reducers: {
  postAdded(state, action) {
    state.push(action.payload)
  }
}
//...
```

#### Dispatching the "Post Added" Action



