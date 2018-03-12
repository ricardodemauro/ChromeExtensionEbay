import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from "material-ui"
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
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
            <div className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="keyword">keyword</InputLabel>
                    <Input id="keyword" value={keyword} onChange={this.onChangeTextBox.bind(this)} />
                </FormControl>
                
                <Button variant="raised" size="small" color="primary" onClick={this.onSearchClick.bind(this)}>Search</Button>
            </div>
        )
    }
}


export default withStyles(styles)(SearchApp);