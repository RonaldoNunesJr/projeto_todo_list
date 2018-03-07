import React from 'react'

export default props => {
    console.log(`props : ${props.list}`)
    
    const list = props.list || []

    return list.map(todo => {
        console.log(todo)
    })
}