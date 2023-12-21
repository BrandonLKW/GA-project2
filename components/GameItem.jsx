import { Container, Modal } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react'
import { getGameDetails } from '../util/CheapSharkAPI.js'
import { Button } from 'react-bootstrap'

export default function GameItem({ item, isTracked, btnFunction, getStoreDetails }){
    const [gameDetails, setGameDetails] = useState({});
    const [showModal, setShowModal] = useState(false);

    const getDiscount = (normal, discount) => {
        return Math.round(((normal - discount) / normal) * 100);
    }
    
    const showDetails = async () => {
        const response = await getGameDetails(item.gameID);
        setGameDetails(response);
        setShowModal(true);
    }

    const hideDetails = () => {
        setShowModal(false);
    }

    return (
        <Col>
            <Container className='border border-info rounded gameItem'>
                <Row md="auto" className="smallRowPadding">
                    <Col className="gameItemTitle">{`${item.title}`}</Col>
                </Row>
                <Row className="gameItemImage"><img src={item.thumb}></img></Row>
                <Row className="smallRowPadding">
                    <Col>{item.steamRatingText && `Steam Rating: ${item.steamRatingText} - ${item.steamRatingPercent}%`}</Col>
                </Row>
                <Row xs="auto" className="smallRowPadding">
                    <Col>{`Sale Price: $${item.salePrice}`}</Col>
                    <Col>{`Normal Price: $${item.normalPrice}`}</Col>
                </Row>
                <Row xs="auto" className="smallRowPadding">
                    <Col>{`Current Discount of ${getDiscount(item.normalPrice, item.salePrice)}%`}</Col>
                </Row>
                <Row xs="auto" className="smallRowPadding">
                    <Col>{<Button onClick={() => btnFunction(item)}>{isTracked ? "Remove" : "Track"}</Button>}</Col>
                    <Col><Button onClick={showDetails}>More Details</Button></Col>
                </Row>
                <Modal show={showModal} onHide={hideDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>Additional Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row xs="auto" className="gameItemTitle">{`${item.title}`}</Row>
                            <Row><img src={item.thumb} /></Row>
                            {gameDetails?.deals?.map((detail) => {
                                return <Container key={detail.gameID} className='gameItemDetailPad'>
                                            <Row xs="auto" className="smallRowPadding gameItemDetailSubHeader">{`Store: ${getStoreDetails(detail.storeID).storeName}`}</Row>
                                            <Row xs="auto" className="smallRowPadding">{`Sale Price: $${detail.price}`}</Row>
                                            <Row xs="auto" className="smallRowPadding">{`Normal Price: $${detail.retailPrice}`}</Row>
                                            <Row xs="auto" className="smallRowPadding">{`Current Discount of ${getDiscount(detail.retailPrice, detail.price)}%`}</Row>
                                        </Container>
                            })}
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={hideDetails}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Col>
    )
}