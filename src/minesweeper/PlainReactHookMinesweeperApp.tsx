import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {range} from "lodash";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        gameAppContainer: {
        },
        boardContainer: {
            display: "block",
            width: "max-content",
            padding: theme.spacing(4),
        },
        cellButtonContainer: {
            margin: theme.spacing(0.25),
            display: "inline-block",
        },
        cellButton: {
            height: theme.spacing(8),
            width: theme.spacing(8),
            minWidth: "unset",
        }
    }),
);


function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function PlainReactHookMinesweeperApp() {
    const classes = useStyles();

    const width = 18;
    const height = 5;
    const numBomb = 10;

    return (
        <div className={classes.gameAppContainer}>
            <div className={classes.boardContainer}>
                {range(height).map(i => (
                    <div key={`row_${i}`}>
                        {
                            range(width).map(j => (
                                <div key={`cell_${i * width + j}`} className={classes.cellButtonContainer}>
                                    <Button variant="contained" color="default" className={classes.cellButton}
                                            children="" />
                                </div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    );

}

function TableExample() {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell><Button variant="contained" color="primary" /></TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PlainReactHookMinesweeperApp;