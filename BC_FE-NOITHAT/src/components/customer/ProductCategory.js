import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { UrlImage } from "../../url";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getProductCategory } from "../../axios/services";

const URL_IMAGE = UrlImage();

const ProductCategory = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const { categoryLivingRoom, categoryDiningRoom, categoryBedRoom } =
    useSelector((state) => state.customer.category);

  useEffect(() => {
    fetchAllProduct(page);
  }, [page, category_id]);

  const fetchAllProduct = async (page) => {
    try {
      let res = await getProductCategory(category_id, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (e) => {
    setPage(e.selected + 1);
  };

  const renderStars = () => {
    return Array(5)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-warning" />);
  };

  const renderCategoryList = (title, categories) => (
    <>
      <h6 className="font-weight-bold mb-3">{title}</h6>
      <ListGroup variant="flush">
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => (
            <ListGroup.Item
              key={`${title}-${index}`}
              action
              as={Link}
              to={`/category/${item.id}`}
              className="border-0 px-0"
            >
              {item.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );

  return (
    <Container fluid className="px-5">
      <Row>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h3>DANH MỤC</h3>
              <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                Phòng Khách
              </div>
              {categoryLivingRoom &&
                categoryLivingRoom.length > 0 &&
                categoryLivingRoom.map((item, index) => {
                  return (
                    <Link
                      to={`/category_living_room/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          marginLeft: "20px",
                          color: "black",
                        }}
                        key={`category-living-room-${index}`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}

              <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                Phòng Ăn
              </div>
              {categoryDiningRoom &&
                categoryDiningRoom.length > 0 &&
                categoryDiningRoom.map((item, index) => {
                  return (
                    <Link
                      to={`/category_dining_room/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          marginLeft: "20px",
                          color: "black",
                        }}
                        key={`category-dining-room-${index}`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}

              <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
                Phòng Ngủ
              </div>
              {categoryBedRoom &&
                categoryBedRoom.length > 0 &&
                categoryBedRoom.map((item, index) => {
                  return (
                    <Link
                      to={`/category_bed_room/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          marginLeft: "20px",
                          color: "black",
                        }}
                        key={`category-bed-room-${index}`}
                      >
                        {item.name}
                      </p>
                    </Link>
                  );
                })}
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {listProduct && listProduct.length > 0 ? (
            <>
              <Row>
                {listProduct.map((item, index) => (
                  <Col
                    key={`product-${index}`}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mb-4"
                  >
                    <Card className="h-100 border-0 shadow-sm product-card">
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
            <div className="text-center">
              <h4>Không có sản phẩm!</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCategory;
