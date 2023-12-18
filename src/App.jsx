import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [dailyDealList, setDailyDealList] = useState([])

  useEffect(() => {
    async function getDailyDeal(){
      const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
      const newList = await response.json();
      console.log(response);
      console.log(newList);
      setDailyDealList(newList);
    }
    getDailyDeal();
  })

  return (
    <>
      <h1>Game Hunter</h1> 
      {dailyDealList.map((deal) => (deal.title))}
    </>
  )
}

export default App
