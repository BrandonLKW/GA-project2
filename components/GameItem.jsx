import { useState, useEffect } from 'react'

export default function GameItem({ item, isTracked, btnFunction }){
    return (
        <div>
            <p>{`Title: ${item.title}`}</p>
            {<button onClick={() => btnFunction(item)}>{isTracked ? "Remove" : "Track"}</button>}
        </div>
    )
}