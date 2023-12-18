import { useState, useEffect } from 'react'

export default function GameItem({ item, isTracked, btnFunction }){
    return (
        <div>
            <p>{`Title: ${item.title}`}</p>
            <p>{`Sale Price: ${item.salePrice}`}</p>
            <p>{`Normal Price: ${item.normalPrice}`}</p>
            <p>{`Steam Rating: ${item.steamRatingText} - ${item.steamRatingPercent}%`}</p>
            {<button onClick={() => btnFunction(item)}>{isTracked ? "Remove" : "Track"}</button>}
            <button>More Details</button>
        </div>
    )
}