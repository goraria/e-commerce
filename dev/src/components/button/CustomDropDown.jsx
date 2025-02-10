import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

const CustomDropDown = ({ category, onSelect }) => {
    return (
        <DropdownButton
            as={ButtonGroup}
            key={category.categorical}
            id={`dropdown-variants-${category.categorical}`}
            variant={category.variant}
            title={category.categorical}
        >
            {category.item.map((product, index) => (
                <Dropdown.Item 
                    eventKey={index} 
                    key={index} 
                    onClick={() => onSelect(category.categorical, product)}
                >
                    {product}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default CustomDropDown;
