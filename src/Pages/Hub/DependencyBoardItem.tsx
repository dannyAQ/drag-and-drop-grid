import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState'; 
import {createDependency} from './state/DependencyBoardActions'; 
import {useDrop, useDrag} from 'react-dnd';
import {Card} from 'azure-devops-ui/Card'; 

export function Item({item}) {

    const {dependencyBoardItems, dispatch} = useDependencyBoardState(); 

    const [{isDragging}, drag] = useDrag({
        item: { type: 'item', id: item.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
    console.log(isDragging)

    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true}),
        }),
        drop(dropped: any, monitor) {
            if(isOver) {
                dispatch(createDependency(dropped.id, item.id))
            }
        }
    })

    return (
        <div 
            ref={drop} 
            id={`board-item-${item.id}`} 
            className="dependency-board-item" 
            style={{
                background: isDragging ? 'black' : 'white'}}>
            <div 
                ref={drag} 
                style={{
                    background: isOver ? '#eff6fc' : 'white', 
                    margin: '20px 0'}}>
                <Card titleProps={{text: item.name}}>
                    <div>
                        Team {item.team_id}<br/>
                        Iteration: {item.iteration}<br/>
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
    )
}