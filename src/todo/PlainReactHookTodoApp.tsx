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
import {TEST_IDS} from "./constants";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";

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

type TodoListAppState = {
    data: {
        items: {
            [id: number]: TodoItemData
            ids: TodoItemId[],
        },
        addTodoText: string,
    },
    error: {
        message: string,
        isError: boolean,
    }
};

const idGenerator = createIncrementalNumberIdGenerator(0); // TODO: replace this by uuid

const EMPTY_TEXT_WIP = "";
const NO_ERROR = {message: "", isError: false};

function TodoListApp() {
    const classes = useStyles();
    const [todoAppState, setTodoAppState] = useState<TodoListAppState>({
        data: {addTodoText: EMPTY_TEXT_WIP, items: {ids: []}},
        error: NO_ERROR
    });

    const addTodoText = todoAppState.data.addTodoText;
    return (
        <Paper className={classes.todoListApp}>
            <Typography variant="h3">Simple To Do List</Typography>
            <form className={classes.todoItemsContainer} noValidate autoComplete="off"
                  onSubmit={event => event.preventDefault()}>
                <TodoItems
                    items={todoAppState.data.items.ids.map(id => todoAppState[id])}
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
                            nextState.data.items.ids = nextState.data.items.ids.filter(existingId => existingId !== id);
                            delete nextState[id];
                        }))
                    }
                />
                <AddTodoItem text={addTodoText} setText={setAddTodoText} onAddButtonClick={handleAddTodoItem}/>
            </form>
            <Snackbar open={todoAppState.error.isError} autoHideDuration={6000} onClose={closeErrorSnackbar}>
                <Alert elevation={6} variant="filled" onClose={closeErrorSnackbar} severity="error">
                    {todoAppState.error.message}
                </Alert>
            </Snackbar>
        </Paper>
    )

    function closeErrorSnackbar() {
        setTodoAppState(produce(todoAppState, draftState => {
            draftState.error.isError = false;
        }));
    }

    function handleAddTodoItem() {
        if (addTodoText) {
            setTodoAppState(produce(todoAppState, draftState => {
                const id = idGenerator.getNextId();
                draftState.data.items.ids.push(id);
                draftState[id] = {
                    text: addTodoText,
                    isDone: false,
                    id
                };
                draftState.data.addTodoText = EMPTY_TEXT_WIP;
            }));
        } else {
            showErrorSnackbar("To do item cannot be empty!");
        }
    }

    function showErrorSnackbar(message: string) {
        setTodoAppState(produce(todoAppState, draftState => {
            draftState.error = {isError: true, message};
        }));
    }

    function setAddTodoText(text: string) {
        setTodoAppState(produce(todoAppState, draftState => {
            draftState.data.addTodoText = text;
        }));
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
            <FullWidthTodoItemTextField
                role={TEST_IDS.TODO_ITEM_TEXT_FIELD}
                testId={`${TEST_IDS.TODO_ITEM_TEXT_FIELD}-${id}`}

                label={`id for debugging: ${id}`}
                value={text}
                onChange={event => onTextChange(event.target.value)}
                disabled={isDone}
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
            <FullWidthTodoItemTextField
                role={TEST_IDS.ADD_TODO_ITEM_TEXT_FIELD}

                label="Add todo item"
                value={text}
                onChange={event => setText(event.target.value)}
            />
            <IconButton role={TEST_IDS.ADD_TODO_ITEM_BUTTON} aria-label={TEST_IDS.ADD_TODO_ITEM_BUTTON}
                        color="primary"
                        component="span"
                        onClick={onAddButtonClick}>
                <AddCircle/>
            </IconButton>
        </div>
    )
}

function FullWidthTodoItemTextField({testId, ...props}: { value: string, onChange: TextFieldProps['onChange'], testId?: string } & TextFieldProps) {
    const classes = useStyles();

    return (
        <TextField
            {...props}
            variant="outlined"
            className={classes.flexOne}
            inputProps={{'data-testid': testId || props.role}}
        />
    )
}

export default TodoListApp;