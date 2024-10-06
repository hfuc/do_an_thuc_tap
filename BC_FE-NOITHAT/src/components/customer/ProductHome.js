import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductHome } from "../../redux/silce/customer/productSilce";
import { UrlImage } from "../../url";
import { Link, useNavigate } from "react-router-dom";

const URL_IMAGE = UrlImage();

const ProductHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector(
    (state) => state.customer.product.listProduct
  );

  useEffect(() => {
    dispatch(fetchProductHome());
  }, [dispatch]);

  const renderStars = () => {
    return Array(5)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-warning" />);
  };

  return (
    <Container fluid className="bg-light py-5">
      <Container>
        <h2
          className="text-center mb-5 font-weight-bold"
          style={{ color: "#333", letterSpacing: "2px" }}
        >
          SẢN PHẨM NỔI BẬT
        </h2>
        {listProduct && listProduct.length > 0 ? (
          <Row>
            {listProduct.map((item, index) => (
              <Col
                key={`product-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <div
                  style={{ borderRadius: "10px" }}
                  className="product-card position-relative overflow-hidden"
                >
                  <Link to={`/detail/${item.id}`} className="d-block">
                    <img
                      src={URL_IMAGE + item.image}
                      alt={item.name}
                      className="img-fluid w-100"
                      style={{ height: "300px" }}
                    />
                    <div className="product-overlay position-absolute w-100 h-100 top-0 left-0 d-flex align-items-center justify-content-center">
                      <button className="btn btn-outline-light">
                        Xem chi tiết
                      </button>
                    </div>
                  </Link>
                  <div className="product-info p-3 bg-white">
                    <h5
                      className="product-title mb-2 text-truncate"
                      style={{ cursor: "pointer", fontSize: "1rem" }}
                      onClick={() => navigate(`/detail/${item.id}`)}
                    >
                      {item.name}
                    </h5>
                    <div className="mb-2">{renderStars()}</div>
                    <p
                      className="product-price font-weight-bold mb-0"
                      style={{ color: "#9c6644" }}
                    >
                      {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default ProductHome;
