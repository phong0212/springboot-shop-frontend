import React from "react";
import { useCart } from "../lib/useCart";

const MiniCart = () => {
  const { cart, removeFromCart, getSubtotal, getTotalItems } = useCart();

  return (
    <li className="has-dropdown">
      {/* Icon giỏ hàng */}
      <a className="mini-cart-shop-link">
        <i className="fas fa-shopping-bag"></i>
        <span className="total-item-round">{getTotalItems()}</span>
      </a>

      <span className="js-menu-toggle"></span>

      {/* Popup MiniCart */}
      <div className="mini-cart">
        {/* Danh sách sản phẩm */}
        <div className="mini-product-container gl-scroll u-s-m-b-15">
          {cart.length === 0 && (
            <p className="text-center">Giỏ hàng trống</p>
          )}

          {cart.map((item) => {
            const imageUrl =
              item.selectedVariant?.images?.[0]?.imageUrl
                ? `${process.env.REACT_APP_IMAGE_URL}/images/variants/${item.selectedVariant.images[0].imageUrl}`
                : `${process.env.REACT_APP_IMAGE_URL}/images/${item.productImage}`;

            return (
              <div
                className="card-mini-product"
                key={`${item.productId}-${item.selectedVariant?.id || 0}`}
              >
                <div className="mini-product">
                  {/* Ảnh sản phẩm */}
                  <div className="mini-product__image-wrapper">
                    <a
                      className="mini-product__link"
                      href={`/product/${item.productId}`}
                    >
                      <img
                        className="u-img-fluid"
                        src={imageUrl}
                        alt={item.productName}
                      />
                    </a>
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="mini-product__info-wrapper">
                    <span className="mini-product__category">
                      {item.selectedVariant?.color ? item.selectedVariant.color : ""}
                    </span>
                    <span className="mini-product__name">
                      <a href={`/product/${item.productId}`}>
                        {item.productName}
                      </a>
                    </span>

                    {item.selectedVariant && (
                      <span className="mini-product__variant">
                        {item.selectedVariant.color} / {item.selectedVariant.size}
                      </span>
                    )}

                    <span className="mini-product__quantity">{item.quantity} x</span>
                    <span className="mini-product__price">
                      {(item.productPrice * item.quantity).toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>

                {/* Nút xóa */}
                <a
                  className="mini-product__delete-link far fa-trash-alt"
                  onClick={() =>
                    removeFromCart(item.productId, item.selectedVariant?.id)
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Tổng tiền và action */}
        {cart.length > 0 && (
          <div className="mini-product-stat">
            <div className="mini-total">
              <span className="subtotal-text">TỔNG: </span>
              <span className="subtotal-value">
                {getSubtotal().toLocaleString("vi-VN")} VNĐ
              </span>
            </div>

            <div className="mini-action">
              <a className="mini-link btn--e-brand-b-2" href="/checkout">
                THANH TOÁN
              </a>
              <a className="mini-link btn--e-transparent-secondary-b-2" href="/cart">
                XEM GIỎ HÀNG
              </a>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default MiniCart;
