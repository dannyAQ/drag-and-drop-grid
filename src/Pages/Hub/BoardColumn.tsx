import * as React from 'react'; 
import { useDrop } from 'react-dnd'; 
import { changeStatus } from './DependencyBoardActions'; 

export function BoardColumn({column, totalNumberOfCols, children, dispatch}) {

    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true})
        }), 
        drop(dropped: {id: number, type: string}) {
            if(isOver) {
                const action = changeStatus(dropped.id, column); 
                dispatch(action); 
            }
        }
    });

    return (
        <div 
            ref={drop} 
            style={{
                width: 700 / totalNumberOfCols, 
                boxSizing: 'border-box', 
                background: isOver ? 'lightgray' : 'transparent', 
                zIndex: 1
            }}
        >
            {children}
        </div>
    );  
}