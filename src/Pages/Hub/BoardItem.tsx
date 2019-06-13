import * as React from 'react'; 
import { useDrop, useDrag } from 'react-dnd';
import { Card } from 'azure-devops-ui/Card';
import { createDependency } from './DependencyBoardActions';


interface Change_this_variable_name {
    type: string; 
    id: number; 
}

export function Item({item, dispatch}) {
    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }), 
        drop(dropped: Change_this_variable_name, monitor) {
            if(dropped.id !== item.id) {
                const action = createDependency(dropped.id, item.id); 
                dispatch(action); 
            }
        }
    });
    const [dragProps, drag] = useDrag({
        item: { type: 'item', id: item.id }
    }); 

    return (
        <div
            id={`board-item-${item.id}`}
            ref={drop} 
            style={{background: isOver ? 'lightgray' : 'transparent'}}
        >
            <div 
                ref={drag} 
                style={{padding: 10}}
            >
                <Card titleProps={{text: item.name}}>
                    <div>
                        {item.text} 
                        <br/>
                        {item.depends_on.length > 0 ? (
                            <div>
                                <small style={{display: 'block', marginTop: 10}}>
                                    Depends on: {" "} {item.depends_on.map(dependsOn => dependsOn) + ', '}
                                 </small>
                            </div>
                        ) : null} 
                    </div>
                </Card>
            </div>
        </div>
    );
}
 

