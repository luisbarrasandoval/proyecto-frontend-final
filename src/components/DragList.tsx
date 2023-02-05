import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { useTheme } from "@mui/material";

const DragDropContextContainer = styled.div`
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 8px;
`;

const removeFromList = (list: any[], index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: any[], index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

export interface DragListProps {
  devices: any[]
}

function DragList({ devices }: DragListProps) {
  const [elements, setElements] = React.useState(devices);
  const [ lists, setLists ] = React.useState<any[]>(Object.keys(devices))
  const theme = useTheme()

  useEffect(() => {
    setElements(devices);
  }, [devices]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const droppableSourceId = result.source.droppableId as keyof typeof listCopy;
    const droppableDestinationId = result.destination.droppableId as keyof typeof listCopy;


    const sourceList = listCopy[droppableSourceId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    // @ts-ignore
    listCopy[droppableSourceId] = newSourceList;
    const destinationList = listCopy[droppableDestinationId];
    // @ts-ignore
    listCopy[droppableDestinationId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid style={{

          backgroundColor: theme.palette.background.default,
        }}>
          {lists.map((listKey) => (
            <DraggableElement
              // @ts-ignore
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
             
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default DragList;
