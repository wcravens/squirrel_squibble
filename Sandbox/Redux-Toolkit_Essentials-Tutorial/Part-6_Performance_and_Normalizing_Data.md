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

`features/notifications/notificationsSlice.js`

`app/store.js` Add slice to the store.

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

`features/notifications/NotificationsList.js`

`app/Navbar.js` links and button.

`App.js` client side route.

### Showing New Notifications

We'll add a feature that keeps track of which notifications have been read.  And display the number of new unread
notifications as a badge on our Notifications tab in the navbar.

... skipped implementation of these features.  Review Later.


## Improving Render Performance

Review the React Profiler in dev tools.  We can see that UserPage is rendering all the time even if user posts data
hasn't changed.  This is because we are using a `.filter()` function which will always return a different array
reference.  Even though the contents of the array are the same, when the reference changes, the selector function will
inspire a new rendering of the component.

```js
//...
  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter(post => post.user === userId)
  })
//...
```

### Memoization

We can remember the array reference and only return a new one if the `state.posts` have changes or if the `userId`
changes. This is memoization.

[Reselect](https://github.com/reduxjs/reselect) is a library for creating memoized selector functions, and was specifically designed to be used with Redux. It
has a createSelector function that generates memoized selectors that will only recalculate results when the inputs
change. Redux Toolkit exports the createSelector function, so we already have it available.

Use Reselect in `features/posts/postsSlice.js`.

```js
//...
  export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
  )
//...
```

`createSelector` takes one or more "input selector" functions as argument, plus an "output selector" function. When we
call `selectPostsByUser(state, userId)`, `createSelector` will pass all of the arguments into each of our input selectors.
Whatever those input selectors return becomes the arguments for the output selector.


### Investigating the Posts List

If we review the profiler while clicking on the reaction items, we'll see that the whole posts list re-renders every
time.  Reacts default mode is to re-render all children when a parent changes.

When one post is editted it creates a new posts array.  Since the posts array was a new refrence, `<PostList>` re-rendered
all of the `<PostExcerpt>` components as well.

Use `React.memo()` to wrap a component that will memoize props and only re-render when the props have changed.


## Normalizing Data

A lot of our logic has been looking up items by their id fields using functions like `.find()` or `.filter()`.  These
methods are O(n) for any given array.  We can do better by providing both a 'sorted' list of ids along with a lookup
table that provides O(1) efficientcy.

### Normalizing State Structure

"Normalized state" means that:

- We only have one copy of each particular piece of data in our state, so there's no duplication
- Data that has been normalized is kept in a lookup table, where the item IDs are the keys, and the items themselves are
  the values.
- There may also be an array of all of the IDs for a particular item type

A *normalized* state for our Users may look like:

```js
{
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}
```

This way we can extract both a sorted list and lookup users individually by id.

```js
const userId = 'user2'
const user = state.users.entities[userId]
```

### Managing Normalized State with `createEntityAdapter`

Redux Toolkit's `createEntityAdapter` API provides a standardized way to store your data in a slice by taking a
collection of items and putting them into the shape of `{ ids: [], entities: {} }`. Along with this predefined state
shape, it generates a set of reducer functions and selectors that know how to work with that data.

This has several benefits:

- We don't have to write the code to manage the normalization ourselves
- `createEntityAdapter`'s pre-built reducer functions handle common cases like "add all these items", "update one item",
  or "remove multiple items"
- `createEntityAdapter` can keep the ID array in a sorted order based on the contents of the items, and will only update
  that array if items are added / removed or the sorting order changes.

`createEntityAdapter` accepts an options object that may include a `sortComparer` function, which will be used to keep
the item IDs array in sorted order by comparing two items (and works the same way as `Array.sort()`).

`createEntityAdapter` returns a set of CRUD reducer functions: 

- `addOne`: accepts a single entity, and adds it if it's not already present.
- `addMany`: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds them if not already present.
- `setOne`: accepts a single entity and adds or replaces it
- `setMany`: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
- `setAll`: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces all existing entities with the values in the array.
- `removeOne`: accepts a single entity ID value, and removes the entity with that ID if it exists.
- `removeMany`: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
- `removeAll`: removes all entities from the entity state object.
- `updateOne`: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
- `updateMany`: accepts an array of update objects, and performs shallow updates on all corresponding entities.
- `upsertOne`: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
- `upsertMany`: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.

Each method has the following signature:

```js
(state: EntityState<T>, argument: TypeOrPayloadAction<Argument<T>>) => EntityState<T>
```

The entity adapter will also contain a getSelectors() function that returns a set of selectors that know how to read the
contents of an entity state object:

- `selectIds`: returns the state.ids array.
- `selectEntities`: returns the state.entities lookup table.
- `selectAll`: maps over the state.ids array, and returns an array of entities in the same order.
- `selectTotal`: returns the total number of entities being stored in this state.
- `selectById`: given the state and an entity ID, returns the entity with that ID or undefined.

The adapter also has a `getInitialState` which will return an empty template object. You can pass in more fields and
they will be merged in.

### Updating the Posts Slice
