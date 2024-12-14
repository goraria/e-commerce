import React, {Component, useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import {Container, Image, Row} from "react-bootstrap";

import jp from '../../assets/images/jp.jpeg'
import Overview from "../../layouts/Overview.jsx";

const Blank = () => {
    return (
        <Overview>
            <div>
                <h5>Cipher</h5>
                <div style={{display: "flex", marginBottom: 16, justifyContent: 'center'}}>
                    <img
                        className="d-block"
                        src={jp}
                        alt="Second slide"
                        style={{objectFit: 'cover', width: 224, height: 224, borderRadius: '5px'}}
                    />
                </div>
                <h1 style={{textAlign: "center"}}>Blank Page.</h1>
            </div>
        </Overview>
    )
}

export default Blank