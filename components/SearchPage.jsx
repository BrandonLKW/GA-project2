import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import GameItem from './GameItem';
import { getDailyDeals, getFilteredDeals } from '../util/CheapSharkAPI.js'

export default function SearchPage({ addTrackingItem, removeTrackingItem, checkIfTracked}){
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

    const clearFilter = () => {

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
                    <Col><Form.Label>Filter by Price range:</Form.Label></Col>
                    <Col><Form.Control name="lowerPriceInput" value={lowerPriceInput} onChange={handleLowerPriceInputEvent}/></Col>
                    <Col><Form.Label>-</Form.Label></Col>
                    <Col><Form.Control name="upperPriceInput" value={upperPriceInput} onChange={handleUpperPriceInputEvent}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Label>Filter by price range?</Form.Label></Col>
                    <Col><input value={usePriceFilter} type="checkbox" onChange={handlePriceFilterFlag}/></Col>
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
                <Row xs={3}>
                    {dealList.map((deal) => (<GameItem key={deal.gameID} item={deal} isTracked={checkIfTracked(deal.gameID)} btnFunction={checkIfTracked(deal.gameID) ? removeTrackingItem : addTrackingItem}/>))}
                </Row>
            </Container>
        </Container>
    )
}