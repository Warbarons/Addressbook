import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './ui/Navigation.jsx';
import rootReducer from './reducers/contacts'
import { loadState, saveState } from './LocalStorage';
import './App.css';

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
   saveState(store.getState());
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}

export default App;
