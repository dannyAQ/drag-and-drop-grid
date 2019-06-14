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
    belongs_to_team: `Team ${i % 2 ? 0 : 1}`
}));

export function DependencyBoard() {

    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 

    React.useEffect(() => {
        dispatch({type: 'set-items', payload: initialState});
    },[]);
 
    const board = dependencyBoardItems.reduce((all: any, next: any) => {
        const toReturn = {...all}; 
        if(toReturn[next.belongs_to_team]) 
            toReturn[next.belongs_to_team] = [...toReturn[next.belongs_to_team], next]; 
         else 
            toReturn[next.belongs_to_team] = [next]; 
        
        return toReturn
    },{});
    
    return <Board board={board}/>
}

export function Board({board}) {
    const iterations = new Array(4).fill(0).map((_,i) => i); 
     return (
        <div style={{display: 'grid', position: 'relative'}}>
            <DependencyBoardConnector/>
            {Object.keys(board).map((team,i) => {
                return(
                    <Row team={team} key={team}>
                        {iterations.map(it => {
                            return (
                            <Cell iteration={it} team={team}>
                                <span style={{position: 'absolute', top: -25, left: 5}}>
                                Iteration {it}
                                </span>
                                {board[team].map(item => (
                                    it === item.iteration ? <Item item={item}/> : null 
                                ))}
                            </Cell>
                            )
                        })}
                    </Row>
                )
            })}
        </div>
    )
}

 
