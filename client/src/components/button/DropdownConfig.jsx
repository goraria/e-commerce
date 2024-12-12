import React, {Component} from "react";
import {ButtonGroup, DropdownButton, DropdownItem, DropdownMenu, NavDropdown} from "react-bootstrap";

const dItems = [
    {id: 1, title: "", align: 'end-or-start', item: [
        {key: 1, name: "Dropdown", href: "/"}
    ]}
]

class DropdownConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { dropdownContains } = this.props;
        return (
            <DropdownButton
                as={ButtonGroup}
                title={dropdownContains.title}
                align={{ lg: dropdownContains.align }}
                variant={'danger'}
                className={dropdownContains.className}
                id="dropdown-menu-align-responsive-1">
                {/*<DropdownMenu style={{padding: 0}}>*/}
                {dropdownContains.item.map((dropdownItem) => (
                    <DropdownItem key={dropdownItem.key} href={dropdownItem.href}>{dropdownItem.name}</DropdownItem>
                ))}
                {/*</DropdownMenu>*/}
            </DropdownButton>
        )
    }
}

export default DropdownConfig;