import React, {useEffect} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import jp from "../../public/assets/img/overviews/jp.jpeg";

const Overview = ({ children, mt }) => {
    useEffect(() => {
        Main();
    }, [])

    return (
        <>
            <div className={`container flex-grow-1 mb-4 mt-${mt}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overview