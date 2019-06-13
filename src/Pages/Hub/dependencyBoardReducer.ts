import { IReducerAction } from './IReducerAction'; 
import { IDependencyBoardItem } from './IDependencyBoardState';
import { IDependencyBoardState } from './IDependencyBoardState'

export function dependencyBoardReducer(
    state,
    action: IReducerAction
) {
    const { type, payload } = action; 
    const { boardColumns, allItems } = state; 

    switch(type) {    
        case "build-dependency-board": {
            const boardCols = payload.reduce((cols, next) => {
                const toReturn = {...cols}; 
                if(cols[next.status]) 
                    toReturn[next.status] = [...toReturn[next.status], next]; 
                else 
                    toReturn[next.status] = [next]; 
            
                return toReturn
            },{});

            return {
                allItems: payload,
                boardColumns: boardCols
            }; 
        }

        case "create-dependency": {
            const { id, dependsOn } = payload; 
               const items = allItems.map(item => {
                if(item.id === id) {
                    // no duplicates 
                    if(!item.depends_on.some(val => val === dependsOn)) {
                        item.depends_on = [...item.depends_on, dependsOn]; 
                    }
                }
                return item; 
            })

             return {
                allItems: items, 
                boardColumns
            }; 
        }


        case "change-status": {
            const { id, newStatus } = payload; 

            const items = allItems.map(item => {
                if(item.id === id) {
                    item.status = newStatus; 
                }

                return item; 
            });

             return {
                boardColumns,
                allItems: items
            }
         }


        default: 
            return state; 
    }
}

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export const initialState: IDependencyBoardItem[] = new Array(10).fill(0).map((_, i) => ({
    id: i, 
    name: `Item ${i}`, 
    status: Math.floor(Math.random() * 3),
    text: lorem,
    depends_on: []
}));
