import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import ActionMenu from '../action-menu/ActionMenu';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { deleteNews } from 'src/requests';
import { toast } from 'react-toastify';
import { URL } from 'src/config';

const Results = ({ refetchData, data, ...rest }) => {
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const navigate = useNavigate();
  const deleteMutation = useMutation('deleteNews', (data) => deleteNews(data));
  const notifyDelete = () => toast('Delete Success');

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    if (newPage === 0) {
      setStartPoint(newPage);
      setEndPoint(limit);
    }

    if (newPage >= 1) {
      const startPointNum = newPage * limit;
      setStartPoint(startPointNum);
      setEndPoint(startPointNum + limit);
    }
  };

  const handleEdit = (id) => {
    navigate(`${URL}/app/news/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          notifyDelete();
          refetchData();
        }
      }
    );
  };

  useEffect(() => {
    setEndPoint(limit);
  }, [limit]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(startPoint, endPoint).map((item) => (
                <TableRow
                  hover
                  key={item._id}
                  selected={selectedDataIds.indexOf(item._id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <img
                      width="150px"
                      height="100px"
                      style={{ objectFit: 'contain' }}
                      src={item.image}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    <ActionMenu
                      handleEdit={() => handleEdit(item._id)}
                      handleDelete={() => handleDelete(item._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  data: PropTypes.array.isRequired
};

export default Results;
