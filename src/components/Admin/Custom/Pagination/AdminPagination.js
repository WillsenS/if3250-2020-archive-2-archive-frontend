import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

export default function AdminPagination(props) {

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const {handleDataChange, totalPage} = props;

    function handleChange(event, value) {
        handleDataChange(value);
        setPage(value);
    }

    return (
        <div className={classes.root}>
            <Pagination
                count={totalPage}
                page={page}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={handleChange}/>
        </div>
    );
}

AdminPagination.propTypes = {
    handleDataChange: PropTypes.func,
    currentPage: PropTypes.number,
    totalPage: PropTypes.number
};