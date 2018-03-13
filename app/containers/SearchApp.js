import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSlug, fetchDetailAsset, clearData } from '../actions/index'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { NOT_FETCHED_DETAIL } from '../actionTypes'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
      margin: theme.spacing.unit,
    },
});

const letters = ['a', 'b']

class SearchApp extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        slugColl: PropTypes.array.isRequired,
        assetColl: PropTypes.array.isRequired,
        doneAssetColl: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props)
        this.state = { keyword: '', letter: '', letterIndex: -1 }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.assetColl.length != nextProps.assetColl.length) {
            const { dispatch } = this.props

            for(let i = 0; i < nextProps.assetColl.length; i++) {
                const asset = nextProps.assetColl[i]
                if(asset.status == NOT_FETCHED_DETAIL)
                    dispatch(fetchDetailAsset(asset.asset))
            }
        }
        else if(nextProps.isFetching == false) {
            const { letterIndex, keyword } = this.state
            if(letterIndex > -1) {
                const nLetterIndex = letterIndex + 1
                if(nLetterIndex < letters.length) {
                    const nLetter = letters[nLetterIndex]
                
                    this.setState({ letter: nLetter, letterIndex: nLetterIndex })
                    this.dispatchSlugSearch(keyword, nLetter)
                }
            }
        }
    }

    dispatchSlugSearch(keyword, letter) {
        const { dispatch } = this.props

        dispatch(fetchSlug(`${keyword} ${letter}`))
    }

    onSearchClick() {
        const { keyword } = this.state
        const { dispatch } = this.props
        console.info(`on search click ${keyword}`) 

        dispatch(clearData())

        const letterIndex = 0
        this.setState({ letter: letters[letterIndex], letterIndex: letterIndex })

        this.dispatchSlugSearch(keyword, letters[letterIndex])
    }

    onChangeTextBox(event) {
        this.setState( { keyword: event.target.value })
    }

    onDownload() {
        console.info('Download activated')
        const { doneAssetColl } = this.props

        let rows = [['name', 'total']]
        
        for(let i = 0; i < doneAssetColl.length; i++) {
            const asset = doneAssetColl[i]
            rows.push([asset.asset, asset.totalEntries])
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
         }); 
        
        const encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".

    }

    render() {
        const { classes, isFetching, assetColl, doneAssetColl } = this.props
        const downloadAvailable = assetColl.length > 0 && assetColl.length == doneAssetColl.length

        const { keyword, letter } = this.state
        return (
            <div>
                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="keyword">keyword</InputLabel>
                        <Input id="keyword" disabled={isFetching} value={keyword} onChange={this.onChangeTextBox.bind(this)} />
                    </FormControl>
                    
                    <Button className={classes.button} disabled={isFetching} variant="raised" size="small" color="primary" onClick={this.onSearchClick.bind(this)}>Search</Button>
                    <Button className={classes.button} disabled={!downloadAvailable} variant="raised" size="small" onClick={this.onDownload.bind(this)}>Download</Button>
                    
                </div>
                <div>
                    <span>Processing letter {letter}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { slugReducer, systemReducer } = state
    const { slugColl, assetColl, doneAssetColl } = slugReducer
    const { isFetching } = systemReducer
    return {
        slugColl: slugColl !== undefined ? slugColl : [],
        isFetching: isFetching !== undefined ? isFetching : false,
        assetColl: assetColl !== undefined ? assetColl : [],
        doneAssetColl: doneAssetColl !== undefined ? doneAssetColl : []
    }
}

export default withStyles(styles)(connect(mapStateToProps)(SearchApp))