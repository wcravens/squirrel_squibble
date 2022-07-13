# Notes on "[Learn React Main Concepts](https://reactjs.org/docs/hello-world.html)"

```sh
npx create-react-app --template minimal [APP_NAME]
```

- Rename App to the actual name of your application. If you don't have one yet, pick something silly and arbitrary that
  is easy to replace later. Squirrel works in this instance.


- Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API,
  your app will behave as if it's running React 17. Learn
  more: [https://reactjs.org/link/switch-to-createroot](https://reactjs.org/link/switch-to-createroot).

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
```

## Introducing JSX

- JSX is 'compiled' by babel into javascript. The returned function call or object can be used any where and in any way
  other javascript objects can be used.


JSX in:

```js
const element = (
        <h1 className="greeting">
          Hello, world!
        </h1>
);
```

Javascript out from [Babel Repl](https://babeljs.io/repl):
```js
"use strict";

/*#__PURE__*/
React.createElement("h1", {
  className: "greeting"
}, "Hello, world!");
```

```js
element = 
{
    "$$typeof": Symbol(react.element),
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {
        "className": "greeting",
        "children": "Hello, world!"
    },
    "_owner": null,
    "_store": {}
}
```

- ***Warning***: Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention
  instead of HTML attribute names.

For example, `class` becomes `className` in JSX, and `tabindex` becomes `tabIndex`.

- Child elements create new react.elements and are added to the `children` property of the resulting object.

## Rendering Elements

- React elements are simple object that are easy to create.   ReactDOM takes care of updating the actual DOM.


- Don't confuse elements with components. Elements are the atoms in React. Components are composed of elements (and more
  presumably).


- There should be an element in the DOM identified for React to manage.


```html
<!- HTML ->
<div id="root"></div>
```

```js
/* JavaScipt */
const container = document.getElementById('squirrel_root');
const root = createRoot(container);

const element = <h1>Hello, world</h1>;
root.render(element);
```

- React elements are immutable.  Elements and their children cannot be updated.

This is a brute force example of a ticking clock. In practice, you would not do it this way but would instead use a
stateful component. See next section.

```js
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

- ReactDOM tracks the changes across all of the elements and updates the actual DOM with only the necessary changes.

Check the ticking clock example in the developer tools. Even though the code updates the whole React element every time,
you'll see that only the relevant text content changes, the reset of the DOM is not affected.

## Components and Props

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

[Detailed component API](https://reactjs.org/docs/react-component.html)

- Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React
  elements describing what should appear on the screen.


- The simplest way to create a React Component is as a function.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- Elements can represent components.

Attributes and children are passed to the component as props.

```js
const element = <Welcome name="Sara" />;
```

- ***Note: Always start component names with a capital letter.***

React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag,
but `<Welcome />` represents a component and requires Welcome to be in scope.


- Components are typically composed of other components. This is kind of obvious given that the root React component is
  composed of all the other components.


- A greenfield application in React would typically start that the top level root component `App`. But when integrating
  into an existing app It's common to start with a single component, like a button, and work bottom up.


- Extract components made up of compound elements into smaller components and build up into a composite component.

***Hint:*** If more than one element in a Component uses different data to an other this is a prime code-smell that
these should be two different components.

- ***Warning: All React components must act like pure functions with respect to their props.***

## State and Lifecycle of a Component

[Detailed Component API](https://reactjs.org/docs/react-component.html)

Components hold an encapuslated state. This is handled differently for Class components and function components. Class
components use lifecycle methods, function components use Hooks and `useState`.

See [Hooks Reference](https://reactjs.org/docs/hooks-intro.html) for more details.

Components can choose to pass state data down to child components via props.  This is referred to the top-down data flow.

Only the components themselves know if they are stateful or not.

Mounting and Unmounting of components are used to instantiate and tear down resources for the component.  This ensures
that resources, like memory and timers, are freed whenever the component is destroyed.

`componentDidMount()`, `componentDidUpdate` and `componentWillUnmount()` are lifecycle methods. The `useEffect()` hook
is the comparable functional method.

Only use `this.state.foo` in the constructor.  Updates should always use setState({ foo: '' }).

React may batch multiple setState() calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the
next state.

When you call `useEffect()`, you’re telling React to run your “effect” function after flushing changes to the DOM. I.e.
after every render, including the first.

If `useEffect()` returns a function, then it will be called on unmount when the component is destroyed.

You can have more than one call to `useEffect()`. This may help you seperate functional concerns more clearly in your
component.

Install the Hooks linter:

```shell
npm install eslint-plugin-react-hooks --save-dev
```

## Handling Events

- React events are named using camelCase, rather than lowercase.


- With JSX you pass a function as the event handler, rather than a string.

Another difference is that you cannot return false to prevent default behavior in React. You must call preventDefault
explicitly.

```html
<!- In HTML ->
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

```js
/* In React */
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
          </form>
  );
}
```

Here, `e` is a synthetic event. React defines these synthetic events according to the W3C spec, so you don’t need to worry
about cross-browser compatibility. React events do not work exactly the same as native events. See the [SyntheticEvent
reference guide](https://reactjs.org/docs/events.html) to learn more.


## Conditional Rendering


## [Hooks](https://reactjs.org/docs/hooks-reference.html)

### State Hook

`useState` returns a pair: the current state value and a function that lets you update it. You can declare multiple
state variables.

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

The array destructuring syntax lets us give different names to the state variables we declared by calling useState.

Hooks are functions that let you “hook into” React state and lifecycle features from function components.

You can create your own Hooks to reuse stateful behavior between different components.

There are many [Built-in hooks](https://reactjs.org/docs/hooks-reference.html)

### Effect Hook

`useEffect` adds the ability to perform side effects from a function component.   

When you call `useEffect`, you’re telling React to run your “effect” function after flushing changes to the DOM. I.e.
React runs the effects after every render.

Effects may also optionally specify how to “clean up” after them by returning a function.  This function will run when the component unmounts.



