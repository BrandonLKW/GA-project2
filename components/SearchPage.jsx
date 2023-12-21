import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import GameItem from './GameItem';
import { getDailyDeals, getFilteredDeals } from '../util/CheapSharkAPI.js'

export default function SearchPage({ addTrackingItem, removeTrackingItem, checkIfTracked, getStoreDetails}){
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
        if (event.target.value){
            setLowerPriceInput(event.target.value);
        } else{
            setLowerPriceInput(0);
        }
        
    };

    const handleUpperPriceInputEvent = (event) => {
        setUpperPriceInput(event.target.value);
    };

    const clearFilter = () => {
        setTitleInput("");
        setUsePriceFilter(false);
        setLowerPriceInput(0);
        setUpperPriceInput(15);
    }

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
        <Container>
            <Link to="/">
                <Button>Return to Tracker</Button>
            </Link>
            <hr />
            <Container>
                <Row xs="auto" className="smallRowPadding">
                    <h2>Search by Filters:</h2>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Label className="verticalTextAlign">Filter by Title:</Form.Label></Col>
                    <Col><Form.Control name="titleInput" value={titleInput} onChange={handleTitleInputEvent}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Label>Filter by sale price range?</Form.Label></Col>
                    <Col><input value={usePriceFilter} type="checkbox" onChange={handlePriceFilterFlag}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Label>Filter by Sale Price range:</Form.Label></Col>
                    <Col><Form.Control name="lowerPriceInput" value={lowerPriceInput} onChange={handleLowerPriceInputEvent} type="number" disabled={!usePriceFilter}/></Col>
                    <Col><Form.Label>-</Form.Label></Col>
                    <Col><Form.Control name="upperPriceInput" value={upperPriceInput} onChange={handleUpperPriceInputEvent} type="number" disabled={!usePriceFilter}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Button onClick={clearFilter}>Clear</Button></Col>
                    <Col><Button onClick={searchFilter}>Search</Button></Col>
                </Row>
            </Container>
            <hr />
            <Container>
                <Row xs="auto" className="smallRowPadding">
                    <h2>Deals:</h2>
                </Row>
                {dealList.length <= 0 && 
                <Row xs="auto">No results found.</Row>}
                {dealList.length > 0 && 
                <Row xs={3}>
                    {dealList.map((deal) => (<GameItem key={deal.gameID} item={deal} isTracked={checkIfTracked(deal.gameID)} btnFunction={checkIfTracked(deal.gameID) ? removeTrackingItem : addTrackingItem} getStoreDetails={getStoreDetails}/>))}
                </Row>}
            </Container>
        </Container>
    )
}