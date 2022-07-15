# Technologies

## PubSub

[PubSubJs](https://www.npmjs.com/package/pubsub-js)\
[PubSubJS, Github](https://github.com/mroderick/PubSubJS)

## Immer

[Immer](https://immerjs.github.io/immer)\
[Immer - npmjs](https://www.npmjs.com/package/immer)


Exposes a single function that performs all the heavy lifting.

Immer also supports [JSON Patches](https://jsonpatch.com/).  This could be very useful in Undo/Redo as well as transmission
of small incremental changes.  E.g. event sourcing, distribution over websockets, etc.

```js
produce(baseState, recipe: (draftState) => void): nextState
```

`produce` takes a base state, and a recipe that can be used to perform all the desired mutations on the `draft` that is
passed in. The interesting thing about Immer is that the `baseState` will be untouched, but the `nextState` will reflect all
changes made to `draftState`.

## Terminology
`(base)state`: the immutable state passed to produce \
`recipe`: the second argument of produce, that captures how the base state should be "mutated". \
`draft`: the first argument of any recipe, which is a proxy to the original base state that can be safely mutated. \
`producer`: A function that uses produce and is generally of the form (baseState, ...arguments) => resultState \

***Note***: that it isn't strictly necessary to name the first argument of the recipe draft. You can name it anything
you want, for example users. Using draft as a name is just a convention to signal: "mutation is OK here".

In general, one can replace the current state by just returning a new value from the producer, rather than modifying the
draft. 

[Inline Shortcuts using `void`](https://immerjs.github.io/immer/return/#inline-shortcuts-using-void)


```js
// Single mutation
produce(draft => void (draft.user.age += 1))

// Multiple mutations
produce(draft => void ((draft.user.age += 1), (draft.user.height = 186)))

// As Opposed to...

// Single mutation
produce(draft => { draft.user.age += 1 } )

// Multiple mutations
produce(draft => { (draft.user.age += 1), (draft.user.height = 186) } )
```
