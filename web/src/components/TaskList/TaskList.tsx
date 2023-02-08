import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useContextTodo } from '../../context/context';
import useFetchTasks from '../../services/useFetchTasks';
import DeleteButton from '../DeleteButton/DeleteButton';
import EditModal from '../EditModal/EditModal';

type Props = {};

const TaskList = (props: Props) => {
  const { updateTask, deleteTask } = useContextTodo();
  const { tasks, isLoading, error } = useFetchTasks();
  interface Column {
    id: 'title' | 'status' | 'description' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
  }

  const columns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 300 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ];

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="">
      <Paper
        className="max-w-2xl mx-auto"
        sx={{ width: '100%', overflow: 'hidden' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <div className="font-bold">{column.label}</div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((tasks, i) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell>{tasks.title}</TableCell>
                    <TableCell>
                      {tasks?.status ? 'Complete' : 'Incomplete'}
                    </TableCell>
                    <TableCell>{tasks.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-5">
                        <div className="content-center border-black ">
                          <DeleteButton
                            id={tasks.id!}
                            deleteTask={deleteTask}
                          />
                        </div>
                        <div className="content-center border-black ">
                          <EditModal row={tasks} updateTask={updateTask} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TaskList;
