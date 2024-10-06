import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaHome, FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderShip,
  orderConfirmAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";

const OrderShip = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderShip);
  const orderConfirm = useSelector(
    (state) => state.customer.order.handleOrderConfirm
  );

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderShip(user_id));
  }, [isAuth, orderConfirm, dispatch, navigate, user_id]);

  const orderConfirmClick = (order_id) => {
    dispatch(orderConfirmAction(order_id));
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
            {" > "} Đơn hàng đang giao
          </span>
        </div>

        <OrderStatus />

        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="mb-4 shadow-sm">
              <Card.Body>
                {order.Order_Products.map((item, indexItem) => (
                  <Row
                    key={`order-${indexItem}`}
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
                    <Col xs={9} md={10}>
                      <h5>{item.Product.name}</h5>
                      <p className="mb-1">Số lượng: {item.quantity}</p>
                      <p
                        className="font-weight-bold"
                        style={{ color: "#9c6644", fontSize: "1.1rem" }}
                      >
                        {item.Product.price.toLocaleString("vi-VN")} đ
                      </p>
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="align-items-center">
                  <Col xs={12} md={4}>
                    <Badge bg="info" className="mb-2 mb-md-0">
                      <FaTruck className="me-2" /> Đang giao hàng
                    </Badge>
                  </Col>
                  <Col xs={12} md={4} className="text-md-center my-2 my-md-0">
                    <h5 className="mb-0">
                      Thành tiền:{" "}
                      <span style={{ color: "#9c6644" }}>
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </h5>
                  </Col>
                  <Col xs={12} md={4} className="text-md-end">
                    <Button
                      variant="success"
                      onClick={() => orderConfirmClick(order.id)}
                      style={{
                        backgroundColor: "#9c6644",
                        borderColor: "#9c6644",
                      }}
                    >
                      Đã nhận hàng
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <p className="text-muted small">
                      Đơn hàng đang được giao. Nếu không gặp vấn đề gì, vui lòng
                      bấm "Đã nhận hàng" khi nhận được hàng.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="text-center mt-5">
            <FaTruck style={{ fontSize: "4rem", color: "#9c6644" }} />
            <h4 className="mt-3" style={{ color: "#4b4e51" }}>
              Chưa có đơn hàng nào đang giao!
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

export default OrderShip;
