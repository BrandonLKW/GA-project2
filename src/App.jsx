import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import TrackerPage from '../components/TrackerPage';
import SearchPage from '../components/SearchPage';
import { getTrackerList, addItem, removeItem } from '../util/TrackerTable.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [trackerList, setTrackerList] = useState([])

  useEffect(() => {
    async function loadList(){
      setTrackerList(await getTrackerList());
    }
    loadList();
  }, [])

  function addTrackingItem(item){
    async function add(){
      const newItem = await addItem(item);
      setTrackerList([newItem, ...trackerList]);
    }
    add();
  }

  function checkIfTracked(gameID){
    return (trackerList.some((game) => game.fields.gameID === gameID));
  }

  function removeTrackingItem(item){
    let itemId = "";
    trackerList.forEach((trackedItem) => {
      if (trackedItem.fields.title === item.title){
        itemId = trackedItem.id;
      }
    });
    async function remove(){
      const removeResponse = await removeItem(itemId);
      setTrackerList(trackerList.filter((trackedItem) => (trackedItem.fields.title !== item.title)));
    }
    remove();
  }

  return (
    <>
      <h1>Steam Discounts Tracker</h1> 
      <Routes>
        <Route path="/" element={<TrackerPage trackerList={trackerList} removeTrackingItem={removeTrackingItem} checkIfTracked={checkIfTracked}/>}/>
        <Route path="/search" element={<SearchPage addTrackingItem={addTrackingItem} removeTrackingItem={removeTrackingItem} checkIfTracked={checkIfTracked}/>}/>
        <Route path="/search/:searchStr" element={<SearchPage addTrackingItem={addTrackingItem}/>}/>
      </Routes>
    </>
  )
}

export default App
