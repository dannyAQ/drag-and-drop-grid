import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState'; 
import {IDependencyBoardItem} from './state/IDependencyBoardState';
import {Row} from './DependencyBoardRow'; 
import {Cell} from './DependencyBoardCell';
import {Item} from './DependencyBoardItem';
import {DependencyBoardConnector} from './DependencyBoardConnector'; 
import {setItems} from './state/DependencyBoardActions'; 

import {ElementConnectorProvider} from './ElementConnector'; 

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const initialState: IDependencyBoardItem[] = new Array(10).fill(0).map((_, i) => {
      return {
        id: i, 
        title: `This is item ${i}`, 
        iteration: Math.floor(Math.random() * 2),
        text: lorem,
        depends_on: [],
        belongs_to_team: `Team ${i % 2 ? 0 : 1}`,
        team_id: i % 2 ? 0 : 1,
        state: "Doing"
    };
});

// transforms a list of items to a table like array
function makeRows(list, sortOnKey: string) {
    const board = []; 
    let sorted = list.sort((a, b) => a[sortOnKey] - b[sortOnKey]); 
    sorted.forEach((item, i) => {
        const next = list[i + 1] ? list[i + 1] : {[sortOnKey]: null}
        if(item[sortOnKey] !== next[sortOnKey]) {
            const row = sorted.slice(0, i + 1); 
            board.push(row); 
            sorted = sorted.slice(i + 1, sorted.length); //remaining
        }
    });
    return board; 
}

export function DependencyBoard() {
    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 
    React.useEffect(() => dispatch(setItems(initialState)), []);
    const board = makeRows(dependencyBoardItems, 'team_id'); 
    return <Board board={board}/>
}


export function Board({board}) {
    const iterations = new Array(4).fill(0).map((_,i) => i);   
       return (
        <div id="board-root" style={{display: 'grid', position: 'relative'}}>
            <ElementConnectorProvider>
            {board.map((row, i) => {
                return (
                    <Row key={i}>
                        {/* <div style={{position: 'absolute', top: '50%', left: 0, transform: 'rotate(90deg)'}}>Team {row[0].team_id}</div> */}
                        {iterations.map(it => {
                             return (
                                <Cell key={it} iteration={it} team={row[0].team_id}>
                                    <h3 style={{position: 'absolute', top: 15, left: 15, margin: 0}}>
                                         Iteration {it}
                                     </h3>
                                    {row.map(item => (
                                        it === item.iteration ? <Item key={item.id} item={item}/> : null 
                                    ))}
                                </Cell>
                            );
                        })}
                    </Row>
                )
            })}
            </ElementConnectorProvider>
        </div>
    );
}

 
