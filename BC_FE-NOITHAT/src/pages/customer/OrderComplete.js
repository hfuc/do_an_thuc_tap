import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaHome, FaCheckCircle, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderComplete } from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";

const OrderComplete = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderComplete);
  const rates = useSelector((state) => state.customer.order.orderRate);

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderComplete(user_id));
  }, [isAuth, dispatch, navigate, user_id]);

  const isRated = (productId, orderId) => {
    return rates.some(
      (itemRate) =>
        itemRate.ProductId === productId && itemRate.OrderId === orderId
    );
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <div className="d-flex align-items-center mb-4">
          <FaHome
            className="me-2"
            style={{ fontSize: "1.2rem", color: "#4b4e51" }}
          />
          <span
            className="me-2"
            style={{ fontSize: "1rem", cursor: "pointer", color: "#4b4e51" }}
            onClick={() => navigate("/")}
          >
            Trang Chủ
          </span>
          <span style={{ fontSize: "1rem", color: "#9c6644" }}>
            {" > "} Đơn hàng đã hoàn thành
          </span>
        </div>

        <OrderStatus />

        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Card key={`order-${index}`} className="mb-4 shadow-sm">
              <Card.Body>
                {order.Order_Products.map((item, itemIndex) => (
                  <Row
                    key={`item-${index}-${itemIndex}`}
                    className="mb-3 align-items-center"
                  >
                    <Col xs={3} md={2}>
                      <img
                        src={URL_IMAGE + item.Product.image}
                        alt={item.Product.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: "120px" }}
                      />
                    </Col>
                    <Col xs={9} md={7}>
                      <h5>{item.Product.name}</h5>
                      <p className="mb-1">Số lượng: {item.quantity}</p>
                      <p
                        className="font-weight-bold"
                        style={{ color: "#9c6644", fontSize: "1.1rem" }}
                      >
                        {item.Product.price.toLocaleString("vi-VN")} đ
                      </p>
                    </Col>
                    <Col xs={12} md={3} className="mt-3 mt-md-0">
                      {!isRated(item.ProductId, order.id) ? (
                        <Button
                          variant="info"
                          onClick={() =>
                            navigate(
                              `/rate?order_id=${order.id}&product_id=${item.ProductId}&user_id=${order.UserId}`
                            )
                          }
                          style={{
                            backgroundColor: "#65bebc",
                            borderColor: "#65bebc",
                          }}
                        >
                          <FaStar className="me-2" /> Đánh giá
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          disabled
                        >
                          Đã đánh giá
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="align-items-center">
                  <Col xs={12} md={6}>
                    <Badge bg="success" className="mb-2 mb-md-0">
                      <FaCheckCircle className="me-2" /> Đơn hàng đã được giao
                      thành công
                    </Badge>
                  </Col>
                  <Col xs={12} md={6} className="text-md-end">
                    <h5 className="mb-0">
                      Thành tiền:{" "}
                      <span style={{ color: "#9c6644" }}>
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="text-center mt-5">
            <FaCheckCircle style={{ fontSize: "4rem", color: "#9c6644" }} />
            <h4 className="mt-3" style={{ color: "#4b4e51" }}>
              Chưa có đơn hàng nào hoàn thành
            </h4>
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="mt-3"
              style={{ backgroundColor: "#feb705", borderColor: "#feb705" }}
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default OrderComplete;
