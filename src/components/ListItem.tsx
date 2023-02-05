import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Actuador from "./Actuador";


const DragItem = styled.div`
  margin-bottom: 10px;
`;

export interface ListItemProps {
  item: {
    id: string;
    content: string;
  };

  index: number;
}

const ListItem = ({ item, index }: ListItemProps) => {


  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            // @ts-ignore
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Actuador
              id={item.id}
              name={item.name}
              status={item.parmas.gprs_answer.v.endsWith('0')}
              type=""
              lastAction="sin datos"
              description={item.phone}
              online={item.parmas.acc_trigger.v > 0}
              showButton={item.group === "Sin grupo"}
              showOptions={false}
            />
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
