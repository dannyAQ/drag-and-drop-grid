import * as React from 'react'; 
import {useDrop} from 'react-dnd';

export function Row({children}) {
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
        drop(dropped: any) {}
    });

    return (
        <div style={{...styles, position: "relative"}}>
            {children}
        </div>
    )
}