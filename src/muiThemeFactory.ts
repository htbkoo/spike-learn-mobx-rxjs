import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

export function createMyMuiTheme() {
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {main: "#7986cb"}
        },
    });

    return responsiveFontSizes(theme);
}