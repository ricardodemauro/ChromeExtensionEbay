import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'
import Paper from 'material-ui/Paper'
import SimpleAppBar from '../components/SimpleAppBar'
import SearchApp from './SearchApp'
import Loader from '../components/Loader'

const styles = theme => ({
    root: theme.mixins.gutters({
        width: 200,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column' 
    }),
    content: theme.mixins.gutters({
        width: 200,
        height: 400,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0
    })
});

class App extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <Reboot />
                <SimpleAppBar title="Ebay App" />
                <div className={classes.content}>
                    <Paper className={classes.root}>
                        <Loader loading={true}/>
                        <SearchApp />
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(App)