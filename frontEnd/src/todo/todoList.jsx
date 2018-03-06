import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    
    const renderRows = () => {
        const list = props.list || []
        
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone':''}>
                <strong>{todo.title}</strong><br />
                <small>{todo.description}</small>
                </td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                    onClick={() => props.handleMarkAsDone(todo)}></IconButton>
                    <IconButton style='success' icon='pause-circle' hide={todo.pauseStatus}></IconButton>
                    <IconButton style='success' icon='play-circle' hide={!todo.done}></IconButton>
                    <IconButton style='warning' icon='undo' hide={!todo.done}
                    onClick={() => props.handleMarkAsPending(todo)}></IconButton>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done}
                    onClick={() => props.handleRemove(todo)}></IconButton>
                </td>
            </tr>
        ))
    }   

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}