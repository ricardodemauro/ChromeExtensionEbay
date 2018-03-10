import React, { Component } from "react";
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from "material-ui";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
  });

class SearchApp extends Component {
    constructor(props) {
        super(props)
        this.state = { keyword: '' }
    }
    onSearchClick() {
        console.info('on search click')
    }

    onChangeTextBox(event) {
        this.setState( { keyword: event.target.value })
    }

    render() {
        const { classes } = this.props
        const { keyword } = this.state
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField label="key word" 
                           className={classes.textField}
                           margin="normal"
                           value={keyword}
                           onChange={this.onChangeTextBox.bind(this)} />
                <Button variant="raised" size="small" color="primary">Search</Button>
            </form>
        )
    }
}


export default withStyles(styles)(SearchApp);