import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import GameItem from './GameItem';

export default function TrackerPage({ trackerList, removeTrackingItem, checkIfTracked }){
    return (
        <div>
            <h2>Current Tracked Games:</h2>
            <Link to="/search">
                <button>Update List</button>
            </Link>
            {trackerList.map((item) => (<GameItem key={item.fields.title} item={item.fields} isTracked={checkIfTracked(item.fields.gameID)} btnFunction={removeTrackingItem}/>))}
        </div>
    )
}