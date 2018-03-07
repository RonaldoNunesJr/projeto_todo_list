import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import List from './meusCheckoutsList'

const URL = 'http://localhost:3003/api/todoJobs'

export default class MeusCheckouts extends Component {
    constructor (props) {
        super(props)
        this.state = { title: '', list: [] }
        
        this.refresh()
    }
    refresh () {
        
        axios.get(`${URL}?sort=-createdAt`)
            .then(resp => this.setState({...this.state, list: resp.data}))
    }
    render () {
        return (
            <div>
                <PageHeader name="Meus Checkouts"></PageHeader>
                <List list={this.state.list}></List>
            </div>
        )
    }
}