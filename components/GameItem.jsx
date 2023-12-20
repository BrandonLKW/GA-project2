import { Container, Modal } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react'
import { getGameDetails } from '../util/CheapSharkAPI.js'
import { Button } from 'react-bootstrap'

export default function GameItem({ item, isTracked, btnFunction }){
    const [gameDetails, setGameDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    
    const showDetails = async () => {
        const response = await getGameDetails(item.gameID);
        setGameDetails(response);
        setShowModal(true);
    }

    const hideDetails = () => {
        setShowModal(false);
    }

    return (
        <Container className='gameItemPad'>
            <Row md="auto">{`Title: ${item.title}`}</Row>
            <Row xs="auto">
                <Col>{`Sale Price: ${item.salePrice}`}</Col>
                <Col>{`Normal Price: ${item.normalPrice}`}</Col>
            </Row>
            {item.steamRatingText && <Row>{`Steam Rating: ${item.steamRatingText} - ${item.steamRatingPercent}%`}</Row>}
            <img src={item.thumb}></img>
            {<Button onClick={() => btnFunction(item)}>{isTracked ? "Remove" : "Track"}</Button>}
            <Button onClick={showDetails}>More Details</Button>
            <Modal show={showModal} onHide={hideDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>{`Title: ${item.title}`}</Row>
                        <Row><img src={item.thumb} /></Row>
                        {gameDetails?.deals?.map((detail) => {
                            return <Container key={detail.gameID} className='gameItemDetailPad'>
                                        <Row>{`Store: ${detail.storeID}`}</Row>
                                        <Row>{`Sale Price: ${detail.price}`}</Row>
                                        <Row>{`Normal Price: ${detail.retailPrice}`}</Row>
                                    </Container>
                        })}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={hideDetails}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}