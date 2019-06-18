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
              const OFFSET_X = window.pageXOffset;  
              const OFFSET_Y = window.pageYOffset;        
      
              const $el = document.getElementById(`board-item-${id}`);
              const fromBbox = $el.getBoundingClientRect(); 
              const deps = dependsOn.map(i => {
                    const $dependsOn = document.getElementById(`board-item-${i}`);
                    const toBbox = $dependsOn.getBoundingClientRect(); 
                    return {
                        x: toBbox.left + OFFSET_X, 
                        y: toBbox.top + OFFSET_Y, 
                        width: toBbox.width, 
                        height: toBbox.height
                    };
                });
            return {
                x: fromBbox.left + OFFSET_X, 
                y: fromBbox.top + OFFSET_Y,
                height: fromBbox.height, 
                width: fromBbox.width, 
                deps, 
                id
            }; 
        });
      setDependencyVectors(vecs); 
    }

    const findClosestSide = () => {
        
    }

    const renderDependencyVectors = () => {
        return dependencyVectors.map((deps: any, i) => {
             return  (
                deps.deps.map(vec => {
                    const ourX = vec.x, 
                          ourY = vec.y,
                          ourWidth = vec.width, 
                          ourHeight = vec.height, 
                          theirX = deps.x, 
                          theirY = deps.y, 
                          theirHeight = deps.height, 
                          theirWidth = deps.width; 
                    let coords = {fromX: null, fromY: null, toX: null, toY: null};

                    if(ourX === theirX) {
                        // ours is over
                        if(ourY > theirY) {
                            coords.fromX = ourX; 
                            coords.fromY = ourY; 
                            coords.toX = theirX; 
                            coords.toY = theirY; 
                        } else { // ours is below 
                            coords.fromX = ourX; 
                            coords.fromY = ourY; 
                            coords.toX = theirX; 
                            coords.toY = theirY; 
                        }
                    } else if(ourX < theirX) {
                        coords.fromX = ourX + ourWidth; 
                        coords.fromY = ourY; 
                        coords.toX = theirX; 
                        coords.toY = theirY; 
                    } else {
                        coords.fromX = ourX; 
                        coords.fromY = ourY; 
                        coords.toX = theirX + theirWidth; 
                        coords.toY = theirY; 
                    }
                      
                    return (
                        <React.Fragment key={vec.id}>
                            <circle onClick={() => console.log('clicked')} cx={coords.fromX} cy={coords.fromY} r="7" fill="red"/>                
                            <line
                                x1={coords.fromX} 
                                y1={coords.fromY} 
                                x2={`${coords.toX}`} 
                                y2={coords.toY} 
                                style={{stroke: "rgb(255,0,0)", strokeWidth: 2, width: 20}} />
                            <circle onClick={() => console.log('clicked')} cx={coords.toX} cy={coords.toY} r="7" fill="red"/>
                        </React.Fragment>
                    )
                })
            );
        });
    };

    
    React.useEffect(() => {
        collectDependencyVectors();
        window.addEventListener('resize', collectDependencyVectors); 
        return () => window.removeEventListener('resize', collectDependencyVectors); 
    },[dependencies]);

   
    return (
        <svg 
            width="100%" 
            height="100%" 
            style={{position: 'absolute', top: 0, left: 0, zIndex: 1}}>
            {renderDependencyVectors()}
        </svg>
    )
  }
