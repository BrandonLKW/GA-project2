import './App.css'
import { Router, Routes, Route } from 'react-router-dom';
import TrackerPage from '../components/TrackerPage';
import SearchPage from '../components/SearchPage';

function App() {
  
  return (
    <>
      <h1>Game Hunter</h1> 
      <Routes>
        <Route path="/" element={<TrackerPage />}/>
        <Route path="/search" element={<SearchPage />}/>
      </Routes>
    </>
  )
}

export default App
