import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../../../assets/customer/images/logo.png";

const Footer = () => {
  return (
    <>
      <MDBFooter
        bgColor="white"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <span style={{ textAlign: "center" }}></span>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img src={logo} alt="" style={{ width: "200px" }} />
                <p>Xây dựng không gian sang trọng, hiện đại !</p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">PHÒNG NGỦ</h6>
                <p>Giường Ngủ</p>
                <p>Tủ Quần Áo</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">PHÒNG KHÁCH</h6>
                <p>Sofa</p>
                <p>Ghế Thư Giãn</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">PHÒNG BẾP</h6>
                <p>Bàn Ăn</p>
                <p>Ghế Ăn</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LIÊN HỆ</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Lạng Sơn
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  nhasinhdeco@gmail.com
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />{" "}
                  0876522288
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </>
  );
};
export default Footer;
