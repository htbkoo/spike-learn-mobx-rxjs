import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import produce from "immer";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {AddCircle, RemoveCircle} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {createIncrementalNumberIdGenerator} from "../utils/IdGenerator";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        todoListApp: {
            "textAlign": "center",
            minWidth: "80%",
            height: "80vh",
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
        },
        todoItemsContainer: {
            margin: theme.spacing(1),
            overflowY: "auto",
            flex: 1,
        },
        appContainer: {
            "backgroundColor": theme.palette.background.default,
            "minHeight": "100vh",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
            "fontSize": "calc(10px + 2vmin)",
            "color": theme.palette.primary.main
        },
        appLink: {
            "color": "#61dafb"
        },
        todoItemContainer: {
            display: "flex",
            padding: theme.spacing(2),
        },
        flexOne: {
            flex: 1,
        }
    }),
);

type TodoItemId = number;

interface TodoItemData {
    id: TodoItemId,
    text: string,
    isDone: boolean,
}

type TodoListAppState = { [id: number]: TodoItemData, ids: TodoItemId[] };

const idGenerator = createIncrementalNumberIdGenerator(0); // TODO: replace this by uuid

const EMPTY_TEXT_WIP = "";
const NO_ERROR = {message: "", isError: false};

function TodoListApp() {
    const classes = useStyles();
    const [todoAppState, setTodoAppState] = useState<TodoListAppState>({ids: []});
    const [error, setError] = useState(NO_ERROR);
    const [addTodoTextWIP, setAddTodoTextWIP] = useState(EMPTY_TEXT_WIP);

    return (
        <Paper className={classes.todoListApp}>
            <Typography variant="h3">Simple To Do List</Typography>
            <form className={classes.todoItemsContainer} noValidate autoComplete="off"
                  onSubmit={event => event.preventDefault()}>
                <TodoItems
                    items={todoAppState.ids.map(id => todoAppState[id])}
                    onCheckBoxToggle={id =>
                        setTodoAppState(produce(todoAppState, nextState => {
                            nextState[id].isDone = !nextState[id].isDone
                        }))
                    }
                    onTextChange={(id, text) =>
                        setTodoAppState(produce(todoAppState, nextState => {
                            nextState[id].text = text
                        }))
                    }
                    onRemoveButtonClick={id =>
                        setTodoAppState(produce(todoAppState, nextState => {
                            nextState.ids = nextState.ids.filter(existingId => existingId !== id);
                            delete nextState[id];
                        }))
                    }
                />
                <AddTodoItem text={addTodoTextWIP} setText={setAddTodoTextWIP} onAddButtonClick={handleAddTodoItem}/>
            </form>
            <Snackbar open={error.isError} autoHideDuration={6000} onClose={closeErrorSnackbar}>
                <Alert elevation={6} variant="filled" onClose={closeErrorSnackbar} severity="error">
                    {error.message}
                </Alert>
            </Snackbar>
        </Paper>
    )

    function closeErrorSnackbar() {
        setError(produce(error, newError => {
            newError.isError = false
        }));
    }

    function handleAddTodoItem() {
        if (addTodoTextWIP) {
            const nextState = produce(todoAppState, draftState => {
                const id = idGenerator.getNextId();
                draftState.ids.push(id);
                draftState[id] = {
                    text: addTodoTextWIP,
                    isDone: false,
                    id
                };
            });
            setTodoAppState(nextState);
            setAddTodoTextWIP(EMPTY_TEXT_WIP);
        } else {
            showErrorSnackbar("To do item cannot be empty!");
        }
    }

    function showErrorSnackbar(message: string) {
        setError({isError: true, message})
    }
}

interface TodoItemsHandlers {
    onCheckBoxToggle: (id: TodoItemId) => void,
    onTextChange: (id: TodoItemId, text: string) => void,
    onRemoveButtonClick: (id: TodoItemId) => void,
}

function TodoItems(
    {items, onCheckBoxToggle, onTextChange, onRemoveButtonClick}:
        { items: TodoItemData[], } & TodoItemsHandlers
) {
    return (
        <>
            {
                items.map(item => (
                    <TodoItem
                        key={item.id}
                        data={item}
                        onCheckBoxToggle={() => onCheckBoxToggle(item.id)}
                        onTextChange={text => onTextChange(item.id, text)}
                        onRemoveButtonClick={() => onRemoveButtonClick(item.id)}
                    />
                ))
            }
        </>
    );
}

function TodoItem({data: {text, isDone, id}, onCheckBoxToggle, onTextChange, onRemoveButtonClick}: { data: TodoItemData, onCheckBoxToggle: () => void, onTextChange: (text: string) => void, onRemoveButtonClick: () => void }) {
    const classes = useStyles();

    return (
        <div className={classes.todoItemContainer}>
            <Checkbox checked={isDone} onChange={onCheckBoxToggle}/>
            <TextField label={`id for debugging: ${id}`} variant="outlined" className={classes.flexOne}
                       value={text}
                       disabled={isDone}
                       onChange={event => onTextChange(event.target.value)}
            />
            <IconButton color="primary" aria-label="remove todo item" component="span"
                        onClick={onRemoveButtonClick}
            >
                <RemoveCircle/>
            </IconButton>
        </div>
    )
}

function AddTodoItem(
    {text, setText, onAddButtonClick}:
        { text: string, setText: (text: string) => void, onAddButtonClick: () => void, }
) {
    const classes = useStyles();

    return (
        <div className={classes.todoItemContainer}>
            <TextField variant="outlined" className={classes.flexOne}
                       label="Add todo item"
                       value={text}
                       onChange={event => setText(event.target.value)}/>
            <IconButton color="primary" aria-label="add todo item" component="span" onClick={onAddButtonClick}>
                <AddCircle/>
            </IconButton>
        </div>
    )
}

export default TodoListApp;