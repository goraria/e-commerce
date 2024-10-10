import {Link} from 'react-router-dom'
import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { noAuto } from "@fortawesome/fontawesome-svg-core"
import jp from '../assets/images/jp.jpeg'

const obj_test = {
    name: "Product 1",
    price: "5$",
    description: "A long description that should be truncated...",
    image: "src",
    rating: 4.5 // Example rating
};

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Function to render stars based on rating using Font Awesome
    renderStars(rating) {
        // Sanitize rating to be between 0 and 5
        const sanitizedRating = Math.max(0, Math.min(rating, 5));
        const fullStars = Math.floor(sanitizedRating); // Full stars count
        const halfStar = sanitizedRating % 1 >= 0.1 ? 1 : 0; // Half-star check
        const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

        // Ensure valid star counts
        return (

            <>
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <FontAwesomeIcon key={`full-${i}`} icon={faStar} color="#f39c12" />
                ))}
                {/* Half star */}
                {halfStar === 1 && <FontAwesomeIcon icon={faStarHalfAlt} color="#f39c12" />}
                {/* Empty stars */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} color="#f39c12" />
                ))}
            </>
        );
    }

    render() {
        const { obj } = this.props;
        const { cardWidth } = this.state;
        const imageHeight = (1/ 8) * cardWidth;
        return (
            <Link to={`/product?id=${obj.id}`} style={{ textDecoration: 'none' }}>
                <Card style={{ border: 'none', backgroundColor: '#f8f9fa', borderRadius:10 }}>
                    <Card.Img variant="top" src={jp} style={{height:{imageHeight}, width:{cardWidth}, objectFit:'cover'}} />
                    <Card.Body>
                        {/* Price and Name in the same line */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Card.Title style={{
                                marginBottom: '0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {obj.product_name}
                            </Card.Title>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${obj.price}</span>
                        </div>

                        {/* Truncated Description */}
                        <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {obj.description}
                        </Card.Text>

                        {/* Rating and Buy Button */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Rating Section */}
                            <div style={{ color: '#f39c12', fontSize: '1.2rem' }}>
                                {this.renderStars(obj.rating)}
                            </div>
                            {/* Buy Button */}
                            <Button variant="danger">
                                <FontAwesomeIcon icon={faCartPlus} style={{ width: 56 }} />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Link>

        );
    }
}

export default ProductItem;
