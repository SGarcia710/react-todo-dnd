import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface IContainer {
  isDragging: boolean;
}

const Container = styled.div<IContainer>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

interface ITask {
  task: Task;
  index: number;
}

const Task = (props: ITask) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <Container
            // dragHandleProps needs to be setted to the part of the component that we want as the one that lets us to control it. In otherwords, right now the Container is going to be the draggable
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.task.content}
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
