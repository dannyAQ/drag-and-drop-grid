export interface IReducerAction {
    payload: any; 
    type: string; 
}

export function reducer(state, action: IReducerAction) {
    const {type, payload} = action; 
    switch(type) {
        
        case "set-items": {
            return payload;  
        }

        case "create-dependency": {
            const {id, dependsOn} = payload; 
            
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

        case "remove-dependency": {
            const {id, dependencyToRemove} = payload; 
             const items = state.map(item => {
                if(item.id === id && item.depends_on.length) {
                    item.depends_on = item.depends_on.filter(d => d !== dependencyToRemove);
                }
                return item; 
            });
            return items; 
        }

         case "move-item": {
             const {id, iteration, team} = payload;
             const items = state.map(item => {
                 if(item.id === id) {
                    item = {
                         ...item, 
                         iteration, 
                         belongs_to_team: `Team ${team}`,
                         team_id: team
                    };
                  }
                 return item; 
             }); 
             return items; 
         }
         
        default: 
            return state; 
    }
}