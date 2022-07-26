# [React Toolkit Essentials Tutorial; Part 6 Performance and Normalized Data](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

So far, most of our functionality has been centered around the posts feature. We're going to add a couple new sections
of the app. After those are added, we'll look at some specific details of how we've built things, and talk about some
weaknesses with what we've built so far and how we can improve the implementation.

## Adding User Pages

Let's add a page to show the list of all users, and another to show all posts by a specific user.

## Adding Notifications

The fake API will create some random notification entries every time we make a request.  We will add a button to
manually fetch these from the mock API.

### Notification Slice

Our first step is to setup a new slice, and an async thunk to fetch some notifications.  We will also store a timestamp
for the latest notification in our state.

### *Thunk Arguments*

The second argument to our payload creator is a thunkAPI object containing several useful functions and pieces of
information. 

- `dispatch` and `getState`: the actual dispatch and getState methods from our Redux store. You can use these inside the
  thunk to dispatch more actions, or get the latest Redux store state (such as reading an updated value after another
  action is dispatched).
- `extra`: the "extra argument" that can be passed into the thunk middleware when creating the store. This is typically
  some kind of API wrapper, such as a set of functions that know how to make API calls to your application's server and
  return data, so that your thunks don't have to have all the URLs and query logic directly inside.
- `requestId`: a unique random ID value for this thunk call. Useful for tracking status of an individual request.
- `signal`: An AbortController.signal function that can be used to cancel an in-progress request.
- `rejectWithValue`: a utility that helps customize the contents of a rejected action if the thunk receives an error.


### Adding Notifications List 

We can now add a `<NotificationsList>` component to our app.

`Navbar.js` links and button.

`App.js` client side route.

