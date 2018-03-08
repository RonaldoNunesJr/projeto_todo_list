import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import meusCheckoutsList from './meusCheckoutsList'

const URL = 'http://localhost:3003/api/todoJobs'

export default class MeusCheckouts extends Component {
    constructor (props) {
        super(props)
        this.state = { title : '', list: [] }
        
        this.refresh()
    }
    refresh (title = '') {
        const search = title ? `&title__regex=/${title}/`:''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => {
                this.setState({...this.state, list: resp.data})
                console.log(`after setState ${this.state}`)
            })
            .catch(error => console.error(error))
        
    }
    render () {
        return (
            <div>
                <PageHeader name="Meus Checkouts"></PageHeader>
                <meusCheckoutsList list={this.state.list}></meusCheckoutsList>
            </div>
        )
    }
}