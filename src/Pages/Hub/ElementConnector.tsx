import * as React from 'react'; 
import {jsPlumb, jsPlumbInstance} from 'jsplumb'; 
import { useDependencyBoardState } from './state/useDependencyBoardState';
import { useItemDependencies } from './useItemDependencies';


class ElementConnector {
    
    private instance: jsPlumbInstance = jsPlumb.getInstance({
        PaintStyle:{stroke:"#ff0000"},
        Container: 'board-root'
    }); 
 
    constructor(connections) {
        this.init(); 
        this.render(connections); 
    }
    
    private init() {
        this.instance.ready(() => {
            this.instance.importDefaults({
                Connector: ["Bezier", { curviness: 60 }],
                Anchors: ["Top", "Bottom", "Left", "Right"], 
                Endpoint:[ "Dot", { radius:5 } ],
                EndpointStyle : { fill: "#ff0000"},
                Anchor: ["Perimeter", { shape: "Triangle"}]
            });
        });
    }

    public render(connections) {
        this.instance.reset();
        connections.forEach(([source, targets]) => {
            targets.forEach(target => {        
                this.instance.connect({
                    source: document.getElementById(`board-item-${source}`), 
                    target: document.getElementById(`board-item-${target}`) 
                });
            });
        });
    }    
}


export function ElementConnectorProvider({children}) {
    const {dependencyBoardItems} = useDependencyBoardState(); 
    const itemsWithDependencies = useItemDependencies(); 
    const [connector, setConnector] = React.useState<ElementConnector>(null); 
    
    React.useEffect(() => {
        setConnector(new ElementConnector(itemsWithDependencies))
    },[]);
    
    React.useEffect(() => {
        if(connector) {
            connector.render(itemsWithDependencies); 
            console.log('rendered connections¨'); 
        }
    },[dependencyBoardItems, itemsWithDependencies]); 
 
     return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

 