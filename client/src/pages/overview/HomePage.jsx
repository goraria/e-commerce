import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";
import Overview from "../../layouts/Overview.jsx";
import ProductItem from "../../components/product/ProductItem.jsx";
import apiHandler from "../../utils/apiHandler.jsx";

const banners = [
    { id: 0, name: "../assets/img/overviews/macbook.png", alt: "Out slide", title: "Sale Off 5-10%", description: "Developer love Mac" },
    // { id: 1, name: "../assets/img/overviews/mbp.jpeg", alt: "First slide", title: "Sale Off 5%", description: "Developer love Mac" },
    // { id: 2, name: "../assets/img/overviews/mba.jpeg", alt: "Second slide", title: "Sale Off 10%", description: "The best display ever in a laptop." },
    { id: 3, name: "../assets/img/overviews/xps.jpeg", alt: "Third slide", title: "Sale Off 12%", description: "Most beautiful Ultrabook" },
    // { id: 4, name: "../assets/img/overviews/pri.jpeg", alt: "Fourth slide", title: "Sale Off 8%", description: "The best Workstation" },
    { id: 5, name: "../assets/img/overviews/sfc.jpeg", alt: "Fifth slide", title: "Sale Off 15%", description: "Surface x Copilot" },
    // { id: 6, name: "../assets/img/overviews/yogabook.jpeg", alt: "Sixth slide", title: "Sale Off 20%", description: "Double Display" },
]

export default function HomePage() {
    // const [users, setUsers] = useState([]);
    // const [count, setCount] = useState(0);
    const [array, setArray] = useState([]);
    const [spotlights, setProductSpotlights] = useState([]);
    const [randoms, setProductRandoms] = useState([]);

    const fetchAPI = async () => {
        const response = await apiHandler.get("/api")
        // console.log(response.data.name)
        setArray(response.data.name)
    }

    const fetchProductSpotlight = async () => {
        try {
            const response = await apiHandler.get("/products/load-spotlight");

            setProductRandoms(response.data);
            // console.log(response.data);
        } catch (error) {

        }
    }

    const fetchProductTopSpotlight = async () => {
        try {
            const response = await apiHandler.get("/products/load-top-spotlight");

            setProductSpotlights(response.data);
            // console.log(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        // fetchAPI()
        fetchProductSpotlight();
        fetchProductTopSpotlight();
    }, []);

    return (
        <>
            <div className="container">
                <Carousel fade>
                    {banners.map((banner, index) => (
                        <Carousel.Item key={index}>
                            <Image
                                className="d-block w-100 object-fit-cover rounded-3"
                                src={banner.name}
                                alt={banner.alt}
                                style={{ height: '500px' }}
                            />
                            <Carousel.Caption>
                                <h3>{banner.title}</h3>
                                <p>{banner.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <Overview mt={4}>
                <h3 className="text-center m-0">Spotlight</h3>
            </Overview>
            <div className="container">
                <div className="row">
                    {spotlights.map((product, index) => (
                        <div key={index} className="col col-sm-12 col-md-6 col-xl-3 col-lg-4 mb-4">
                            <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <Overview>
                <h3 className="text-center m-0">Random</h3>
            </Overview>
            <div className="container">
                <div className="row">
                    {randoms.map((product, index) => (
                        <div key={index} className="col col-sm-12 col-md-6 col-xl-3 col-lg-4 mb-4">
                            <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}