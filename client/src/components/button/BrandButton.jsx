import React from "react";
import { Button } from "react-bootstrap";

export const BrandButton = ({ brand, onSelect }) => {
    return (
        <>
            <div className="btn-group">
                <Button
                    aria-label='Click me'
                    type="button"
                    variant={"outline-primary"}
                    // variant={variant}
                    className="dropdown-toggle hide-arrow"
                    // btn btn-primary
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {brand}
                </Button>
            </div>
        </>
    );
};
