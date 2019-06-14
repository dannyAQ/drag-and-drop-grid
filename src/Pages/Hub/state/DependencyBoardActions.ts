import { IReducerAction } from "./reducer";
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

export function changeIteration(id: number, newIteration: number, team: string): IReducerAction {
    return {
        type: "change-iteration", 
        payload: {
            id, 
            newIteration, 
            team
        }
    }
}

export function changeTeam(id: number, newTeam: string): IReducerAction {

    return {
        type: 'change-team', 
        payload: {
            id,
            newTeam
        }
    }
}