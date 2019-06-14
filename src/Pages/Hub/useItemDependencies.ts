import * as React from 'react'; 
import {useDependencyBoardState} from './state/useDependencyBoardState'

export const useItemDependencies = () => {
    const {dependencyBoardItems} = useDependencyBoardState(); 
    const [deps, setDeps] = React.useState(dependencyBoardItems)

    React.useEffect(() => {
        const d = dependencyBoardItems
            .filter(item => item.depends_on.length)
            .map(item => {
                 return [item.id, item.depends_on]
            });
        
        setDeps(d); 
    },[dependencyBoardItems])
    return deps;  
};

