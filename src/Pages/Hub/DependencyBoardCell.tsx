import * as React from 'react'; 
import { useDependencyBoardState} from './state/useDependencyBoardState';
import {moveItem} from './state/DependencyBoardActions'; 
import {useDrop} from 'react-dnd';

export function Cell({children, iteration, team}) {

    const {dispatch} = useDependencyBoardState(); 
    
    const styles = {
        padding: 10, 
        minWidth: 300,
        margin: "0 5px",
        minHeight: 100,
        paddingTop: 30
    }

    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true})
        }), 
        drop(dropped: any) {
             if(isOver) {
                 dispatch(moveItem(dropped.id, team, iteration)); 
            }
         }
    });

    return (
        <div ref={drop} 
            style={{
                ...styles, 
                background: isOver ? '#dedede': '#f8f8f8', 
                position: 'relative'}}>
            {children}
        </div>
    )
}