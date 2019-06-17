export interface IReducerAction {
    payload: any; 
    type: string; 
}

export function reducer(state, action: IReducerAction) {
    const { type, payload } = action; 
    switch(type) {
        
        case "set-items": {
            return payload;  
        }

        case "create-dependency": {
            const { id, dependsOn } = payload; 
            
            if(id === dependsOn) {
                return state; 
            }

            const items = state.map(item => {
                if(item.id === id) {
                    // no duplicates 
                    if(!item.depends_on.some(val => val === dependsOn)) {
                        item.depends_on = [...item.depends_on, dependsOn]; 
                    }
                }
                return item; 
            }); 
            
            return items;
        }

        case "change-team": {
            const { id, newTeam } = payload; 
            const items = state.map(item => {
                if(item.id === id) {
                    item.team_id = newTeam; 
                }
                return item; 
            }); 
            return items;
        }
        
        case "change-iteration": {
            const { id, newIteration, team } = payload; 
             const items = state.map(item => {
                if(item.id === id) {
                     item.iteration = newIteration; 
                    if(team !== item.team_id) {
                        item.team_id = team; 
                    }
                }
                return item; 
            });
            return items;
         }
         
        default: 
            return state; 
    }
}