import { Button, ButtonGroup, Container, Dropdown, Form, Row, Col } from 'react-bootstrap'
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
    const [filterType, setFilterType] = useState("Title");
    const [filterOrder, setFilterOrder] = useState("Ascending");

    useEffect(() => {
        //load daily dails as initial landing page
        async function loadSearch(){
            setDealList(sortDealList(filterType, filterOrder, await getDailyDeals()));
        }
        loadSearch();
    }, []);

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
        if (event.target.value){
            setUpperPriceInput(event.target.value);
        } else{
            setUpperPriceInput(15);
        }
    };

    const filterTypeEvent = (event) => {
        const type = event.target.innerHTML;
        setDealList(sortDealList(type, filterOrder, dealList));
        setFilterType(type);
    }

    const filterOrderEvent = (event) => {
        const order = event.target.innerHTML;
        setDealList(sortDealList(filterType, order, dealList));
        setFilterOrder(order);
    }

    const clearFilter = () => {
        setTitleInput("");
        setUsePriceFilter(false);
        setLowerPriceInput(0);
        setUpperPriceInput(15);
        setFilterType("Title");
        setFilterOrder("Ascending");
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
            setDealList(sortDealList(filterType, filterOrder, await getFilteredDeals(filterStrArray.join("&"))));
        }
    };

    const sortDealList = (type, order, list) => {
        let sortingList = list;
        switch (type){
            case "Sale Price":
                sortingList = list.sort((a,b) => parseFloat(a.salePrice) - parseFloat(b.salePrice)); //lowest price on top
                break;
            case "Steam Rating":
                sortingList = list.sort((a,b) => parseFloat(b.steamRatingPercent) - parseFloat(a.steamRatingPercent)); //Highest rating on top
                break;
            default: //default is title
                sortingList = list.sort((a,b) => {
                    if (a.title < b.title){
                        return -1;
                    }
                    if (a.title > b.title){
                        return 1;
                    }
                    return 0;
                }); //alphabetically 
                break;
        }
        if (order === "Descending"){
            sortingList.reverse();
        }
        return sortingList;
    }

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
                    <Col><Form.Label className="verticalTextAlign">By Title:</Form.Label></Col>
                    <Col><Form.Control name="titleInput" value={titleInput} onChange={handleTitleInputEvent}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Label>By sale price range?</Form.Label></Col>
                    <Col><input value={usePriceFilter} type="checkbox" onChange={handlePriceFilterFlag}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Form.Control name="lowerPriceInput" value={lowerPriceInput} onChange={handleLowerPriceInputEvent} type="number" disabled={!usePriceFilter}/></Col>
                    <Col><Form.Label>-</Form.Label></Col>
                    <Col><Form.Control name="upperPriceInput" value={upperPriceInput} onChange={handleUpperPriceInputEvent} type="number" disabled={!usePriceFilter}/></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><Button className="searchButtonWidth" onClick={clearFilter}>Clear</Button></Col>
                    <Col><Button className="searchButtonWidth" onClick={searchFilter}>Search</Button></Col>
                </Row>
            </Container>
            <hr />
            <Container>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col><h2>Available Deals</h2></Col>
                </Row>
                <Row xs="auto" className="align-items-center smallRowPadding">
                    <Col>Sort By:</Col>
                    <Col>
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success">{filterType}</Button>
                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={filterTypeEvent}>Title</Dropdown.Item>
                                <Dropdown.Item onClick={filterTypeEvent}>Sale Price</Dropdown.Item>
                                <Dropdown.Item onClick={filterTypeEvent}>Steam Rating</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success">{filterOrder}</Button>
                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={filterOrderEvent}>Ascending</Dropdown.Item>
                                <Dropdown.Item onClick={filterOrderEvent}>Descending</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                {dealList?.length <= 0 && 
                <Row xs="auto">No results found.</Row>}
                {dealList?.length > 0 && 
                <Row xs={3}>
                    {dealList?.map((deal) => (<GameItem key={deal.gameID} item={deal} isTracked={checkIfTracked(deal.gameID)} btnFunction={checkIfTracked(deal.gameID) ? removeTrackingItem : addTrackingItem} getStoreDetails={getStoreDetails}/>))}
                </Row>}
            </Container>
        </Container>
    )
}