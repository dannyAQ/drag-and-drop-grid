import * as React from 'react'; 
import {reducer} from './reducer'; 

export const DependencyBoardContext = React.createContext<any>([]); 
 

export function DependencyBoardStateProvider({children}) {
    
    const [dependencyBoardItems, dispatch] = React.useReducer(reducer, []); 

    return (
        <DependencyBoardContext.Provider value={{dependencyBoardItems, dispatch}}>
            {children}
        </DependencyBoardContext.Provider>
    );
}

export const useDependencyBoardState = () => {
    const context = React.useContext(DependencyBoardContext);
    return context; 
}
 