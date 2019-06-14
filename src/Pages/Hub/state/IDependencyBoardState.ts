export interface IDependencyBoardState {
    allItems: IDependencyBoardItem[]; 
    boardColumns?: {};
}

 export interface IDependencyBoardItem {
    id: number; 
    name: string; 
    iteration: number;  
    depends_on: number[];
    text: string; 
    belongs_to_team: string; 
 }
