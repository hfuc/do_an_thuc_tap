import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaHome, FaTimesCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderCancel } from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";

const OrderCancel = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderCancel);

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderCancel(user_id));
  }, [isAuth, dispatch, navigate, user_id]);

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
            {" > "} Đơn hàng đã hủy
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
                      <Button
                        variant="danger"
                        onClick={() => navigate(`/detail/${item.ProductId}`)}
                        style={{
                          backgroundColor: "#d1402c",
                          borderColor: "#d1402c",
                        }}
                      >
                        <FaShoppingCart className="me-2" /> Mua lại
                      </Button>
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="align-items-center">
                  <Col xs={12} md={6}>
                    <Badge bg="danger" className="mb-2 mb-md-0">
                      <FaTimesCircle className="me-2" /> Đơn hàng đã hủy
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
            <FaTimesCircle style={{ fontSize: "4rem", color: "#d1402c" }} />
            <h4 className="mt-3" style={{ color: "#4b4e51" }}>
              Chưa có đơn hàng nào đã hủy!
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

export default OrderCancel;
