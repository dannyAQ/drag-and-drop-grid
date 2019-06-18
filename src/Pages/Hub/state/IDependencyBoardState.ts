export interface IDependencyBoardState {
    items: IDependencyBoardItem[]; 
}

 export interface IDependencyBoardItem {
    id: number; 
    name: string; 
    iteration: number;  
    depends_on: number[];
    text: string; 
    belongs_to_team: string;
    team_id: number; 
 }

 export class DependencyBoardItem implements IDependencyBoardItem {
     constructor(
        public id: number, 
        public name: string, 
        public iteration: number,  
        public depends_on: number[],
        public text: string, 
        public belongs_to_team: string,
        public team_id: number, 
     ) {}
 }
