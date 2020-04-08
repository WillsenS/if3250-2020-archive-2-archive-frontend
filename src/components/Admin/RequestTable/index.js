import React from 'react';
import PropTypes from 'prop-types';
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(() => ({
    root: {
        minWidth: '50%',
        maxWidth: '70%'
    },
    title: {
        marginBottom: '1rem'
    },
    cell: {
        textAlign: 'left',
        fontSize: '0.8rem'
    }
}));


export default function RequestTable(props) {

    const classes = useStyles();

    const handleClick = (id) => {
        props.handleClick(id);
    };

    return (
        <>
            <Typography variant="h3" component="h2" className={classes.title}>{props.title}</Typography>
            <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="tabel permintaan peminjamana arsip" size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.cell} align="left"> NAMA PEMINJAM </StyledTableCell>
                            <StyledTableCell className={classes.cell}> NAMA ARSIP</StyledTableCell>
                            <StyledTableCell className={classes.cell}> TIPE ARSIP</StyledTableCell>
                            <StyledTableCell className={classes.cell}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.requestList.map(request => {
                                return (
                                    <StyledTableRow key={request._id}>
                                        <StyledTableCell className={classes.cell}>{request.user.nama}</StyledTableCell>
                                        <StyledTableCell className={classes.cell}>{request.request.nama}</StyledTableCell>
                                        <StyledTableCell className={classes.cell}>{request.request.tipe}</StyledTableCell>
                                        <StyledTableCell className={classes.cell}>
                                            <IconButton aria-label="archive detail" size="small" color="primary" onClick={() => {
                                                handleClick(request._id)
                                            }} style={{margin: "0 .5rem"}}>
                                                <AddCircleIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>

        );
}


RequestTable.propTypes = {
    title: PropTypes.string,
    requestList: PropTypes.array,
    handleClick: PropTypes.func
};