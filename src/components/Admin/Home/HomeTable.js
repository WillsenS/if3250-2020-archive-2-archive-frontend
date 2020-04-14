import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginBottom: '1rem'
    },
    cell: {
        textAlign: 'center',
        fontSize: '0.8rem'
    }
}));

export default function HomeTable(props) {
    const classes = useStyles();
    return (
            <Grid item md={12} lg={6}>
                <Typography variant="h3" component="h2" className={classes.title}>{props.title}</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="tabel statistik user">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className={classes.cell}>Total</StyledTableCell>
                                {
                                    props.dataList.items ? props.dataList.items.map((item, index) => (
                                        <StyledTableCell key={index} className={classes.cell}>{ item.label }</StyledTableCell>
                                    )) : (<></>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                {
                                  props.dataList.total ? (
                                      <StyledTableCell  className={classes.cell}>{ props.dataList.total }</StyledTableCell>
                                  ) : (<></>)
                                }
                                {
                                    props.dataList.items ? props.dataList.items.map((item, index) => (
                                        <StyledTableCell key={index} className={classes.cell}>{ item.number }</StyledTableCell>
                                    )) : (<></>)
                                }
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
    );

}

HomeTable.propTypes = {
    dataList: PropTypes.object,
    title: PropTypes.string
};