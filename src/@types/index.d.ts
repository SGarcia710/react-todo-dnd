type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type Task = {
  id: string;
  content: string;
};

type InitialData = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};
