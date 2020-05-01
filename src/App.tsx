import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        app: {
            "textAlign": "center"
        },
        appContainer: {
            "backgroundColor": "#282c34",
            "minHeight": "100vh",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
            "fontSize": "calc(10px + 2vmin)",
            "color": "white"
        },
        appLink: {
            "color": "#61dafb"
        },
    }),
);

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.appContainer}>
            <div className={classes.app}>

            </div>
        </div>
    );
};

export default App;
