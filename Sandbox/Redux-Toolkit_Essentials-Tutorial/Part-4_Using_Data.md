# [React Toolkit Essentials Tutorial; Part 4 Using Data](https://redux.js.org/tutorials/essentials/part-4-using-data)

Let's add some new features to make our app more useful: viewing a single post, editing existing posts, showing post
author details, post timestamps, and reaction buttons.

## Showing Single Posts

Let's create a single post view that will allow extended functionality beyond what is in the default list view.

Create a new Component `features/posts/SinglePostPage.js`.

When we wire up the new component to the react router, the router will pass in a `match` object as a prop that contains
the URL information.  When we set up the route, we are going to parse the URL and pass a variable named `postId`.  This
value can be read from `match.params`.  *See the code for details.*

## Adding the Single Post Route

Now that we have our \<SinglePostPage\> component, we can wire it up to a route in `App.js`.

```js
//...
import { SinglePostPage} from "./features/posts/SinglePostsPage";
//...
<Route exact path="/posts/:postId" component={SinglePostPage} />
//...
```

Use the `Link` component from `react-router-dom` to provide a link to the `SinglePostPage` view.

Add a feature to the navbar that allows quick return to the default view.

