import { Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import GameItem from './GameItem';

export default function TrackerPage({ trackerList, removeTrackingItem, checkIfTracked }){
    return (
        <Container>
            <h2>Current Tracked Games:</h2>
            <Link to="/search">
                <Button>Update List</Button>
            </Link>
            {trackerList.map((item) => (<GameItem key={item.fields.title} item={item.fields} isTracked={checkIfTracked(item.fields.gameID)} btnFunction={removeTrackingItem}/>))}
        </Container>
    )
}