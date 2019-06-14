import * as React from 'react'; 
import {useItemDependencies} from './useItemDependencies'; 

interface IVec {
    fromX: number; 
    fromY: number;
    toX: number; 
    toY: number;  
}

export function DependencyBoardConnector() {
    const dependencies = useItemDependencies(); 
    const [dependencyVectors, setDependencyVectors] = React.useState<IVec[]>([])
  
    const collectDependencyVectors = () => {
          const vecs = dependencies.map(([id, dependsOn]) => {        
            const $el = document.getElementById(`board-item-${id}`);
            const deps = dependsOn.map(i => {
                const $dependsOn = document.getElementById(`board-item-${i}`);
                const toBbox = $dependsOn.getBoundingClientRect(); 

                return {
                    toX: toBbox.left, toY: toBbox.top
                };
            });
            const fromBbox = $el.getBoundingClientRect(); 
            return {
                fromX: fromBbox.left, fromY: fromBbox.top,
                deps
            }; 
        });
      setDependencyVectors(vecs); 
    }

    const renderDependencyVectors = () => {
        return dependencyVectors.map((deps: any, i) => {
             return  (
                deps.deps.map(vec => (
                    <React.Fragment key={i.toString()}>
                        <circle cx={deps.fromX} cy={deps.fromY} r="4" fill="red"/>
                        <line
                            x1={`${deps.fromX}`} 
                            y1={deps.fromY} 
                            x2={vec.toX} 
                            y2={vec.toY} 
                            style={{stroke: "rgb(255,0,0)", strokeWidth: 2, width: 20}} />
                        <circle cx={vec.toX} cy={vec.toY} r="4" fill="red"/>                
                    </React.Fragment>
                ))
            );
        });
    };

    React.useEffect(() => {

    },[])
  
    React.useEffect(() => {
        collectDependencyVectors();
        const events = ['resize', 'scroll', 'mousewheel', 'wheel'];
        events.forEach(e => window.addEventListener(e, collectDependencyVectors)); 
        return () => events.forEach(e => window.removeEventListener(e, collectDependencyVectors)); 
    },[dependencies]);

   
    return (
        <svg 
            width="100%" 
            height="100%" 
            style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}
        >
            {renderDependencyVectors()}
        </svg>
    )
  }
