import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState'; 
import {IDependencyBoardItem} from './state/IDependencyBoardState';
import {Row} from './DependencyBoardRow'; 
import {Cell} from './DependencyBoardCell';
import {Item} from './DependencyBoardItem';
import {DependencyBoardConnector} from './DependencyBoardConnector'; 
import {setItems} from './state/DependencyBoardActions'; 

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const initialState: IDependencyBoardItem[] = new Array(10).fill(0).map((_, i) => {
      return {
        id: i, 
        name: `Item ${i}`, 
        iteration: Math.floor(Math.random() * 2),
        text: lorem,
        depends_on: [],
        belongs_to_team: `Team ${i % 2 ? 0 : 1}`,
        team_id: i % 2 ? 0 : 1
    };
});

export function DependencyBoard() {

    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 

    React.useEffect(() => {
        dispatch(setItems(initialState));
    },[]);

    const board = []; 
    let sorted = dependencyBoardItems.sort((a, b) => a.team_id - b.team_id); 
    sorted.forEach((item, i) => {
        const next = dependencyBoardItems[i + 1] ? dependencyBoardItems[i + 1] : {team_id: null}
        if(item.team_id !== next.team_id) {
            const row = sorted.slice(0, i + 1); 
            board.push(row); 
            sorted = sorted.slice(i + 1, sorted.length); //remaining
        }
    });
    return <Board board={board}/>
}


export function Board({board}) {
    const iterations = new Array(4).fill(0).map((_,i) => i);   
       return (
        <div style={{display: 'grid', position: 'relative'}}>
            <DependencyBoardConnector/>
            {board.map((row, i) => {
                return (
                    <Row key={i}>
                        {/* <div style={{position: 'absolute', top: '50%', left: 0, transform: 'rotate(90deg)'}}>Team {row[0].team_id}</div> */}
                        {iterations.map(it => {
                             return (
                                <Cell iteration={it} team={row[0].team_id}>
                                    <h3 style={{position: 'absolute', top: 15, left: 15, margin: 0}}>
                                         Iteration {it}
                                     </h3>
                                    {row.map(item => (
                                        it === item.iteration ? <Item item={item}/> : null 
                                    ))}
                                </Cell>
                            );
                        })}
                    </Row>
                )
            })}
        </div>
    );
}

 
