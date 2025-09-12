import React from "react";
import { useState } from "react";
import { useCart } from '../lib/useCart';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, getSubtotal } = useCart();
    const [note, setNote] = useState("");
    const navigate = useNavigate(); // tạo hook navigate
    const handleProceedToCheckout = () => {

        navigate("/checkout");
    };
    const handleQuantityChange = (index, value) => {
        if (value < 1) value = 1;
        if (value > 1000) value = 1000;
        const newCart = [...cart];
        newCart[index].quantity = value;
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload(); // đơn giản reload để update UI
    };

    const handleClearCart = () => {
        localStorage.removeItem("cart");
        window.location.reload();
    };
    const subtotal = cart.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
    );
    const shipping = 4.0; // giá cố định
    const tax = 0.0; // nếu có thể, tính dựa trên subtotal
    const grandTotal = subtotal + shipping + tax;
    return (
        <div className="app-content">

            <div className="u-s-p-y-60">

                <div className="section__content">
                    <div className="container">
                        <div className="breadcrumb">
                            <div className="breadcrumb__wrap">
                                <ul className="breadcrumb__list">
                                    <li className="has-separator">

                                        <a href="index.html">Home</a></li>
                                    <li className="is-marked">

                                        <a href="cart.html">Cart</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="u-s-p-b-60">

                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">SHOPPING CART</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                <div className="table-responsive">
                                    <table className="table-p">
                                        <tbody>
                                            {cart.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="text-center">
                                                        Giỏ hàng trống
                                                    </td>
                                                </tr>
                                            )}

                                            {cart.map((item, index) => {
                                                const imageUrl =
                                                    item.selectedVariant?.images?.[0]?.imageUrl
                                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/variants/${item.selectedVariant.images[0].imageUrl}`
                                                        : `${process.env.REACT_APP_IMAGE_URL}/images/${item.productImage}`;


                                                return (
                                                    <tr key={`${item.productId}-${item.selectedVariant?.id || 0}`}>
                                                        <td>
                                                            <div className="table-p__box">
                                                                <div className="table-p__img-wrap">
                                                                    <img
                                                                        className="u-img-fluid"
                                                                        src={imageUrl}
                                                                        alt={item.productName}
                                                                    />
                                                                </div>
                                                                <div className="table-p__info">
                                                                    <span className="table-p__name">
                                                                        <a href={`/product/${item.productId}`}>
                                                                            {item.productName}
                                                                        </a>
                                                                    </span>
                                                                    <span className="table-p__category">
                                                                        <a href="#">Category</a>
                                                                    </span>
                                                                    {item.selectedVariant && (
                                                                        <ul className="table-p__variant-list">
                                                                            <li>
                                                                                <span>Size: {item.selectedVariant.size}</span>
                                                                            </li>
                                                                            <li>
                                                                                <span>Color: {item.selectedVariant.color}</span>
                                                                            </li>
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <span className="table-p__price">
                                                                {item.productPrice.toLocaleString("vi-VN")} VNĐ
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <div className="table-p__input-counter-wrap">
                                                                <div className="input-counter">
                                                                    <span
                                                                        className="input-counter__minus fas fa-minus"
                                                                        onClick={() =>
                                                                            handleQuantityChange(index, item.quantity - 1)
                                                                        }
                                                                    ></span>
                                                                    <input
                                                                        className="input-counter__text input-counter--text-primary-style"
                                                                        type="number"
                                                                        min={1}
                                                                        max={1000}
                                                                        value={item.quantity}
                                                                        onChange={(e) => {
                                                                            let val = parseInt(e.target.value);
                                                                            if (isNaN(val) || val < 1) val = 1;
                                                                            if (val > 1000) val = 1000;
                                                                            const updatedCart = [...cart];
                                                                            updatedCart[index].quantity = val;
                                                                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                                            window.location.reload(); // hoặc setState để update UI mà không reload
                                                                        }}
                                                                    />
                                                                    <span
                                                                        className="input-counter__plus fas fa-plus"
                                                                        onClick={() =>
                                                                            handleQuantityChange(index, item.quantity + 1)
                                                                        }
                                                                    ></span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="table-p__del-wrap">
                                                                <a
                                                                    className="far fa-trash-alt table-p__delete-link"
                                                                    onClick={() => {
                                                                        removeFromCart(
                                                                            item.productId,
                                                                            item.selectedVariant?.id
                                                                        );
                                                                        window.location.reload();
                                                                    }}
                                                                ></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Actions: Continue shopping, Clear Cart, Update Cart */}
                            <div className="col-lg-12">
                                <div className="route-box">
                                    <div className="route-box__g1">
                                        <a className="route-box__link" href="/">
                                            <i className="fas fa-long-arrow-alt-left"></i>
                                            <span>TIẾP TỤC MUA SẮM</span>
                                        </a>
                                    </div>
                                    <div className="route-box__g2">
                                        <a
                                            className="route-box__link"
                                            onClick={() => {
                                                localStorage.removeItem("cart");
                                                window.location.reload();
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                            <span>XÓA GIỎ HÀNG</span>
                                        </a>
                                        <a
                                            className="route-box__link"
                                            onClick={() => window.location.reload()}
                                        >
                                            <i className="fas fa-sync"></i>
                                            <span>CẬP NHẬT GIỎ HÀNG</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="u-s-p-b-60">

                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                                <form className="f-cart" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">


                                        <div className="col-lg-12 col-md-6 u-s-m-b-30">
                                            <div className="f-cart__pad-box">
                                                <div className="u-s-m-b-30">
                                                    <table className="f-cart__table">
                                                        <tbody>
                                                            <tr>
                                                                <td>PHÍ SHIP</td>
                                                                <td>20.000 VNĐ</td>
                                                            </tr>
                                                            <tr>
                                                                <td>THUẾ</td>
                                                                <td>0 VNĐ</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TỔNG PHỤ</td>
                                                                <td>{subtotal.toLocaleString("vi-VN")} VNĐ</td>
                                                            </tr>
                                                            <tr>
                                                                <td>TỔNG THÀNH TIỀN</td>
                                                                <td>{(subtotal + 20000).toLocaleString("vi-VN")} VNĐ</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn--e-brand-b-2"
                                                        onClick={handleProceedToCheckout}
                                                    >
                                                        PROCEED TO CHECKOUT
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Cart;