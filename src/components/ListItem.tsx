import { Draggable } from "react-beautiful-dnd";
import { LoremIpsum } from "lorem-ipsum";
import { generateFromString } from "generate-avatar";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import Actuador from "./Actuador";

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border: 3px solid white;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  margin-bottom: 10px;
`;

const lorem = new LoremIpsum();

export interface ListItemProps {
  item: {
    id: string;
    content: string;
  };

  index: number;
}

const ListItem = ({ item, index }: ListItemProps) => {
  const randomHeader = useMemo(() => lorem.generateWords(5), []);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot as any}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Actuador
              id={""}
              name={"Prueba"}
              status={false}
              type=""
              lastAction="sin datos"
              description={"+56002112313232"}
              online={1}
              showButton={false}
              showOptions={false}
            />
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
