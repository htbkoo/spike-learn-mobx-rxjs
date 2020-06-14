import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {BoardData, CellCoordinates, CellData} from "../types";

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
                                    children={getButtonText(cellData)}
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

function getButtonText({isOpen, isBomb, count}: CellData): React.ReactNode {
    if (isOpen) {
        return isBomb ? "B" : count !== 0 ? count : "";
    } else {
        return "";
    }
}

export default BoardComponent;