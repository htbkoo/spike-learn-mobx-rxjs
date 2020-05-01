import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {AddCircle, RemoveCircle} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import produce from "immer"

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

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.appContainer}>
            <TodoListApp/>
        </div>
    );
};

interface TodoItem {
    id: number,
    text: string,
    isDone: boolean,
}

type TodoListAppState = { [id: number]: TodoItem, ids: number[] };

let lastId = 0;

function TodoListApp() {
    const classes = useStyles();
    const [todoAppState, setTodoAppState] = useState<TodoListAppState>({ids: []});

    console.log(`render TodoListApp`)

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

    function TodoItem({text, isDone}: TodoItem & { id: number }) {
        return (
            <div className={classes.todoItemContainer}>
                <Checkbox
                    checked={isDone}
                    // onChange={handleChange}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                <TextField label="Todo item" variant="outlined" className={classes.flexOne} value={text}/>
                <IconButton color="primary" aria-label="remove todo item" component="span">
                    <RemoveCircle/>
                </IconButton>
            </div>
        )
    }

    function AddTodoItem() {
        const EMPTY_TEXT_WIP = "";
        const [todoTextWIP, setTodoTextWIP] = useState(EMPTY_TEXT_WIP);

        console.log(`render AddTodoItem`)
        return (
            <div className={classes.todoItemContainer}>
                <TextField label="Add todo item" variant="outlined" className={classes.flexOne} value={todoTextWIP}
                           onChange={event => setTodoTextWIP(event.target.value)}/>
                <IconButton color="primary" aria-label="add todo item" component="span" onClick={handleAddTodoItem}>
                    <AddCircle/>
                </IconButton>
            </div>
        )

        function handleAddTodoItem() {
            if (todoTextWIP) {
                const nextState = produce(todoAppState, draftState => {
                    const id = lastId++; // TODO: replace this by uuid
                    draftState.ids.push(id);
                    draftState[id] = {
                        text: todoTextWIP,
                        isDone: false,
                        id
                    };
                });
                setTodoAppState(nextState);
                setTodoTextWIP(EMPTY_TEXT_WIP);
            }
        }
    }
}

export default App;
