import React, {useState} from "react";
import {BaseTextFieldProps} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import produce from "immer";
import {GameConfig} from "./PlainReactHookMinesweeperApp";

function GameConfigDialog({isOpen, onStartGame}: { isOpen: boolean, onStartGame: (config: GameConfig) => void }) {
    const [config, setConfig] = useState<GameConfig>({
        width: 10,
        height: 8,
        numBomb: 10,
    })

    // TODO: add validation on game config (e.g. width, height must be positive, numBomb<width*height
    const dialogTextFields = Object
        .keys(config)
        .map(field => (
            <DialogTextField
                key={field}
                id={field}
                label={field} // TODO: add string capitalize
                value={config[field]}
                setValue={setFormField(field as any)}
            />
        ));

    return (
        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Setup the game</DialogTitle>

            <DialogContent>
                <DialogContentText>Please set the game config</DialogContentText>

                {dialogTextFields}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onStartGame(config)} color="primary">
                    Start Game
                </Button>
            </DialogActions>
        </Dialog>
    )

    function setFormField(field: keyof GameConfig) {
        return value => setConfig(produce(config, newConfig => {
            newConfig[field] = value
        }));

        // This also works and is slightly cleaner, but we would lose the type for `newConfig`
        // return value => setConfig(produce(newConfig => {
        //     newConfig[field] = value
        // }));
    }
}

function DialogTextField<T>({value, setValue, ...otherProps}: { value: T, setValue: (value: string) => void } & BaseTextFieldProps) {
    return (
        <TextField
            variant="standard"
            margin="dense"
            value={value}
            onChange={event => setValue(event.target.value)}
            type="number"
            fullWidth
            {...otherProps}
        />
    )
}

export default GameConfigDialog;