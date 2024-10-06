// import React, { useEffect, useState } from "react";
// import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
// import { getProductDetail } from "../../redux/silce/customer/productSilce";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { UrlImage } from "../../url";
// import { FaStar } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { addTocartDetail } from "../../redux/silce/customer/cartSlice";
// import { FaUserCircle } from "react-icons/fa";

// const ProductDetail = () => {
//   const URL_IMAGE = UrlImage();
//   let { product_id } = useParams();
//   const dispatch = useDispatch();
//   const { rate, productDetail, countRate, countStar } = useSelector(
//     (state) => state.customer.product
//   );
//   const [quantity, setQuantity] = useState(1);
//   useEffect(() => {
//     dispatch(getProductDetail(product_id));
//   }, []);
//   const addTocartClick = (product, cartQuantity) => {
//     let product_cart = { ...product, cartQuantity: cartQuantity };
//     dispatch(addTocartDetail(product_cart));
//     setQuantity(1);
//   };
//   const displayRate = (rate) => {
//     let starContent;
//     switch (rate) {
//       case 1:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 2:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 3:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 4:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 5:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       default:
//         starContent = <div>Invalid star value</div>;
//         break;
//     }

//     return <div>{starContent}</div>;
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getUTCFullYear();
//     const month = `0${date.getUTCMonth() + 1}`.slice(-2);
//     const day = `0${date.getUTCDate()}`.slice(-2);

//     return `${day}/${month}/${year}`;
//   };
//   return (
//     <>
//       {productDetail && countStar && (
//         <div
//           style={{ marginBottom: "50px", marginTop: "20px" }}
//           className="container"
//         >
//           <h3 style={{ marginBottom: "40px", color: "gray" }}>
//             CHI TIẾT SẢN PHẨM
//           </h3>
//           <div className="row">
//             <div className="col-6">
//               <div style={{ width: "60%" }}>
//                 <MDBCarousel showControls>
//                   <MDBCarouselItem itemId={1}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                   <MDBCarouselItem itemId={2}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                   <MDBCarouselItem itemId={3}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                 </MDBCarousel>
//               </div>
//             </div>
//             <div className="col-6">
//               <div>
//                 <p style={{ fontSize: "20px" }}>{productDetail.name}</p>
//               </div>
//               <div>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     color: "#9c6644  ",
//                     fontSize: "18px",
//                   }}
//                 >
//                   {productDetail.price.toLocaleString("vi-VN")} đ
//                 </p>
//               </div>
//               <div>
//                 <p
//                   style={{
//                     marginBottom: "10xp",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Mô tả:
//                 </p>
//                 <p style={{ textAlign: "justify", fontSize: "15px" }}>
//                   {productDetail.description}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   marginBottom: "10xp",
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Số lượng:
//               </div>
//               <div>
//                 <input
//                   style={{ width: "10%" }}
//                   className="form-control"
//                   type="number"
//                   min="1"
//                   max="100"
//                   step="1"
//                   value={quantity}
//                   onChange={(event) => setQuantity(event.target.value)}
//                 />
//               </div>
//               <div style={{ marginTop: "10px", fontSize: "18px" }}>
//                 (Đánh giá: {countRate} lượt)
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.fine})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.four})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.three})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.two})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.one})
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <button
//                   style={{
//                     backgroundColor: "#9c6644  ",
//                     borderColor: "#9c6644  ",
//                   }}
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => addTocartClick(productDetail, quantity)}
//                 >
//                   <FaCartShopping /> Thêm giỏ hàng
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div style={{ marginTop: "80px" }} className="container">
//             <h5 style={{ marginBottom: "40px", color: "gray" }}>
//               ĐÁNH GIÁ SẢN PHẨM
//             </h5>
//             {rate && rate.length > 0 ? (
//               rate.map((item, index) => {
//                 return (
//                   <div key={`rate-${index}`}>
//                     <div>
//                       <FaUserCircle style={{ fontSize: "40px" }} />{" "}
//                       {item.User.name}
//                     </div>
//                     <div style={{ marginLeft: "40px" }}>
//                       <div>{formatDate(item.createdAt)}</div>
//                       <div>{displayRate(item.star)}</div>
//                       <p style={{ fontSize: "18px" }}>{item.comment}</p>
//                     </div>
//                     <hr />
//                   </div>
//                 );
//               })
//             ) : (
//               <div style={{ fontSize: "18px", color: "gray" }}>
//                 Sản phẩm chưa có đánh giá !
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default ProductDetail;

