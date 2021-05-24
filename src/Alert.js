
import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert, list }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000)
        return () => clearTimeout(timeout)
    }, [list])
    return (
        <div className={`classes.${type}`}>
            <p>{msg}</p>
        </div>
    )
}

export default Alert
