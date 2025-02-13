import React, { useState } from "react";
import "./App.css";
import {GetBingo} from "./Bingo";
//import {StashHistoryTable} from "./StashHistoryTable"
import { Provider } from 'react-redux'
import store from './store.js'


function App() {

    return (
        <>
            <Provider store={store}>
            <div className="everything">
                    <h1 className="display-2">SGF Bingo</h1>
                <div className="bingo">
                    <GetBingo/>
                </div>
            </div>
            </Provider>
        </>
    );
}

export default App;
