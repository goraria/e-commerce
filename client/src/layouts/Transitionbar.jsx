import { Component } from "react";

import {
    Container, Button, Form, ButtonGroup, DropdownButton, Dropdown, Row, Col, Card, Image, Stack, Carousel, Nav, Navbar
} from 'react-bootstrap';

const clsifications = [
    { category: "Laptop", box: "bx-laptop", items: ['#a', '#b', '#c',] },
    { category: "Mouse", box: "bx-mouse-alt", items: ['#action1', '#action1', '#action1',] },
    { category: "Keyboard", box: "bxs-keyboard", items: ['#action1', '#action1', '#action1',] },

]

const Transitionbar = () => {
    return (
        <>
            <nav
                className="light bg-body-tertiary layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme mb-4 z-1"
                id="layout-navbar">
                <div className="container p-0">
                    <Stack direction="horizontal" gap={3}>
                        {
                            clsifications.map((cate, index) => (
                                <DropdownButton
                                    key={index}
                                    id="dropdown-basic-button"
                                    title={<><i className={`${cate.box} bx me-2`}></i><span>{cate.category}</span></>}
                                    variant="outline-primary"
                                >
                                    {
                                        cate.items.map((item, index) => (
                                            <Dropdown.Item as="a" href="#action1" key={index}>{item}</Dropdown.Item>
                                        ))
                                    }
                                </DropdownButton>
                            ))
                        }
                    </Stack>
                </div>
            </nav>
        </>
    )
}

class TransitionBar0 extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <Navbar fixed="top" bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary"
                        style={{marginTop: 56, zIndex: 1, display: "none"}}>
                    <Container>
                        <Stack direction="horizontal" gap={3}>
                            {clsifications.map((brandS, index) => <DropdownButton
                                key={index}
                                id="dropdown-basic-button"
                                title={<><FontAwesomeIcon icon={brandS.icon}
                                                          style={{width: 24}}/>{' '}{brandS.category}</>}
                                variant="outline-primary"
                            >
                                {brandS.items.map((item, index) => (
                                    <Dropdown.Item as="a" href="#action1" key={index}>{item}</Dropdown.Item>))}
                            </DropdownButton>)}
                        </Stack>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default Transitionbar