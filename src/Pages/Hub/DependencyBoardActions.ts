import { IReducerAction } from "./IReducerAction";
import { IDependencyBoardItem } from "./IDependencyBoardState";


export function buildDependencyBoard(items: IDependencyBoardItem[]): IReducerAction {
    return {
        type: 'build-dependency-board',
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

export function changeStatus(id: number, newStatus: number): IReducerAction {
    return {
        type: "change-status", 
        payload: {
            id, 
            newStatus
        }
    }
}