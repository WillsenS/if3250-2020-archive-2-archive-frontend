import { withStyles, TableCell } from "@material-ui/core";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 13
  }
}))(TableCell);

export default StyledTableCell;
