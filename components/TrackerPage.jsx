import { Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import GameItem from './GameItem';

export default function TrackerPage({ trackerList, removeTrackingItem, checkIfTracked, getStoreDetails }){
    return (
        <Container>
            <Link to="/search">
                <Button>Update List</Button>
            </Link>
            <hr/>
            <Row xs="auto" className="smallRowPadding">
              <h2>Current Tracked Games:</h2>
            </Row>
            <Row xs={3}>
              {trackerList.map((item) => (<GameItem key={item.fields.title} item={item.fields} isTracked={checkIfTracked(item.fields.gameID)} btnFunction={removeTrackingItem} getStoreDetails={getStoreDetails}/>))}
            </Row>
        </Container>
    )
}