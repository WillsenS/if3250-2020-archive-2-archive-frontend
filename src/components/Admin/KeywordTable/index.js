import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";

//Custom components and styles and data
import useStyles from "./style";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import EditButton from "../Custom/Button/EditButton";
import EditKeywordDialog from "../Custom/Dialog/Keyword/EditKeywordDialog";

//PropTypes validation
import PropTypes from "prop-types";

export default function KeywordTable(props) {
  const classes = useStyles();

  const [selectedKeyword, setSelectedKeyword] = React.useState({});
  const [openEditKeywordDialog, setOpenEditKeywordDialog] = React.useState(
    false
  );

  const { dataKeyword, handleEditDataRequest } = props;

  const handleEditKeywordOpen = (keyword) => {
    setSelectedKeyword(keyword);
    setOpenEditKeywordDialog(true);
  };

  const handleEditKeywordClose = () => {
    setOpenEditKeywordDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.wrapper}>
        <Table
          className={classes.table}
          aria-label="admin list table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>KEYWORD</StyledTableCell>
              <StyledTableCell>PRIORITY</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKeyword.map((keyword, index) => (
              <StyledTableRow key={index} hover>
                <StyledTableCell>{keyword}</StyledTableCell>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <EditButton
                      handleClick={handleEditKeywordOpen}
                      data={{ keyword, index }}
                    />
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Popup dialog */}
      <EditKeywordDialog
        open={openEditKeywordDialog}
        handleClose={handleEditKeywordClose}
        data={selectedKeyword}
        handleEdit={handleEditDataRequest}
      />
    </>
  );
}

KeywordTable.propTypes = {
  dataKeyword: PropTypes.array,
};
