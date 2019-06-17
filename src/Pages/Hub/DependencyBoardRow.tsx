import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState';
import {changeTeam, moveItem} from './state/DependencyBoardActions'; 
import {useDrop} from 'react-dnd';

export function Row({children, team, items}) {

    const {dispatch} = useDependencyBoardState(); 

    const numberOfCels = children.length; 
     const styles = {
        width: '100%', 
        padding: 10,
        display: 'grid', 
        gridTemplateColumns: `repeat(${numberOfCels},1fr)`,
        minHeight: 300,
        paddingLeft: 30,
        paddingTop: 30,
        margin: '5px 0'
    }; 

    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true})
        }), 
        drop(dropped: any) {
            if(isOver) {
                const action = changeTeam(dropped.id, team); 
                dispatch(action); 
            }
        }
    });

    return (
        <div ref={drop} style={{...styles, position: "relative"}}>
            <div style={{position: 'absolute', top: '50%', left: 0, transform: 'rotate(90deg)'}}>Team {team}</div>
            {children}
        </div>
    )
}