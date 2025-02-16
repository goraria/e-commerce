import {Badge, Pagination} from "react-bootstrap";
import React from "react";

export const renderRatingStar = (rating) => {
    // Sanitize rating to be between 0 and 5
    const sanitizedRating = Math.max(0, Math.min(rating, 5));
    const fullStars = Math.floor(sanitizedRating); // Full stars count
    const halfStar = sanitizedRating % 1 >= 0.1 ? 1 : 0; // Half-star check
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    // Ensure valid star counts // bx-sm
    return (
        <>
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
                <i key={`full-${index}`} className='bx bxs-star'></i>
            ))}
            {/* Half star */}
            {halfStar === 1 && <i className='bx bxs-star-half' key="half" />}
            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <i key={`empty-${index}`} className='bx bx-star'></i>
            ))}
        </>
    );
};

export const renderStatusDelivery = (status) => {
    switch (status) {
        case 5: // "Delivered"
            return <Badge bg="label-success">Delivered</Badge>;
        case 0: // "Ordered"
            return <Badge bg="label-warning">Ordered</Badge>;
        case 3: // "Dispatched"
            return <Badge bg="label-primary">Dispatched</Badge>;
        case 1: // "Pickup"
            return <Badge bg="label-info">Pickup</Badge>;
        case 6: // "Rejected"
            return <Badge bg="label-danger">Rejected</Badge>;
        case 2: // "Arrival"
            return <Badge bg="label-dark">Arrival</Badge>;
        case 4: // "Arrival"
            return <Badge bg="label-secondary">Arrival</Badge>;
        default:
            return <Badge bg="label-light">{status}</Badge>;
    }
};

export const renderProductColor = (status) => {
    switch (status) {
        case 5: // "Delivered"
            return <Badge bg="label-success">Delivered</Badge>;
        case 0: // "Ordered"
            return <Badge bg="label-warning">Ordered</Badge>;
        case 3: // "Dispatched"
            return <Badge bg="label-primary">Dispatched</Badge>;
        case 1: // "Pickup"
            return <Badge bg="label-info">Pickup</Badge>;
        case 6: // "Rejected"
            return <Badge bg="label-danger">Rejected</Badge>;
        case 2: // "Arrival"
            return <Badge bg="label-dark">Arrival</Badge>;
        case 4: // "Arrival"
            return <Badge bg="label-secondary">Arrival</Badge>;
        default:
            return <Badge bg="label-light">{status}</Badge>;
    }
};