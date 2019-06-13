// import * as React from 'react'; 
// import { IDependencyBoardState } from './IDependencyBoardState';
// import { initialState } from './DependencyBoard';
// import { IReducerAction } from './IReducerAction';

// interface IContext {
//     dispatch: Function;
//     boardColumns: any;
// } 


// export const DependencyBoardContext = React.createContext({}); 

// function reducer(state, action: IReducerAction) {
//     const { type, payload } = action; 
//     switch(type) {
        
//         case "build-dependency-board": {
//               return payload.reduce((cols, next) => {
//                 const toReturn = {...cols}; 
//                 if(cols[next.status]) 
//                     toReturn[next.status] = [...toReturn[next.status], next]; 
//                  else 
//                     toReturn[next.status] = [next]; 
                
//                 return toReturn; 
//             },{});
//         }

//         case "create-dependency": {

//         }


//         default: 
//             return state; 
//     }
// }

 

// export function DependencyBoardStateProvider({children}) {
    
//     const [boardColumns, dispatch] = React.useReducer(reducer, {}); 

//     return (
//         <DependencyBoardContext.Provider value={{boardColumns, dispatch}}>
//             {children}
//         </DependencyBoardContext.Provider>
//     ) 
// }

// export const useDependencyBoardState = () => {
//     const context = React.useContext(DependencyBoardContext);
//     return context; 
// }
 