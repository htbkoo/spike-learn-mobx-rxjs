import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {range} from "lodash";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        gameAppContainer: {
            "minHeight": "85vh",
            "display": "flex",
            "padding": theme.spacing(8),
            "minWidth": "100%",
            "justifyContent": "center",
            "alignItems": "center",
            "width": "max-content",
            "height": "max-content",
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
        boardContainer: {
            display: "block",
            width: "max-content",
            // padding: theme.spacing(4),
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

function PlainReactHookMinesweeperApp() {
    const classes = useStyles();

    const width = 8;
    const height = 6;
    const numBomb = 10;

    const boardData: BoardData = range(height).map(_ =>
        range(width).map(_ =>
            ({
                count: 0,
                isBomb: false,
                isOpen: false,
            })
        )
    )

    return (
        <div className={classes.gameAppContainer}>
            <BoardComponent data={boardData} />
        </div>
    );

}

interface CellData {
    isOpen: boolean,
    isBomb: boolean,
    count: number,
}

type BoardData = CellData[][];

function BoardComponent({data}: { data: BoardData }) {
    const classes = useStyles();

    return (
        <div className={classes.boardContainer}>
            {data.map((row, i) => (
                <div key={`row_${i}`}>
                    {
                        row.map((cellData, j) => (
                            <div key={`cell_${i * row.length + j}`} className={classes.cellButtonContainer}>
                                <Button variant="contained" color="default" className={classes.cellButton}
                                        children="" />
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}

export default PlainReactHookMinesweeperApp;