// import { Component } from "react";
// import {
//     Container, Button, Form, ButtonGroup, DropdownButton, Dropdown, Row, Col, Card, Image, Stack, Carousel,
//     DropdownItem,
//     FormGroup
// } from 'react-bootstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faPlus, faMinus
// } from '@fortawesome/free-solid-svg-icons';

// import jp from '../resources/images/jp.jpeg'
// class CardItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }

//     render() {
//         const { item } = this.props
//         return (
//             <Row className="align-items-center border-bottom py-3" style={{display:'flex'}}>
//                 {/* Product Image */}
//                 <Col md={2}>
//                     {/* <Image style={{ objectFit: 'cover', height: '84px', width: '84px' }} src='https://via.placeholder.com/300x200' alt="anh" fluid /> */}
//                     <div style={{ display: "flex", marginBottom: 16, justifyContent: 'left', }}>
//                         <Image
//                             className="d-block"
//                             src={jp}
//                             alt="Second slide"
//                             style={{ objectFit: 'cover', width: 112, height: 112, borderRadius: '5px' }}
//                         />
//                     </div>
//                 </Col>

//                 {/* Product Name and Specs */}
//                 <Col md={6} style={{ display: "", marginBottom: 16 }}>
//                     <h5>{item.name}</h5>
//                     <p>{item.description}</p>
//                     <p>${item.price}</p>
//                     {item.gift && (
//                         <div className="mt-2 p-2 bg-light">
//                             <Button variant="warning" size="sm">Tặng kèm</Button>
//                             <span className="ms-2">{item.gift.description}</span>
//                         </div>
//                     )}
//                 </Col>

//                 {/* Quantity Control */}
//                 <Col md={2} className="d-flex align-items-center">
//                     <Button variant="light" onClick={item.decrementQuantity}>
//                         <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
//                     </Button>
//                     {/* <div className="px-3">{item.quantity}</div> */}
//                     <Form style={{display:'flex', alignItems:'center',justifyContent:'center'}} >
//                         <Form.Control
//                             required
//                             type="text"
//                             placeholder="1"
//                             defaultValue={item.quantity}
//                             style={{margin:'0 8px', width:56 }}
//                         />
//                     </Form>

//                     <Button variant="light" onClick={item.incrementQuantity}>
//                         <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
//                     </Button>

//                 </Col>

//                 {/* Pricing */}
//                 <Col md={2} className="text-end">
//                     <p style={{ textDecoration: 'line-through', color: '#ccc' }}>
//                         {item.originalPrice}
//                     </p>
//                     <p style={{ color: '#f00', fontSize: '1.5em', fontWeight: 'bold' }}>
//                         {item.discountedPrice}
//                     </p>
//                 </Col>



//                 {/* Remove Button */}
//                 {/* <Col md={1} className="text-end">
//                     <Button variant="light" onClick={() => (item.id)}>Xóa</Button>
//                 </Col> */}

//             </Row>
//         )
//     }
// }

// export default CardItem
import React, { Component } from "react";
import { Container, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import jp from "../assets/images/jp.jpeg";

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <Row
        className="align-items-center border-bottom py-3"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {/* Product Image */}
        <Col xs={12} md={2} className="d-flex justify-content-center justify-content-md-start">
          <Image
            src={jp}
            alt="Product"
            style={{ objectFit: "cover", width: 112, height: 112, borderRadius: '5px' }}
          />
        </Col>

        {/* Product Name and Specs */}
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center text-md-start text-center">
          <h5>{item.name}</h5>
          <p>{item.description}</p>
          <p>${item.price}</p>
          {item.gift && (
            <div className="mt-2 p-2 bg-light">
              <Button variant="warning" size="sm">
                Tặng kèm
              </Button>
              <span className="ms-2">{item.gift.description}</span>
            </div>
          )}
        </Col>

        {/* Quantity Control */}
        <Col xs={12} md={2} className="d-flex align-items-center justify-content-center justify-content-md-start">
          <Button variant="light" onClick={item.decrementQuantity}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Form className="d-flex align-items-center justify-content-center mx-2">
            <Form.Control
              type="text"
              placeholder="1"
              defaultValue={item.quantity}
              style={{ width: 56, textAlign: "center" }}
            />
          </Form>
          <Button variant="light" onClick={item.incrementQuantity}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>

        {/* Pricing */}
        <Col xs={12} md={2} className="text-md-end text-center">
          {item.originalPrice && (
            <p style={{ textDecoration: "line-through", color: "#ccc" }}>
              {item.originalPrice}
            </p>
          )}
          <p style={{ color: "#f00", fontSize: "1.5em", fontWeight: "bold" }}>
            {item.discountedPrice}
          </p>
        </Col>
      </Row>
    );
  }
}

export default CardItem;
