import {ListGroup} from 'react-bootstrap/';
import { useNavigate } from 'react-router-dom';

/**
 * This components requires:
 * - the list of filters labels to show, 
 * - the filter that is currenctly selected 
 * - the handler to notify a new selection
 */ 
const Filters = (props) => {
  const {items, selected} = props;
  const navigate = useNavigate();

  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);

  return (
    <ListGroup as="ul" variant="flush">
        {
          filterArray.map(([filterName, { label }]) => {
            return (
                <ListGroup.Item as="li" key={filterName} onClick={() => navigate(`/filters/${filterName}`)}
                action active={selected === filterName ? true : false} >
                    {label}
                </ListGroup.Item>
            );
          })
        }
    </ListGroup>
  )
}

export default Filters;
