import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import GameItem from './GameItem';

const url = "https://api.airtable.com/v0/appWZvsEwJf39rvPj/"
const token = "pat9S6BvHzANBKdhl.8c153b23367081b544a48b4910dc5b76502519217285ea80df57be6bbc439bd6";
// const testData = [
//   {
//     title: "test 1"
//   },
//   {
//     title: "test 2"
//   },
//   {
//     title: "test 3"
//   }
// ]

export default function TrackerPage(){
    const [trackerList, setTrackerList] = useState([])

    useEffect(() => {
      async function getTrackerList(){
        const tableUrl = url + "Tracker?maxRecords=3&view=Grid%20view"
        const response = await fetch(tableUrl, {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setTrackerList(data.records);
      }
      getTrackerList();
    }, [])

    return (
        <div>
            <h2>Current List</h2>
            <Link to="/search">
                <button>Update List</button>
            </Link>
            {trackerList.map((item) => (<GameItem key={item.fields.title} item={item.fields}/>))}
        </div>
    )
}