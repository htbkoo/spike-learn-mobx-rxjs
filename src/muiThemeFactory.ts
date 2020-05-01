import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

export function createMyMuiTheme(){
    const theme = createMuiTheme({
        palette: {
            primary: purple,
            secondary: green,
        },
    });

    return responsiveFontSizes(theme);
}