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
import { HiOutlineExternalLink } from 'react-icons/hi';
import ActionMenu from '../action-menu/ApplicationsMenu';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { deleteVideo } from 'src/requests';
import { toast } from 'react-toastify';
import { URL } from 'src/config';

const Results = ({ refetchData, data, ...rest }) => {
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const deleteMutation = useMutation('deleteVideo', (data) =>
    deleteVideo(data)
  );
  const notifyDelete = () => toast('Successfully deleted');
  const navigate = useNavigate();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

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
    navigate(`${URL}/app/videos/edit/${id}`);
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Submit Date</TableCell>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{`${item.address}, ${item.city}, ${item.state}, ${item.postal}`}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    <ActionMenu
                      handleDelete={() => handleDelete(item._id)}
                      handleViewResume={item.resume}
                      handleViewLinkedin={item.linkedinProfileURL}
                      handleViewCoverLetter={
                        item.coverLetter
                          ? () => {
                              handleViewCoverLetter(item._id);
                            }
                          : false
                      }
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
