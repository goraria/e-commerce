import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const SocialFormButton = ({ element }) => {
    return (
        <Button
            variant={element.color} type="button"
            className="flex-grow-1 w-100"
            style={{minWidth: '120px'}}
        >
            <i className={`${element.box} me-2`}></i>
            {element.name}
        </Button>
    )
}

export default SocialFormButton;