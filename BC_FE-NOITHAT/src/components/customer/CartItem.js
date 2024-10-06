// import React, { useEffect } from "react";
// import { FaHome } from "react-icons/fa";
// import { TiDelete } from "react-icons/ti";
// import { useSelector, useDispatch } from "react-redux";
// import { UrlImage } from "../../url";
// import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
// import {
//   removeCart,
//   decreaseCart,
//   addTocart,
//   getTotal,
// } from "../../redux/silce/customer/cartSlice";
// import Order from "./Order";
// import { useNavigate } from "react-router-dom";

// const CartItem = () => {
//   const navigate = useNavigate();
//   const URL_IMAGE = UrlImage();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.customer.cart.cartItem);
//   const cartTotalAmount = useSelector(
//     (state) => state.customer.cart.cartTotalAmount
//   );
//   const removeCartClick = (product) => {
//     dispatch(removeCart(product));
//   };
//   const decreaseCartClick = (product) => {
//     dispatch(decreaseCart(product));
//   };
//   const increaseCartClick = (product) => {
//     dispatch(addTocart(product));
//   };
//   useEffect(() => {
//     dispatch(getTotal());
//   }, [cart]);
//   return (
//     <>
//       <div style={{ marginBottom: "100px" }} className="container">
//         <div>
//           <span style={{ fontSize: "18px" }}>
//             <FaHome />
//           </span>
//           <span
//             style={{ marginLeft: "5px", fontSize: "17px", cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           >
//             Trang Chủ {">"}{" "}
//           </span>
//           <span
//             style={{
//               marginLeft: "5px",
//               fontSize: "17px",
//               color: "gray",
//               cursor: "pointer",
//             }}
//           >
//             Giỏ Hàng
//           </span>
//         </div>
//         <div className="container-fluid" style={{ marginTop: "50px" }}>
//           <table className="table table-borderless">
//             <thead>
//               <tr>
//                 <th scope="col">SẢN PHẨM</th>
//                 <th scope="col">TÊN</th>
//                 <th scope="col">GIÁ</th>
//                 <th scope="col">SỐ LƯỢNG</th>
//                 <th scope="col">TỔNG TIỀN</th>
//                 <th scope="col"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart && cart.length > 0 ? (
//                 <>
//                   {cart.map((item, index) => {
//                     return (
//                       <tr key={`cart-${index}`}>
//                         <td>
//                           <img
//                             src={URL_IMAGE + item.image}
//                             width={"120px"}
//                             alt=""
//                           />
//                         </td>
//                         <td style={{ width: "400px", textAlign: "left" }}>
//                           {item.name}
//                         </td>
//                         <td style={{ fontWeight: "bold", color: "#9c6644  " }}>
//                           {item.price.toLocaleString("vi-VN")} đ
//                         </td>
//                         <td>
//                           <FaCircleMinus
//                             onClick={() => decreaseCartClick(item)}
//                             style={{
//                               fontSize: "25px",
//                               color: "gray",
//                               marginRight: "10px",
//                               cursor: "pointer",
//                             }}
//                           />
//                           {item.cartQuantity}
//                           <FaCirclePlus
//                             onClick={() => increaseCartClick(item)}
//                             style={{
//                               fontSize: "25px",
//                               color: "gray",
//                               marginLeft: "10px",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </td>
//                         <td style={{ fontWeight: "bold", color: "#9c6644  " }}>
//                           {(item.cartQuantity * item.price).toLocaleString(
//                             "vi-VN"
//                           )}{" "}
//                           đ
//                         </td>
//                         <td>
//                           <TiDelete
//                             onClick={() => removeCartClick(item)}
//                             style={{
//                               fontSize: "50px",
//                               color: "gray",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </>
//               ) : (
//                 <>
//                   <tr>
//                     <td colSpan={"5"} style={{ textAlign: "center" }}>
//                       <h5 style={{ color: "gray" }}>GIỎ HÀNG TRỐNG</h5>
//                     </td>
//                   </tr>
//                 </>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <Order />
//       </div>
//     </>
//   );
// };
// export default CartItem;

import React, { useEffect } from "react";
import { Container, Table, Image, Button, Form } from "react-bootstrap";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { UrlImage } from "../../url";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/silce/customer/cartSlice";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );

  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };

  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };

  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <Container className="my-5">
      <h2 className="mb-4" style={{ color: "#4b4e51" }}>
        GIỎ HÀNG
      </h2>
      {cart && cart.length > 0 ? (
        <>
          <Table responsive hover className="align-middle">
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr>
                <th>Sản phẩm</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={`cart-${index}`}>
                  <td>
                    <Image
                      src={URL_IMAGE + item.image}
                      width={120}
                      fluid
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>
                  <td className="text-start font-weight-bold">{item.name}</td>
                  <td className="font-weight-bold" style={{ color: "#9c6644" }}>
                    {item.price.toLocaleString("vi-VN")} đ
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decreaseCartClick(item)}
                        style={{ borderColor: "#9c6644", color: "#9c6644" }}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        value={item.cartQuantity}
                        readOnly
                        className="mx-2 text-center"
                        style={{ width: "50px", borderColor: "#9c6644" }}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => increaseCartClick(item)}
                        style={{ borderColor: "#9c6644", color: "#9c6644" }}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </td>
                  <td className="font-weight-bold" style={{ color: "#9c6644" }}>
                    {(item.cartQuantity * item.price).toLocaleString("vi-VN")} đ
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeCartClick(item)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end mt-4">
            <h4 style={{ color: "#4b4e51" }}>
              Tổng cộng:{" "}
              <span style={{ color: "#9c6644" }}>
                {cartTotalAmount.toLocaleString("vi-VN")} đ
              </span>
            </h4>
          </div>
          <Order />
        </>
      ) : (
        <div className="text-center">
          <img
            src="https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif"
            alt="Empty Cart"
            style={{
              borderRadius: "20px",
              width: "200px",
              marginBottom: "20px",
            }}
          />
          <h3 style={{ color: "#4b4e51" }}>Giỏ hàng của bạn đang trống</h3>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="mt-3"
            style={{ backgroundColor: "#9c6644", borderColor: "#9c6644" }}
          >
            <FaShoppingCart className="me-2" /> Tiếp tục mua sắm
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CartItem;
