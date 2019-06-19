import { IReducerAction } from "./reducer";
import { IDependencyBoardItem } from "./IDependencyBoardState";

 
export function setItems(items: IDependencyBoardItem[]): IReducerAction {
    return {
        type: 'set-items',
        payload: items
    }
}

export function createDependency(id: number, dependsOn: number): IReducerAction {
    return {
        type: "create-dependency",
        payload: {
            id, 
            dependsOn
        }
    };
}

export function removeDependency(id: number, dependencyToRemove: number): IReducerAction {
    return {
        type: "remove-dependency",
         payload: {
            id, 
            dependencyToRemove
        }
    }
}

export function moveItem(id: number, team: number, iteration: number): IReducerAction {
    return {
        type: 'move-item', 
        payload: {
            id,
            team,
            iteration
        }
    };
}