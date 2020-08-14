import React from 'react'
import cl from './ErrorBlock.module.scss';

export default function ErrorBlock({
    children
}) {
    return (
        <div className={cl.error}>
                {children}
        </div>
    )
}
