import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'skyblue' : 'inherit'};

  flex-grow: 1;

  min-height: 100px;
`;

interface IColumn {
  column: Column;
  tasks: Task[];
  // isDropDisabled: boolean;
  index: number;
}

const Column = (props: IColumn) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{props.column.title}</Title>

            <Droppable
              // type={props.column.id === 'column-3' ? 'done' : 'active'}
              // isDropDisabled={props.isDropDisabled}
              droppableId={props.column.id}
              type="task"
            >
              {(provided, snapshot) => (
                <TaskList
                  isDraggingOver={snapshot.isDraggingOver}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {props.tasks.map((task, index) => (
                    <Task index={index} key={task.id} task={task} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Column;
