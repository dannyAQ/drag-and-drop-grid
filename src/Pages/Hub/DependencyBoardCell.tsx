import * as React from 'react'; 
import { useDependencyBoardState} from './state/useDependencyBoardState';
import {changeIteration} from './state/DependencyBoardActions'; 
import {useDrop} from 'react-dnd';

export function Cell({children, iteration, team}) {

    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 
    
    const styles = {
        padding: 10, 
        minWidth: 300,
        margin: "0 5px",
        minHeight: 100,
    }

    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true})
        }), 
        drop(dropped: any) {
            if(isOver) {
                const action = changeIteration(dropped.id, iteration, team); 
                dispatch(action); 
            }
         }
    });

    return (
        <div ref={drop} style={{...styles, background: isOver ? 'lightgreen' : '#f8f8f8', position: 'relative'}}>
            {children}
        </div>
    )
}