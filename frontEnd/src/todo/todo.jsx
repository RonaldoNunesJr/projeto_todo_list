import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todoJobs'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', list: [] }

        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleMarkAsPause = this.handleMarkAsPause.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    handleChangeTitle(e) {
        this.setState({...this.state, title: e.target.value })
    }

    handleChangeDescription(e) {
        this.setState({...this.state, description: e.target.value })
    }

    refresh (title = '') {
        const search = title ? `&title__regex=/${title}/`:''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, title: this.state.title, list: resp.data}));
    }

    handleAdd() {
        const title = this.state.title
        const description = this.state.description || ''

        axios.post(URL, {title, description})
            .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh(this.state.title))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.title))
    }
    
    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.title))
    }

    handleMarkAsPause(todo) {        
        axios.put(`${URL}/${todo._id}`, {...todo, pauseStatus: true, pauseTime: [{init: new Date(), resume:''}]})
    }

    handleMarkAsResume(todo) {
        const newPauseTime = {...todo.pauseTime}
        const position = newPauseTimed.length - 1
        console.log(position)
        console.log(newPauseTime)
        //let newPauseTime = pauseTime[pauseTime.length-1].resume     
        /*let newPauseTime = {...todo,  pauseStatus: false, pauseTime: 
        }*/
        //console.log(newPauseTime)
        //console.log(newPauseTime);
        //axios.put(`${URL}/${todo._id}`, {...todo, pauseStatus: true,})
    }

    handleSearch() {
        this.refresh(this.state.title)
    }

    handleClear() {
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    title={this.state.title}
                    handleChangeTitle={this.handleChangeTitle}
                    handleChangeDescription={this.handleChangeDescription}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}    
                />
                <TodoList list={this.state.list} 
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPending={this.handleMarkAsPending}
                handleMarkAsPause={this.handleMarkAsPause}
                handleMarkAsResume={this.handleMarkAsResume}
                handleRemove={this.handleRemove} /> 
            </div>
        )
    }
}