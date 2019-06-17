import * as React from 'react'; 
 import {useDependencyBoardState} from './state/useDependencyBoardState'; 
import {IDependencyBoardItem} from './state/IDependencyBoardState';
import {Row} from './DependencyBoardRow'; 
import {Cell} from './DependencyBoardCell';
import {Item} from './DependencyBoardItem';
import {DependencyBoardConnector} from './DependencyBoardConnector'; 

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const initialState: IDependencyBoardItem[] = new Array(10).fill(0).map((_, i) => ({
    id: i, 
    name: `Item ${i}`, 
    iteration: Math.floor(Math.random() * 2),
    text: lorem,
    depends_on: [],
    belongs_to_team: `Team ${i % 2 ? 0 : 1}`,
    team_id: i % 2 ? 0 : 1
}));

export function DependencyBoard() {

    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 

    React.useEffect(() => {
        dispatch({type: 'set-items', payload: initialState});
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
                    <Row team={row[0].team_id} key={i} items={row}>
                        {iterations.map(it => {
                            return (
                                <Cell iteration={it} team={row[0].team_id}>
                                    <span style={{position: 'absolute', top: -25, left: 5}}>
                                        Iteration {it}
                                    </span>
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

 
