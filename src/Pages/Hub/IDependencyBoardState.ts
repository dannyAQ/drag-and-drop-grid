export interface IDependencyBoardState {
    allItems: IDependencyBoardItem[]; 
    boardColumns?: {};
}

export interface IColumn {
    status: IDependencyBoardItem;  
}

export interface IDependencyBoardItem {
    id: number; 
    name: string; 
    status: number; // @todo ska bytas till "iteration" (boardens x-axel)
    depends_on: number[];
    text: string; 
    //@todo - lägg till team
}
