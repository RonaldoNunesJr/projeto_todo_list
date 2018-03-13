import React from 'react'

export default props => {
    console.log(`props : ${props.list}`)
    
    const renderList = () => {
        const list = props.list || []
        console.log('list');
        return list.map(todo => {
            const showPause = !todo.done && !todo.pauseStatus
            const showMarkAsPending = todo.done && !todo.pauseStatus
            const showRemove = todo.done && !todo.pauseStatus
            console.log('todo', todo)
            return (
                <tr key={todo._id}>
                    <td className={todo.done ? 'markedAsDone':'' || todo.pauseStatus ? 'markedAsPaused':''}>
                        <strong>{todo.title}</strong><br />
                        <small>{todo.description}</small>
                    </td>
                    <td></td>
                </tr>
            )

        })
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
                {renderList()}
            </tbody>
        </table>
    )
}