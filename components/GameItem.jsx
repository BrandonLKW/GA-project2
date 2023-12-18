import { useState, useEffect } from 'react'

export default function GameItem({ item }){

    return (
        <div>
            <p>{`Title: ${item.title}`}</p>
        </div>
    )
}