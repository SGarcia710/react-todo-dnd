import React from 'react';
import Column from './Column';

const InnerColumnList = React.memo(
  (props: { column: Column; taskMap: Record<string, Task>; index: number }) => {
    const { column, taskMap, index } = props;
    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);

    return <Column column={column} index={index} tasks={tasks} />;
  }
);

export default InnerColumnList;
