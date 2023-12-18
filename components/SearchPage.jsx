import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import GameItem from './GameItem';

export default function SearchPage(){
    const [dailyDealList, setDailyDealList] = useState([])

    useEffect(() => {
      async function getDailyDeal(){
        const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
        const newList = await response.json();
        setDailyDealList(newList);
      }
      getDailyDeal();
    }, [])

    return (
        <div>
            <h2>Current List</h2>
            <Link to="/">
                <button>Home</button>
            </Link>
            {dailyDealList.map((deal) => (<GameItem key={deal.gameId} item={deal}/>))}
        </div>
    )
}