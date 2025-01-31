import { Component } from "react";

import {
    Container, DropdownButton, Dropdown, Stack, Navbar
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

export default Transitionbar