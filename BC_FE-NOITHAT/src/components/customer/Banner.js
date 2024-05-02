import banner1 from "../../assets/customer/images/bannernoithat1.jpg";
import banner2 from "../../assets/customer/images/bannernoithat2.JPG";
import banner3 from "../../assets/customer/images/bannernoithat3.JPG";
import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Banner = () => {
  return (
    <>
      <MDBCarousel showControls>
        <MDBCarouselItem itemId={1}>
          <img src={banner2} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src={banner3} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src={banner2} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};
export default Banner;
