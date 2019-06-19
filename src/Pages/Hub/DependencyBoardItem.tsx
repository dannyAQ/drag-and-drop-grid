import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState'; 
import {createDependency} from './state/DependencyBoardActions'; 
import {useDrop, useDrag} from 'react-dnd';
import {Card} from 'azure-devops-ui/Card'; 
import {Dialog} from 'azure-devops-ui/Dialog';

export function Item({item}) {

    const {dispatch} = useDependencyBoardState(); 
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

    const [{isDragging}, drag] = useDrag({
        item: { type: 'item', id: item.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
 
    const [{isOver}, drop] = useDrop({
        accept: 'item', 
        collect: (monitor) => ({
            isOver: monitor.isOver({shallow: true}),
        }),
        drop(dropped: any, monitor) {
            if(isOver && dropped.id !== item.id) {
                dispatch(createDependency(dropped.id, item.id))
            }
        }
    })

    return (
        <div 
            ref={drop} 
            id={`board-item-${item.id}`} 
            className="dependency-board-item" 
            style={{background: isDragging ? 'black' : 'white'}}>
            <div 
                ref={drag} 
                style={{
                    background: isOver ? '#eff6fc' : 'white', 
                    margin: '20px 0'}}>
                <Card className="item-card" titleProps={{text: item.name}}>
                    <div>
                        <div onClick={() => setIsExpanded(true)}>
                            <span style={{fontWeight: 'bold', marginRight: 5}}>
                                {item.id}
                            </span>
                            <span>
                                {item.title} 
                            </span>
                        </div>
                        <div style={{marginTop: 10, fontSize: 13}}>
                            <span style={{marginRight: 70, color: 'gray'}}>State</span>
                             {item.state}
                        </div>

                        {isExpanded ? (
                            <Dialog className="dependency-board-item--expanded" 
                                    titleProps={{ text: item.title }}
                                    escDismiss 
                                    footerButtonProps={[]}
                                    onDismiss={() => setIsExpanded(false)}>
                                {item.text}
                            </Dialog>
                        ) : null}
                    </div>
                </Card>
            </div>
        </div>
    );
}
