import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UrlImage } from "../../url";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getProductSearch } from "../../axios/services";

const URL_IMAGE = UrlImage();

const ProductSearch = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  let name = new URLSearchParams(location.search).get("name");

  const fetchProductSearch = async (page) => {
    try {
      let res = await getProductSearch(name, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductSearch(page);
  }, [page, name]);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const renderStars = () => {
    return Array(5)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-warning" />);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 font-weight-bold">
        <FaSearch className="mr-2" /> Kết Quả Tìm Kiếm: "{name}"
      </h2>

      {listProduct && listProduct.length > 0 ? (
        <>
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
                <Card className="h-100 shadow-sm product-card">
                  <Link to={`/detail/${item.id}`}>
                    <Card.Img
                      variant="top"
                      src={URL_IMAGE + item.image}
                      className="img-fluid"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      className="product-title mb-2 text-truncate"
                      style={{ cursor: "pointer", fontSize: "1rem" }}
                      onClick={() => navigate(`/detail/${item.id}`)}
                    >
                      {item.name}
                    </Card.Title>
                    <div className="mb-2">{renderStars()}</div>
                    <Card.Text
                      className="product-price mt-auto font-weight-bold"
                      style={{ color: "#9c6644" }}
                    >
                      {item.price.toLocaleString("vi-VN")} đ
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h4 className="text-muted">Không tìm thấy sản phẩm</h4>
          <p>Vui lòng thử lại với từ khóa khác</p>
        </div>
      )}
    </Container>
  );
};

export default ProductSearch;
