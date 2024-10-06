import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
  }, [cartItem, dispatch]);

  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success) {
        toast.success(`${result.payload.message}`);
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div className="container-fluid bg-dark text-white py-2">
        <p className="text-center fs-5 fw-bold mb-0">NỘI THẤT NHÀ XINH</p>
      </div>
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src="/logo.png" alt="Logo" height="60" className="me-2" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => navigatePage("/")}
                className="fw-semibold"
              >
                Trang Chủ
              </Nav.Link>
              <NavDropdown
                title="Phòng Khách"
                id="living-room-dropdown"
                className="fw-semibold"
              >
                {categoryLivingRoom &&
                  categoryLivingRoom.map((item, index) => (
                    <NavDropdown.Item
                      key={`living-room-${index}`}
                      onClick={() =>
                        navigatePage(`/category_living_room/${item.id}`)
                      }
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <NavDropdown
                title="Phòng Ăn"
                id="dining-room-dropdown"
                className="fw-semibold"
              >
                {categoryDiningRoom &&
                  categoryDiningRoom.map((item, index) => (
                    <NavDropdown.Item
                      key={`dining-room-${index}`}
                      onClick={() =>
                        navigatePage(`/category_dining_room/${item.id}`)
                      }
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <NavDropdown
                title="Phòng Ngủ"
                id="bedroom-dropdown"
                className="fw-semibold"
              >
                {categoryBedRoom &&
                  categoryBedRoom.map((item, index) => (
                    <NavDropdown.Item
                      key={`bedroom-${index}`}
                      onClick={() =>
                        navigatePage(`/category_bed_room/${item.id}`)
                      }
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
              <Nav.Link href="/contact" className="fw-semibold">
                Liên Hệ
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => navigatePage("/cart")}
                className="position-relative"
              >
                <IoBagHandle className="fs-4" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartTotalQuantity}
                </span>
              </Nav.Link>
              {isAuth && isAuth.success ? (
                <NavDropdown
                  title="Tài Khoản"
                  id="account-dropdown"
                  align="end"
                >
                  <NavDropdown.Item>
                    Xin chào, {userLogin.name}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigatePage(`/order_wait/${userLogin.id}`)}
                  >
                    Đơn Hàng
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutClick}>
                    Đăng Xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title="Tài Khoản"
                  id="account-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => navigatePage("/login")}>
                    Đăng Nhập
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigatePage("/register")}>
                    Đăng Ký
                  </NavDropdown.Item>
                </NavDropdown>
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
