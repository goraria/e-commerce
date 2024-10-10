import React, {Component} from "react";
import {Button, Carousel, Col, Container, Dropdown, Form, Image, Row} from "react-bootstrap";
import {
    faApple, faMeta, faGoogle, faTwitter, faXTwitter, faGithub
} from '@fortawesome/free-brands-svg-icons';
import SocialFormButton from "../elements/SocialFormButton.jsx";

import jp from "../assets/images/jp.jpeg";
import {Link} from "react-router-dom";

const sclItems = [
    // { id: 0, name: "Github", icon: faGithub, color: "secondary" },
    { id: 1, name: "Apple", icon: faApple, color: "dark" },
    { id: 2, name: "Google", icon: faGoogle, color: "success" },
    { id: 3, name: "Meta", icon: faMeta, color: "primary" },
    // { id: 4, name: "Twitter", icon: faTwitter },
]

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{marginTop: 112}}>
                <div>
                    <Container style={{padding: '0, 12px'}}>
                        <Row style={{
                            padding: '15px 12px 15px 12px',
                            margin: '0',
                            borderRadius: 10,
                            backgroundColor: '#f8f9fa', // backgroundColor: '#eaedf0'
                        }}>
                            <div>
                                <h3>Sign up</h3>
                                <div style={{display: "flex", marginBottom: 16, justifyContent: 'center'}}>
                                    <Image
                                        className="d-block"
                                        src={jp}
                                        alt="Second slide"
                                        style={{objectFit: 'cover', width: 224, height: 224, borderRadius: '5px'}}
                                    />
                                </div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"/>
                                        {/*<Form.Text className="text-muted">*/}
                                        {/*    We'll never share your email with anyone else.*/}
                                        {/*</Form.Text>*/}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"/>
                                    </Form.Group>
                                    {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                                    {/*    <Form.Check type="checkbox" label="Remember Account"/>*/}
                                    {/*</Form.Group>*/}
                                    <Row className="mb-3">
                                        <Col xs={6}>
                                            <Form.Check type="checkbox" label="Remember Account"/>
                                        </Col>
                                        <Col xs={6} className="text-end">
                                            <Button variant="link" style={{padding: 0, color: '#dc3545', textDecoration: "none", fontWeight: 'bold'}}>
                                                Forgot password?
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Link to="/register">
                                        <Button variant="danger" type="submit" className="mb-3" style={{width: '100%'}}>
                                            Sign up
                                        </Button>
                                    </Link>
                                    <hr/>
                                    <div className="text-center" style={{marginBottom: 16}}>or sign up with</div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                        {sclItems.map(socialItem => (
                                            <SocialFormButton key={socialItem.id} socialItems={socialItem}/>
                                        ))}
                                    </div>
                                    <hr/>
                                    <div className="text-center" style={{marginBottom: 16}}>
                                        you have an acoount
                                        <Link to="/login">
                                            <Button variant="link" style={{
                                                padding: 0,
                                                color: '#dc3545',
                                                textDecoration: "none",
                                                fontWeight: 'bold',
                                                paddingLeft: 4
                                            }}>Log in</Button>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Signup