import React from 'react';
import Task from './Task';

const InnerList = React.memo((props: { tasks: Task[] }) => {
  return (
    <>
      {props.tasks.map((task, index) => (
        <Task index={index} key={task.id} task={task} />
      ))}
    </>
  );
});

export default InnerList;
