import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

import TodoListApp from "./todo/PlainReactHookTodoApp";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

export default App;
