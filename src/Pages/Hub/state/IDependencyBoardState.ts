export interface IDependencyBoardState {
    items: IDependencyBoardItem[]; 
}


enum IItemStates {
    TODO = "ToDo", 
    DOING = "Doing", 
    DONE = "Done"
}

export interface IDependencyBoardItem {
    id: number; 
    title: string; 
    iteration: number;  
    depends_on: number[];
    text: string; 
    belongs_to_team: string;
    team_id: number;
    
    state?: IItemStates; 
    description?: string; 

 }
