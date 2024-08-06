import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Modal, Box, Typography } from '@mui/material';

const Datagrid = ({ rows, columns, setRows }) => {
    const [rowModesModel, setRowModesModel] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(false);

    const handleRowModesModelChange = (newModel) => {
        setRowModesModel(newModel);
    };

    const handleRowEditStart = (params) => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [params.id]: { mode: 'edit' },
        }));
    };

    const handleRowEditStop = (params, event) => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [params.id]: { mode: 'view' },
        }));
    };

    const processRowUpdate = (newRow) => {
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };

    const handleDeleteClick = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleSaveClick = (id) => {
        setRowModesModel((prevModel) => ({
            ...prevModel,
            [id]: { mode: 'view' },
        }));
    };

    const handleViewDetails = (params) => {
        const selectedRow = rows.find(row => row.id === params.id);
        setSelectedRow(selectedRow);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columnsWithActions = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => {
                return (
                    <div>
                        <Button variant="contained" color="primary" fullWidth onClick={() => handleViewDetails(params)}>
                            View Details
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columnsWithActions}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                sx={{ maxHeight: '500px' }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="event-details-modal"
                aria-describedby="event-details-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Event Details
                    </Typography>
                    {selectedRow && (
                        <div>
                            <Typography variant="body1" gutterBottom>
                                Event: {selectedRow.item}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Date: {selectedRow.date}
                            </Typography>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Datagrid;
