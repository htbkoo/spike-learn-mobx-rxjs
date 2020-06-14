import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import produce from "immer";

import {blankBoardData, initializedBoardData} from "../utils";
import {BoardData, BoardDimension, CellCoordinates} from "../types";
import GameConfigDialog from "./GameConfigDialog";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        boardContainer: {
            display: "block",
            width: "max-content",
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

function BoardComponent(
    {data, isPlaying, handleClick}:
        { data: BoardData, isPlaying: boolean, handleClick: (coor: CellCoordinates) => void }
) {
    const classes = useStyles();

    return (
        <div className={classes.boardContainer}>
            {data.map((rowData, row) => (
                <div key={`row_${row}`}>
                    {
                        rowData.map((cellData, col) => (
                            <div
                                key={`cell_${row * rowData.length + col}`}
                                className={classes.cellButtonContainer}
                            >
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.cellButton}
                                    children={cellData.isBomb ? "B" : cellData.count !== 0 ? cellData.count : ""}
                                    disabled={cellData.isOpen || !isPlaying}
                                    onClick={() => handleClick({row, col})}
                                />
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}

export default BoardComponent;