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
import DeleteButton from '../DeleteButton/DeleteButton';
import EditModal from '../EditModal/EditModal';

type Props = {};

const TaskList = (props: Props) => {
  const { data, updateTask, deleteTask } = useContextTodo();

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <>
      <Paper
        className="max-w-3xl mx-auto"
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
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, i) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>
                      {data?.status ? 'Complete' : 'Incomplete'}
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-5">
                        <div className="content-center border-black ">
                          <DeleteButton id={data.id} deleteTask={deleteTask} />
                        </div>
                        <div className="content-center border-black ">
                          <EditModal row={data} updateTask={updateTask} />
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
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TaskList;
