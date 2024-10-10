import React, {Component, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faBullseye, faCity, faLocationDot, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserSidebar from "./UserSidebar.jsx";
import AddressItem from "../elements/AddressItem.jsx";

function ListAddress() {
    return (
        <>
            <Container>
                <h2>List Address</h2>
            </Container>
        </>
    )
}

export default ListAddress