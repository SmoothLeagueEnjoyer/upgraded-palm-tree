import React, { useState} from "react";
import { useDispatch } from "react-redux";
//import exampleUrl from '/bingos.txt?url';
import bingoFile from './assets/bingos.txt';
import accountFile from './assets/members.txt';
import Button from 'react-bootstrap/Button';

export function GetBingo() {
    const dispatch = useDispatch();
    const size = Math.min(window.innerHeight, window.innerWidth);

    //const boards = ["Smooth", "Monster", "Jetey", "Rifter", "Ardilla", "Strict", "Welt", "Baka", "Elijah", "Woody", "Blink", "Tehp"];
    //const boards = ["Guild", "Smooth", "Monster", "Jetey", "Rifter", "Ardilla", "Strict", "Welt", "Tehp", "Elijah", "Turuu", "Lacuna", "Komodo", "Strk", "Blink"];
    const boards = ["Example 1", "Example 2",];

    const [boardID, setBoardID] = useState(-1);
    const [squares, setSquares] = useState([]);

    const [name, setName] = useState('');
    const [account, setAccount] = useState('');

    

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
        getTable(boardname);
    }

    function example1(e) {
        setAccount("Example 1");
        getTable("Example 1");
    }

    function example2(e) {
        setAccount("Example 2");
        getTable("Example 2");
    }

    function accountSearch(account) {
        //console.log(account);
        fetch(accountFile).then(response => response.text()).then(text => {
            const lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                //console.log(lines[i]);
                if (lines[i].startsWith(account)) {
                    setAccount(lines[i]);
                    setBoardID(i);
                    printBoard(i);
                    break;
                }
            }

        }
        );
        setAccount("\""+account+"\"" +" not found")
    }

    const handleSearch = (e) => {
        e.preventDefault();
        accountSearch(name);
    }


    function bingoBody() {
        var rows = [[], [], [], [], []];
        squares.map((item, index) => {
            let fontSize = '16px';
            const textLength = item.length;
            if (textLength > 40) {
                fontSize = '12px';
            } else if (textLength > 50) {
                fontSize = '10px';
            } else if (textLength > 60) {
                fontSize = '8px';
            } else if (textLength > 70) {
                fontSize = '6px';
            } else if (textLength > 80) {
                fontSize = '5px';
            } else if (textLength > 90) {
                fontSize = '4px';
            } else if (textLength > 100) {
                fontSize = '3px';
            } else if (textLength > 120) {
                fontSize = '2px';
            }
            const cell = <td key={index} style={{
                wordBreak: 'break-word',
                height: size * 4 / 40, width: size * 4 / 40,
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
        return <>
            <tr className="border-0">
                <td style={{ height: size * 4 / 40, width: size * 4 / 40 }} className="sane border-0">S
                </td>
                <td style={{ height: size * 4 / 40, width: size * 4 / 40 }} className="sane border-0">A
                </td>
                <td style={{ height: size * 4 / 40, width: size * 4 / 40 }} className="sane border-0">N
                </td>
                <td style={{ height: size * 4 / 40, width: size * 4 / 40 }} className="sane border-0">E
                </td>
                <td style={{ height: size * 4 / 40, width: size * 4 / 40 }} className="sane border-0">?
                </td>
            </tr>
                {rowmap}
            </>
    }
       

    return (
        <>
            <div>
                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Example buttons">
                    <Button className="btn btn-danger m-1" onClick={(e) => example1(e)}>Example 1</Button>
                    <Button className="btn btn-danger m-1" onClick={(e) => example2(e)}>Example 2</Button>
                    <form className="input-group mx-2" onSubmit={handleSearch}>
                        <input type="text" className="form-control" placeholder="Account name" aria-label="Account name" onChange={(e) => setName(e.target.value)} value={name} />
                        <Button className="btn btn-danger" type="submit">Get board</Button>
                    </form>
                </div>
                <div><small>Search is case sensitive.</small></div>{account ? <div>Board: { account }</div> : <div>No account found or selected.</div>}
            </div>
            {boardID >= 0 ? 
                <div className="container">
                    <table className="table table-responsive table-bordered"
                        style={size > 1000 ?
                            { height: size * 4 / 5, width: size * 4 / 5 } : { height: size * 4 / 5, width: size * 4 / 5 }}                    >
                        <tbody>
                            {bingoBody()}
                        </tbody>
                    </table>
                </div> : <></>}

        </>
    );
}