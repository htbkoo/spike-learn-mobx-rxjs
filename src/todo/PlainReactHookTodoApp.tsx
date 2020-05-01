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

interface TodoItem {
    id: TodoItemId,
    text: string,
    isDone: boolean,
}

type TodoListAppState = { [id: number]: TodoItem, ids: TodoItemId[] };

const idGenerator = (function* generateId() {
    let lastId = 0;
    while (true) {
        yield lastId++;
    }
})();

function getNextId(): TodoItemId {
    return idGenerator.next().value; // TODO: replace this by uuid
}

function TodoListApp() {
    const classes = useStyles();
    const [todoAppState, setTodoAppState] = useState<TodoListAppState>({ids: []});

    return (
        <Paper className={classes.todoListApp}>
            <Typography variant="h3">Simple To Do List</Typography>
            <form className={classes.todoItemsContainer} noValidate autoComplete="off"
                  onSubmit={event => event.preventDefault()}>
                <TodoItems/>
                <AddTodoItem/>
            </form>
        </Paper>
    )

    function TodoItems() {
        return (
            <>
                {
                    todoAppState.ids.map(id => (
                        <TodoItem {...todoAppState[id]} key={id}/>
                    ))
                }
            </>
        );
    }

    function TodoItem({text, isDone, id}: TodoItem) {
        const [todoTextWIP, setTodoTextWIP] = useState(text);

        return (
            <div className={classes.todoItemContainer}>
                <Checkbox
                    checked={isDone}
                    onChange={() =>
                        setTodoAppState(produce(todoAppState, nextState => {
                            nextState[id].isDone = !nextState[id].isDone
                        }))
                    }
                />
                <TextField label={`id for debugging: ${id}`} variant="outlined" className={classes.flexOne}
                           value={todoTextWIP}
                           disabled={isDone}
                           onChange={event => setTodoTextWIP(event.target.value)}
                           onBlur={() =>
                               setTodoAppState(produce(todoAppState, nextState => {
                                   nextState[id].text = todoTextWIP
                               }))
                           }
                />

                <IconButton color="primary" aria-label="remove todo item" component="span"
                            onClick={() =>
                                setTodoAppState(produce(todoAppState, nextState => {
                                    nextState.ids = nextState.ids.filter(existingId => existingId !== id);
                                    delete nextState[id];
                                }))
                            }
                >
                    <RemoveCircle/>
                </IconButton>
            </div>
        )
    }

    function AddTodoItem() {
        const EMPTY_TEXT_WIP = "", NO_ERROR = "";
        const [todoTextWIP, setTodoTextWIP] = useState(EMPTY_TEXT_WIP);
        const [errorMessage, setErrorMessage] = useState(NO_ERROR);

        return (
            <div className={classes.todoItemContainer}>
                <TextField label="Add todo item" variant="outlined" className={classes.flexOne} value={todoTextWIP}
                           onChange={event => setTodoTextWIP(event.target.value)}/>
                <IconButton color="primary" aria-label="add todo item" component="span" onClick={handleAddTodoItem}>
                    <AddCircle/>
                </IconButton>
                {errorMessage ? (
                    <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
                        <Alert elevation={6} variant="filled" onClose={handleCloseErrorSnackbar} severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                ) : ""}
            </div>
        )

        function handleAddTodoItem() {
            if (todoTextWIP) {
                const nextState = produce(todoAppState, draftState => {
                    const id = getNextId();
                    draftState.ids.push(id);
                    draftState[id] = {
                        text: todoTextWIP,
                        isDone: false,
                        id
                    };
                });
                setTodoAppState(nextState);
                setTodoTextWIP(EMPTY_TEXT_WIP);
            } else {
                setErrorMessage("To do item cannot be empty!")
            }
        }

        function handleCloseErrorSnackbar() {
            setErrorMessage(NO_ERROR);
        }
    }
}

export default TodoListApp;