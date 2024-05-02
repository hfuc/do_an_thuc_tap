import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
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
          </div>
          <div className="col-9">
            <div>
              <div
                style={{ marginTop: "40px", marginBottom: "40px" }}
                className="container"
              >
                {listProduct && listProduct.length > 0 ? (
                  <>
                    <div className="row">
                      {listProduct.map((item, index) => {
                        return (
                          <div
                            key={`product-${index}`}
                            style={{ marginBottom: "50px" }}
                            className="col-3"
                          >
                            <div>
                              <Link to={`/detail/${item.id}`}>
                                <img
                                  width={"100%"}
                                  src={URL_IMAGE + item.image}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div>
                              <p
                                style={{
                                  overflow: "hidden",
                                  maxHeight: "2.8em",
                                  lineHeight: "1.4em",
                                  cursor: "pointer",
                                }}
                                onClick={() => navigate(`/detail/${item.id}`)}
                              >
                                {item.name}
                              </p>
                            </div>
                            <div>
                              <FaStar style={{ color: "#e3c01c" }} />
                              <FaStar style={{ color: "#e3c01c" }} />
                              <FaStar style={{ color: "#e3c01c" }} />
                              <FaStar style={{ color: "#e3c01c" }} />
                              <FaStar style={{ color: "#e3c01c" }} />
                            </div>
                            <div>
                              <p
                                style={{
                                  color: "#feb705 ",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.price.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <ReactPaginate
                      nextLabel=" >"
                      onPageChange={(e) => handlePageClick(e)}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={totalPage}
                      previousLabel="< "
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
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <h4>Không có sản phẩm !</h4>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
