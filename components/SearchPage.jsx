import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import GameItem from './GameItem';
import { getDailyDeals, getFilteredDeals } from '../util/CheapSharkAPI.js'

export default function SearchPage({ addTrackingItem }){
    const [dealList, setDealList] = useState([])
    const [titleInput, setTitleInput] = useState("");
    const [usePriceFilter, setUsePriceFilter] = useState(false);
    const [lowerPriceInput, setLowerPriceInput] = useState(0);
    const [upperPriceInput, setUpperPriceInput] = useState(15);

    useEffect(() => {
        //load daily dails as initial landing page
        async function loadSearch(){
        setDealList(await getDailyDeals());
        }
        loadSearch();
    }, [])

    const handleTitleInputEvent = (event) => {
        setTitleInput(event.target.value);
    };

    const handlePriceFilterFlag = (event) => {
        setUsePriceFilter(event.target.checked);
    }

    const handleLowerPriceInputEvent = (event) => {
        setLowerPriceInput(event.target.value);
    };

    const handleUpperPriceInputEvent = (event) => {
        setUpperPriceInput(event.target.value);
    };

    const searchFilter = async () => {
        let filterStrArray = [];
        if (titleInput){
            filterStrArray.push("title=" + titleInput);
        }
        if (usePriceFilter){
            filterStrArray.push("lowerPrice=" + lowerPriceInput + "&upperPrice=" + upperPriceInput);
        }
        if (filterStrArray.length > 0){
            console.log(filterStrArray.join("&"));
            setDealList(await getFilteredDeals(filterStrArray.join("&")));
        }
    };

    return (
        <div>
            <div>
                <label>
                    Filter by Title: <input name="titleInput" value={titleInput} onChange={handleTitleInputEvent}/>
                </label>
                <br/>   
                <label>
                    Filter by Price range: 
                    <input name="lowerPriceInput" value={lowerPriceInput} onChange={handleLowerPriceInputEvent}/> 
                    to 
                    <input name="upperPriceInput" value={upperPriceInput} onChange={handleUpperPriceInputEvent}/>
                </label>
                <label>
                    Filter by price range? <input value={usePriceFilter} type="checkbox" onChange={handlePriceFilterFlag}/>
                </label>
                
                <button onClick={searchFilter}>Search</button>
            </div>
            <Link to="/">
                <button>Home</button>
            </Link>
            <hr />
            <h2>Deals:</h2>
            {dealList.map((deal) => (<GameItem key={deal.gameID} item={deal} isTracked={false} btnFunction={addTrackingItem}/>))}
        </div>
    )
}