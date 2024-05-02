import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../assets/customer/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, logout } from "../../../redux/silce/customer/authSilce";
import { toast } from "react-toastify";
import { IoBagHandle } from "react-icons/io5";
import { getTotal } from "../../../redux/silce/customer/cartSlice";
import { fetchAllCategory } from "../../../redux/silce/customer/categorySlice";
import SearchInput from "../SearchInput";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const userLogin = useSelector((state) => state.customer.auth.dataUser);
  const { categoryLivingRoom, categoryDiningRoom, categoryBedRoom } =
    useSelector((state) => state.customer.category);
  const { cartTotalQuantity, cartItem } = useSelector(
    (state) => state.customer.cart
  );
  const navigatePage = (page) => {
    navigate(page);
  };
  useEffect(() => {
    dispatch(getTotal());
    dispatch(fetchAllCategory());
    dispatch(authLogin());
  }, [cartItem]);
  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success && result.payload.success === true) {
        toast.success(`${result.payload.message}`);
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#4b4e51", height: "50px" }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            paddingTop: "10px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          NỘI THẤT NHÀ XINH
        </p>
      </div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container style={{ backgroundColor: "#B3C8CF", borderRadius: "50px" }}>
          <Navbar.Brand href="">
            <img width={"200px"} src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigatePage("/")}>Trang Chủ</Nav.Link>
              <NavDropdown title="Phòng Khách" id="collapsible-nav-dropdown">
                {categoryLivingRoom &&
                  categoryLivingRoom.length > 0 &&
                  categoryLivingRoom.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          navigatePage(`/category_living_room/${item.id}`)
                        }
                        key={`category-skincare-${index}`}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <NavDropdown title="Phòng Ăn" id="collapsible-nav-dropdown">
                {categoryDiningRoom &&
                  categoryDiningRoom.length > 0 &&
                  categoryDiningRoom.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          navigatePage(`/category_dining_room/${item.id}`)
                        }
                        key={`category-makeup-${index}`}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <NavDropdown title="Phòng Ngủ" id="collapsible-nav-dropdown">
                {categoryBedRoom &&
                  categoryBedRoom.length > 0 &&
                  categoryBedRoom.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() =>
                          navigatePage(`/category_bed_room/${item.id}`)
                        }
                        key={`category-makeup-${index}`}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    );
                  })}
              </NavDropdown>
              <Nav.Link href="">Liên Hệ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <IoBagHandle
                  onClick={() => navigatePage("/cart")}
                  style={{ fontSize: "35px", color: "black " }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#4b4e51",
                    textAlign: "center",
                    lineHeight: "19px",
                    color: "white",
                  }}
                >
                  {cartTotalQuantity}
                </span>
              </Nav.Link>
              {isAuth && isAuth.success === true ? (
                <>
                  <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                    {userLogin && userLogin.name && (
                      <NavDropdown.Item>
                        Hello ! {userLogin.name}
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item
                      onClick={() =>
                        navigatePage(`/order_wait/${userLogin.id}`)
                      }
                    >
                      Đơn Hàng
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logoutClick()}>
                      Đăng Xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigatePage("/login")}>
                      Đăng Nhập
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigatePage("/register")}>
                      Đăng Ký
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SearchInput />
    </>
  );
};

export default Header;