// import React, { useEffect, useState } from "react";
// import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
// import { getProductDetail } from "../../redux/silce/customer/productSilce";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { UrlImage } from "../../url";
// import { FaStar } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { addTocartDetail } from "../../redux/silce/customer/cartSlice";
// import { FaUserCircle } from "react-icons/fa";

// const ProductDetail = () => {
//   const URL_IMAGE = UrlImage();
//   let { product_id } = useParams();
//   const dispatch = useDispatch();
//   const { rate, productDetail, countRate, countStar } = useSelector(
//     (state) => state.customer.product
//   );
//   const [quantity, setQuantity] = useState(1);
//   useEffect(() => {
//     dispatch(getProductDetail(product_id));
//   }, []);
//   const addTocartClick = (product, cartQuantity) => {
//     let product_cart = { ...product, cartQuantity: cartQuantity };
//     dispatch(addTocartDetail(product_cart));
//     setQuantity(1);
//   };
//   const displayRate = (rate) => {
//     let starContent;
//     switch (rate) {
//       case 1:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 2:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 3:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 4:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       case 5:
//         starContent = (
//           <div>
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//             <FaStar style={{ color: "#e3c01c" }} />
//           </div>
//         );
//         break;
//       default:
//         starContent = <div>Invalid star value</div>;
//         break;
//     }

//     return <div>{starContent}</div>;
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getUTCFullYear();
//     const month = `0${date.getUTCMonth() + 1}`.slice(-2);
//     const day = `0${date.getUTCDate()}`.slice(-2);

//     return `${day}/${month}/${year}`;
//   };
//   return (
//     <>
//       {productDetail && countStar && (
//         <div
//           style={{ marginBottom: "50px", marginTop: "20px" }}
//           className="container"
//         >
//           <h3 style={{ marginBottom: "40px" }}>CHI TIẾT SẢN PHẨM</h3>
//           <div className="row">
//             <div className="col-6">
//               <div style={{ width: "60%" }}>
//                 <MDBCarousel showControls>
//                   <MDBCarouselItem itemId={1}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                   <MDBCarouselItem itemId={2}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                   <MDBCarouselItem itemId={3}>
//                     <img
//                       src={URL_IMAGE + productDetail.image}
//                       width={"100px"}
//                       className="d-block w-100"
//                       alt="..."
//                     />
//                   </MDBCarouselItem>
//                 </MDBCarousel>
//               </div>
//             </div>
//             <div className="col-6">
//               <div>
//                 <p style={{ fontSize: "20px" }}>{productDetail.name}</p>
//               </div>
//               <div>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "18px",
//                   }}
//                 >
//                   {productDetail.price.toLocaleString("vi-VN")} đ
//                 </p>
//               </div>
//               <div>
//                 <p
//                   style={{
//                     marginBottom: "10xp",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Mô tả:
//                 </p>
//                 <p style={{ textAlign: "justify", fontSize: "15px" }}>
//                   {productDetail.description}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   marginBottom: "10xp",
//                   fontSize: "18px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Số lượng:
//               </div>
//               <div>
//                 <input
//                   style={{ width: "10%" }}
//                   className="form-control"
//                   type="number"
//                   min="1"
//                   max="100"
//                   step="1"
//                   value={quantity}
//                   onChange={(event) => setQuantity(event.target.value)}
//                 />
//               </div>
//               <div style={{ marginTop: "10px", fontSize: "18px" }}>
//                 (Đánh giá: {countRate} lượt)
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.fine})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.four})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.three})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.two})
//               </div>
//               <div>
//                 <FaStar style={{ marginRight: "10px", color: "#e3c01c" }} />(
//                 {countStar.one})
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <button
//                   style={{
//                     backgroundColor: "#4e7661 ",
//                     borderColor: "#4e7661 ",
//                   }}
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={() => addTocartClick(productDetail, quantity)}
//                 >
//                   <FaCartShopping /> Thêm giỏ hàng
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div style={{ marginTop: "80px" }} className="container">
//             <h5 style={{ marginBottom: "40px" }}>ĐÁNH GIÁ SẢN PHẨM</h5>
//             {rate && rate.length > 0 ? (
//               rate.map((item, index) => {
//                 return (
//                   <div key={`rate-${index}`}>
//                     <div>
//                       <FaUserCircle style={{ fontSize: "40px" }} />{" "}
//                       {item.User.name}
//                     </div>
//                     <div style={{ marginLeft: "40px" }}>
//                       <div>{formatDate(item.createdAt)}</div>
//                       <div>{displayRate(item.star)}</div>
//                       <p style={{ fontSize: "18px" }}>{item.comment}</p>
//                     </div>
//                     <hr />
//                   </div>
//                 );
//               })
//             ) : (
//               <div style={{ fontSize: "18px", color: "#14134f" }}>
//                 Sản phẩm chưa có đánh giá !
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default ProductDetail;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { getProductDetail } from "../../redux/silce/customer/productSilce";
import { addTocartDetail } from "../../redux/silce/customer/cartSlice";
import { UrlImage } from "../../url";

