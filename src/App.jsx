import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import TrackerPage from '../components/TrackerPage';
import SearchPage from '../components/SearchPage';
import { getTrackerList, addItem, removeItem } from '../util/TrackerTable.js'
import { getStoreList } from '../util/CheapSharkAPI.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

function App() {
  const [trackerList, setTrackerList] = useState([])
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    async function initApp(){
      setTrackerList(await getTrackerList());
      setStoreList(await getStoreList());
    }
    initApp();
  }, [])

  function checkIfTracked(gameID){
    return (trackerList.some((game) => game.fields.gameID === gameID));
  }

  function getStoreDetails(storeID){
    console.log(storeList);
    return (storeList.find((store) => (store.storeID === storeID)));
  }

  function addTrackingItem(item){
    async function add(){
      const newItem = await addItem(item);
      setTrackerList([newItem, ...trackerList]);
    }
    add();
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
    <Container>
      <h1 className="header">Steam Discounts Tracker</h1> 
      <Routes>
        <Route path="/" element={<TrackerPage trackerList={trackerList} removeTrackingItem={removeTrackingItem} checkIfTracked={checkIfTracked} getStoreDetails={getStoreDetails}/>}/>
        <Route path="/search" element={<SearchPage addTrackingItem={addTrackingItem} removeTrackingItem={removeTrackingItem} checkIfTracked={checkIfTracked} getStoreDetails={getStoreDetails}/>}/>
        <Route path="/search/:searchStr" element={<SearchPage addTrackingItem={addTrackingItem}/>}/>
      </Routes>
    </Container>
  )
}

export default App
