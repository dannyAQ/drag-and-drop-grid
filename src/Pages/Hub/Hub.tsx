import * as React from "react";
import { showRootComponent } from "../../Common";
import { DragDropContextProvider } from 'react-dnd'; 
import HTML5Backend from 'react-dnd-html5-backend';
import { Page } from 'azure-devops-ui/Page';
import { Header } from 'azure-devops-ui/Header'; 
import { DependencyBoardStateProvider } from './state/useDependencyBoardState'; 
import * as SDK from "azure-devops-extension-sdk";
import { DependencyBoard } from './DependencyBoard'; 


import './Hub.scss'; 

function AzureDevopsExtension() {
  return (
      <Page>
          <Header title="Dependency board"/>
          <DragDropContextProvider backend={HTML5Backend}>
               <DependencyBoardStateProvider>
                  <DependencyBoard/>
               </DependencyBoardStateProvider>
           </DragDropContextProvider>
      </Page>
  ); 
}

showRootComponent(<AzureDevopsExtension />);
