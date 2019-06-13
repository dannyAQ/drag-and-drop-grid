import * as React from "react";
import { showRootComponent } from "../../Common";
import { DragDropContextProvider, useDrag, useDrop } from 'react-dnd'; 
import HTML5Backend from 'react-dnd-html5-backend';
import { Page } from 'azure-devops-ui/Page';
import { Header } from 'azure-devops-ui/Header'; 
import { DependencyBoard } from './DependencyBoard';
import * as SDK from "azure-devops-extension-sdk";

function AzureDevopsExtension() {
  return (
      <Page>
          <Header title="Dependency board"/>
          <DragDropContextProvider backend={HTML5Backend}>
               <DependencyBoard/>
           </DragDropContextProvider>
      </Page>
  ); 
}

showRootComponent(<AzureDevopsExtension />);
