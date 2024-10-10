import React, { Component } from "react";
import {Container, Button, Form, Row, Col, Image, Card, InputGroup} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faMinus, faAt, faUser, faPhone} from "@fortawesome/free-solid-svg-icons";
import jp from "../assets/images/jp.jpeg";
import UserSidebar from "../components/UserSidebar.jsx";
import AccountInfo from "../components/AccountInfo.jsx";

class AddressItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { item } = this.props;
        return (
            <Container>
                <div>{item.city}</div>
                <div>{item.country}</div>
            </Container>
        );
    }
}

export default AddressItem;
