import * as SDK from "azure-devops-extension-sdk";
import * as React from "react";
import { showRootComponent } from "../../Common";
import * as ReactGridLayout from "react-grid-layout";
import { Card } from "azure-devops-ui/Card";

var statuses: string[] = ["backlog", "doing", "done"];

type GridItemId = string;

interface IGridItem {
  name: string;
  status: number;
  id: string;

  depends_on?: GridItemId;
  is_dependent_on?: GridItemId;
}

interface IGridState {
  items: IGridItem[];
}

interface IGridItemLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

class Board extends React.Component<{}, IGridState> {

  state = {
    items: initialItems,
  };

  public async componentDidMount() {
    const initation = await SDK.init();
    console.log(initation); 
  }

  createGridLayout = (): IGridItemLayout[] => {
    const { items } = this.state;
    return items.map((item, i) => {
      return {
        i: item.id,
        x: item.status,
        y: i,
        w: 1,
        h: 4
      };
    });
  };

  handleDragAndDrop = (allItems, startDestination, targetDestination) => {
    const { items } = this.state;
    const { i: id } = startDestination;
    const currenStatus = startDestination.x;
    const targetStatus = targetDestination.x;

    const modifiedItems = items.map(item => {
      if (item.id === id) {
        const newItem = { ...item, status: targetStatus };
        return newItem;
      }
      return item;
    });
    this.setState({ items: modifiedItems });
  };



  renderItems = () => {
    const { items } = this.state;

    return items.map((item, i) => {
      return (
        <div key={item.id}>
          <Card
            onRenderContent={() => (
              <>
                {item.name}
                <br />
                Status: {statuses[item.status]}
              </>
            )}
          />
        </div>
      );
    });
  };

  public render(): JSX.Element | string {
    var layout = this.createGridLayout();

    return (
      <div >
        <ReactGridLayout
          className="grid"
          onDragStop={this.handleDragAndDrop}
          layout={layout}
          cols={3}
          rowHeight={10}
          width={500}
          compactType={"vertical"}
        >
          {this.renderItems()}
        </ReactGridLayout>
      </div>
    );
  }
}

const initialItems: IGridItem[] = new Array(10).fill(0).map((_, i) => {
  const gridItem: IGridItem = {
    name: "Item " + i,
    status: Math.floor(Math.random() * 3),
    id: i.toString()
  };

  return gridItem;
});

showRootComponent(<Board />);