const StarRating = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "text-warning" : "text-muted"}
        />
      ))}
    </>
  );
};

const RatingSummary = ({ countStar, totalRatings }) => {
  const starCounts = {
    5: countStar.fine || 0,
    4: countStar.four || 0,
    3: countStar.three || 0,
    2: countStar.two || 0,
    1: countStar.one || 0,
  };

  const calculatePercentage = (count) => {
    if (totalRatings === 0) return 0;
    return Math.round((count / totalRatings) * 100);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3">Đánh giá: {totalRatings} lượt</h5>
        {Object.entries(starCounts)
          .reverse()
          .map(([stars, count]) => (
            <Row key={stars} className="align-items-center mb-2">
              <Col xs={3} className="d-flex align-items-center">
                <StarRating rating={parseInt(stars)} />
              </Col>
              <Col xs={7}>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${calculatePercentage(count)}%` }}
                    aria-valuenow={calculatePercentage(count)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </Col>
              <Col xs={2} className="text-end">
                {count}
              </Col>
            </Row>
          ))}
      </Card.Body>
    </Card>
  );
};

const RatingList = ({ ratings }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <>
      <h5 className="mb-4">ĐÁNH GIÁ SẢN PHẨM</h5>
      {ratings.length > 0 ? (
        ratings.map((item, index) => (
          <Card key={`rate-${index}`} className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <FaUserCircle size={40} className="me-2" />
                <div>
                  <Card.Title>{item.User.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {formatDate(item.createdAt)}
                  </Card.Subtitle>
                </div>
              </div>
              <StarRating rating={item.star} />
              <Card.Text className="mt-2">{item.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Sản phẩm chưa có đánh giá!</p>
      )}
    </>
  );
};

const ProductDetail = () => {
  const URL_IMAGE = UrlImage();
  let { product_id } = useParams();
  const dispatch = useDispatch();
  const { rate, productDetail, countRate, countStar } = useSelector(
    (state) => state.customer.product
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetail(product_id));
  }, [dispatch, product_id]);

  const addTocartClick = (product, cartQuantity) => {
    let product_cart = { ...product, cartQuantity: cartQuantity };
    dispatch(addTocartDetail(product_cart));
    setQuantity(1);
  };

  if (!productDetail || !countStar) return null;

  return (
    <Container className="my-5">
      <h3 className="mb-4">CHI TIẾT SẢN PHẨM</h3>
      <Row>
        <Col md={6}>
          <Carousel>
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <img
                  className="d-block w-100"
                  src={URL_IMAGE + productDetail.image}
                  alt={`Slide ${item}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <h4>{productDetail.name}</h4>
          <h5 className="text-danger font-weight-bold my-3">
            {productDetail.price.toLocaleString("vi-VN")} đ
          </h5>
          <p className="font-weight-bold">Mô tả:</p>
          <p>{productDetail.description}</p>
          <Form.Group className="mb-3">
            <Form.Label>Số lượng:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "100px" }}
            />
          </Form.Group>
          <Button
            variant="success"
            className="mt-3"
            onClick={() => addTocartClick(productDetail, quantity)}
          >
            <FaCartShopping className="me-2" /> Thêm giỏ hàng
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <RatingSummary countStar={countStar} totalRatings={countRate} />
        </Col>
        <Col md={8}>
          <RatingList ratings={rate} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
