import React, { useState} from "react";
import { useDispatch } from "react-redux";
//import exampleUrl from '/bingos.txt?url';
import bingoFile from './assets/bingos.txt';
export function GetBingo() {
    const dispatch = useDispatch();
    const size = Math.min(window.innerHeight, window.innerWidth);

    //const boards = ["Smooth", "Monster", "Jetey", "Rifter", "Ardilla", "Strict", "Welt", "Baka", "Elijah", "Woody", "Blink", "Tehp"];
    const boards = ["Guild", "Smooth", "Monster", "Jetey", "Rifter", "Ardilla", "Strict", "Welt", "Tehp", "Elijah", "Turuu", "Lacuna", "Komodo", "Strk", "Blink"];

    const [boardName, setBoardName] = useState("");
    const [boardID, setBoardID] = useState(-1);
    const [squares, setSquares] = useState([]);

    

    function getTable(b) {
        for (let i = 0; i < boards.length; i++) {
            if (b === boards[i]) {
                setBoardID(i);
                printBoard(i);
                return
            } else {
                setBoardID(-1);
            }
        }
    }

    function printBoard(i) {
        fetch(bingoFile).then(response => response.text()).then(text => (
            setSquares(text.split("\n")[i].split(","))
        ));
    }

    function handleCell(e) {
        if (e.target.classList.contains("cellected")) {
            e.target.classList.remove("cellected");
        } else {
            e.target.classList.add("cellected");
        }
    }

    function handleBoardName(e) {
        const boardname = e.target.value;
        setBoardName(boardname);
        getTable(boardname);
    }


    function bingoBody() {
        var rows = [[], [], [], [], []];
        squares.map((item, index) => {
            let fontSize = '1rem';
            const textLength = item.length;
            if (textLength > 40) {
                fontSize = '0.8rem';
            } else if (textLength > 80) {
                fontSize = '0.6rem';
            } else if (textLength > 120) {
                fontSize = '0.4rem';
            } else if (textLength > 160) {
                fontSize = '0.2rem';
            }
            const cell = <td key="hello" style={{
                wordBreak: 'break-word',
                height: size * 5 / 40, width: size * 5 / 40,
            }}
                className="hoverCell">
                <div className="square-container">
                    <div
                        className={index == 12 ? "square-content middleCell" : "square-content"}
                        title={item} style={{ fontSize: fontSize }} onClick={(e) => handleCell(e)}>
                        {item}
                    </div>
                </div></td>
            rows[index % 5].push(cell);
        });
        const rowmap = rows.map((r) => {
            const row = <tr>{r}</tr>
            return row
        });
        return <>{rowmap}</>
    }
       

    return (
        <>
            <div>
                <h1 className="display-6">Available Boards:</h1>
                <p className="d-flex">
                    {/*{boards.map((b) => { return <div className="m-1">{b}</div> })}</p>*/}
                    {boards.map((b) => { return <button className="btn btn-danger m-1" type="submit" key={b} value={b} onClick={(e) => handleBoardName(e)}>{b}</button> })}</p>
            </div>
            {/*<div className="input-group m-4 w-25">
                <input type="text" className="form-control" placeholder="Board Name" aria-label="Board Name" aria-describedby="basic-addon2" onChange={(e) => handleBoardName(e)}></input>
                    <div className="input-group-append">
                    <button className="btn btn-danger" type="submit" onClick={(e) => handleSearch(e)}>Get Board</button>
                    </div>
            </div>*/}
            {boardID >= 0 ? 
                <div className="container">
                    <table className="table table-responsive table-bordered"
                        style={size > 1000 ?
                            { height: size, width: size } : { height: size, width: size }}                    >
                        <tbody>
                            {bingoBody()}
                        </tbody>
                    </table>
                </div> : <></>}

        </>
    );
}