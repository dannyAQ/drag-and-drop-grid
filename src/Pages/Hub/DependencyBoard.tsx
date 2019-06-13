import * as React from 'react'; 
 import { IReducerAction } from './IReducerAction'; 
import { IDependencyBoardItem } from './IDependencyBoardState';
import { Item } from './BoardItem'; 
import { BoardColumn } from './BoardColumn'; 
import { dependencyBoardReducer, initialState} from './dependencyBoardReducer';
import { buildDependencyBoard } from './DependencyBoardActions';
import { Card } from 'azure-devops-ui/Card';
import './Hub.scss'; 

export function DependencyBoard() {
 
    const [{allItems, boardColumns}, dispatch] = React.useReducer( 
        dependencyBoardReducer, 
        {allItems: initialState, boardColumns: {}}
    ); 
 

    React.useEffect(() => {
        // rebuild dependency board everytime items are changed 
        dispatch(buildDependencyBoard(allItems));
    },[allItems]); 

    const renderItem = (item) => {
         return (
            <Item 
                item={item} 
                dispatch={dispatch}
            />
        );
    };
    
    const renderColsWithItems = () => {
        const numberOfCols = Object.keys(boardColumns).length; 
            return Object.keys(boardColumns).map(col => (
                <BoardColumn 
                    key={col}
                    column={parseInt(col)} 
                    totalNumberOfCols={numberOfCols} 
                    dispatch={dispatch}
                >
                    {boardColumns[col].map(item => renderItem(item))}                    
                </BoardColumn>
            ));
    }



    return (
        <section className="dependency-board">
            {renderColsWithItems()}

            <svg id="svg-root" width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
            </svg>
        </section>
     ) 

}