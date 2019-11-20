# redux-api-ipa

## Redux

### Immutability
- Mutable objects are objects whose state is allowed to change over time.
- Immutable objects can never change after it has been created.
  - Immutability makes mutation tracking easy to see if anything has changed.
  - Redux has a single immutable state tree (`store`) where all state changes are explicitly handled by dispatching `actions`.
  - Dispatched actions are processed by a `reducer` that accepts the previous state and the action and returns the next state of your app.

### Reducer
- Reducer functions take two arguments - the current `state` and `action` - and return a new state object.
  - (state, action) => newState
  ```js
  const initialState = 0;

  const reducer = (state) => {
    const newState = state + 1;
    return newState;
  };

  const newStateValue = reducer(initialState);
  console.log(initialState, newStateValue); // 0, 1
  ```
  - When component's state utilizes an object
  ```js
  const initialState = { count: 0 };

  const reducer = (state) => {
    return { count: state.count + 1}
  };

  const newStateValue = reducer(initialState);
  console.log(initialState, newStateValue); // { count: 0 }, { count: 1 }
  ```
- Reducer functions is a pure function without any side-effects.
  - Perfect fit for managing changes in state while maintaining the immutability we want in our components.
- The `action`, represented by an object, contains `properties`
  - Every action object is rquired to have a `type` property and the `type` allows the reducer to know what part of the state needs to change.
  - `payload` property acts like data. Reducer needs to have some data passed into it through actions to be able to update the state correctly.
  ```js
  const initialState = { name: 'Donald Duck' };

  const reducer = (state, payload) => {
    if (action.type == 'changeName') {
      return { name: action.payload }
    }
  };

  reduer(initialState, {type: 'changeName', payload: 'Mickey Mouse' }); // { name: 'Mickey Mouse' }
  ```
  - Reducer uses `switch` statement for better readablity.
  ```js
  const initialState = { count: 0 };

  const reducer = (state, action) => {
    switch(action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
  reducer(initialState, { type: 'increment' }); // { count: 1 }
  reducer(initialState, { type: 'decrement' }); // { count: -1 }

### `useReducer`
- The `useReducer` hooks is an alternative to `useState` and is preferable when you have a lot of state properties (more than 3) in a single component.
  - `useReducer` takes in a `reducer` function, as well as `,initialState` and returns both the current state and a dispatch method in an array like `useState`.
  - The `dispatch` allows us to combine the reducer function with the ability to maintain the state.
  ```js
  import React, { useReducer } from 'react';

  const initialState = { count: 0 };
  function reducer(state, action) {
    swith (action.type) {
      case 'Increase':
        return { count: state.count + 1 };
      case 'Decrease':
        return { count: state.count - 1 };
      default:
        return state;
    }
  };

  const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <div className="count">Count: {state.count}</div>
        <button onClick={() => dispatch({ type: 'Increase'})}>+1</button>
        <button onClick={() => dispatch({ type: 'Decrease'})}>-1</button>
      </>
    )
  }
  ```

### Reducer Todo Project
- Check this gitHub repository - [Reducer-todo](https://github.com/areumjo/reducer-todo/tree/areum-jo) 

### Redux
- Redux is a prdeictable state management library for JS app and the most popular state container for React app.
- Core concepts of Redux
  1. The Store : everything that changes within app is represented by a single JS `object` known as the store
  2. App state is immutable : never mutate/write the original object, instead clone, modify and replace the original state object with the new copy
  3. Pure functions change the state : reducer (pure function) take in state and payload and return a copy of state

### Redux Store - `createStore()`
- Install React-Redux : helper package that will enable us to string together Redux within a React app
```bash
yarn add react-redux redux
```
- `createStore` function from redux : will take in a single reducer that represents the state of app globally (`Index.js`)
- `reducer` function : returns an object representing state
```js
import { createStore } from 'redux';

function reducer() {
  return {
    title: 'Hello world! I\'m in the Redux store!',
  }
}

const store = createStore(reducer);

```
- `<Provider></Provider>` : import Provider from react-redux  and wrap App with `<Provider>` component and pass a `store` prop

### `connect()`
- Higher Order Component (HOC) : a function that takes a component and returns a new component whereas a component returns UI.
  - Connect our components to the store we made.
- `mapStateToProps` : build a helper function within the component files to tell the `connect`fn what pieces of state we want to access
  - It will map pieces of our Redux state to the props of our component.