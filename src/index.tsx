import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './Components/Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Kanban = () => {
  const [state, setState] = useState(initialData);

  const onDragStart = (start: DragStart) => {};

  const onDragUpdate = (update: DragUpdate) => {};

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // We check if we are not dropping the item into a non valid area
    if (!destination) {
      return;
    }

    // We check if the destination is the same of where we took the item
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // We remove the item from its position
      newTaskIds.splice(destination.index, 0, draggableId); // Then we can use splice to put the item on the new index

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns, // We leave the columns as they are
          [newColumn.id]: newColumn, // but we replace the one that was updated
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another (between columns)

    // First we update the start column, removing the item dragged
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    // Then we update the destination column, adding the item dragged
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd} // onDragEnd is required always
    >
      <Container>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

ReactDOM.render(<Kanban />, document.getElementById('root'));
