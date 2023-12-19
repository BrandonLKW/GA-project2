import { useState } from 'react'
import { getGameDetails } from '../util/CheapSharkAPI.js'

export default function GameItem({ item, isTracked, btnFunction }){
    const [gameDetails, setGameDetails] = useState({});
    
    const onDlgBtnClick = async () => {
        const response = await getGameDetails(item.gameID);
        setGameDetails(response);

        const dialog = document.querySelector("#modal-" + item.gameID);
        dialog.showModal();
    }

    const onCloseDlgClick = () => {
        const dialog = document.querySelector("#modal-" + item.gameID);
        dialog.close();
    }

    return (
        <div>
            <p>{`Title: ${item.title}`}</p>
            <p>{`Sale Price: ${item.salePrice}`}</p>
            <p>{`Normal Price: ${item.normalPrice}`}</p>
            {!isTracked && <p>{`Steam Rating: ${item.steamRatingText} - ${item.steamRatingPercent}%`}</p>}
            <img src={item.thumb}></img>
            {<button onClick={() => btnFunction(item)}>{isTracked ? "Remove" : "Track"}</button>}
            <button onClick={onDlgBtnClick}>More Details</button>
            <dialog id={`modal-${item.gameID}`} className='modal'>
                <div className='modal-textbox'>
                    <h1>Game Details</h1>
                    <p>{`Title: ${item.title}`}</p>
                    <img src={item.thumb}></img>
                    {gameDetails?.deals?.map((detail) => {
                        return <div key={detail.gameID}>
                                    <p>{`Store: ${detail.storeID}`}</p>
                                    <p>{`Sale Price: ${detail.price}`}</p>
                                    <p>{`Normal Price: ${detail.retailPrice}`}</p>
                                </div>
                    })}
                    <button onClick={onCloseDlgClick}>Close</button>
                </div>
            </dialog>
        </div>
    )
}