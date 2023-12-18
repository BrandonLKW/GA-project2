import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import GameItem from './GameItem';

export default function TrackerPage({ trackerList, removeTrackingItem }){
    
    return (
        <div>
            <h2>Current List</h2>
            <Link to="/search">
                <button>Update List</button>
            </Link>
            {trackerList.map((item) => (<GameItem key={item.fields.title} item={item.fields} isTracked={true} btnFunction={removeTrackingItem}/>))}
        </div>
    )
}