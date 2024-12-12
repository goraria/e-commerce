import React, {Component} from "react";
import {Button} from "react-bootstrap";

const SocialFormButton = ({ socialItems }) => {
    return (
        <Button
            variant={socialItems.color} type="button"
            style={{flex: '1', margin: '0 5px', minWidth: '120px'}}
        >
            {/*<FontAwesomeIcon icon={socialItems.icon} style={{width: 24}}/>*/}
            {socialItems.name}
        </Button>
    )
}

class SocialFormButton0 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { socialItems } = this.props;

    }
}

export default SocialFormButton