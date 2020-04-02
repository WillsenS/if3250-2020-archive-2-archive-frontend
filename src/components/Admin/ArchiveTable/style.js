import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    input: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "80%",
        margin: "2rem auto"
    },

    table: {
        maxWitdh: 700
    },
    wrapper: {
        width: "80%",
        margin: "0 auto"
    }
}));

export default useStyles;
