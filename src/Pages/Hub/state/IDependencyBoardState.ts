export interface IDependencyBoardState {
    items: IDependencyBoardItem[]; 
}

 
export interface IDependencyBoardItem {
    id: number; 
    title: string; 
    iteration: number;  
    depends_on: number[];
    text: string; 
    belongs_to_team: string;
    team_id: number;
    
    state?: string; 
    description?: string; 

 }
