import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import api from '../api/axios.js';
const CheckOut = () => {
    const currentUserId = localStorage.getItem("userId");
    const navigate = useNavigate(); // hook navigate

    const [checkoutInfo, setCheckoutInfo] = useState({
        shippingName: "",
        shippingAddress: "",
        shippingEmail: "",
        shippingMethod: "Standard",
        note: "",
    });
    const [cartItems, setCartItems] = useState([]); // lấy từ context / localStorage
    const [shippingCost] = useState(20000); // cố định
    const tax = 0;
    useEffect(() => {
        // Lấy cart từ localStorage khi component mount
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingCost + tax;
    const handleCheckout = async () => {
        const payload = {
            userId: currentUserId, // lấy từ state đăng nhập
            checkoutDto: {
                shippingName: checkoutInfo.shippingName,
                shippingAddress: checkoutInfo.shippingAddress,
                shippingEmail: checkoutInfo.shippingEmail,
                shippingMethod: checkoutInfo.shippingMethod,
                note: checkoutInfo.note,
                items: cartItems.map((item) => ({
                    productId: item.productId,
                    variantId: item.selectedVariant.id,
                    productName: item.productName,
                    productPrice: item.productPrice,
                    quantity: item.quantity,
                })),
            },
        };

        try {
            const res = await api.post("/checkout", payload); // dùng api, baseURL từ axios.js
            alert(res.data); // axios trả về data trực tiếp
            setCartItems([]);
            localStorage.removeItem("cart");

            // chuyển về trang chủ
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
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

                                        <a href="checkout.html">Checkout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="u-s-p-b-60">

                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div id="checkout-msg-group">
                                    <div className="msg u-s-m-b-30">

                                        <span className="msg__text">Returning customer?

                                            <a className="gl-link" href="#return-customer" data-toggle="collapse">Click here to login</a></span>
                                        <div className="collapse" id="return-customer" data-parent="#checkout-msg-group">
                                            <div className="l-f u-s-m-b-16">

                                                <span className="gl-text u-s-m-b-16">If you have an account with us, please log in.</span>
                                                <form className="l-f__form">
                                                    <div className="gl-inline">
                                                        <div className="u-s-m-b-15">

                                                            <label className="gl-label" for="login-email">E-MAIL *</label>

                                                            <input className="input-text input-text--primary-style" type="text" id="login-email" placeholder="Enter E-mail" /></div>
                                                        <div className="u-s-m-b-15">

                                                            <label className="gl-label" for="login-password">PASSWORD *</label>

                                                            <input className="input-text input-text--primary-style" type="text" id="login-password" placeholder="Enter Password" /></div>
                                                    </div>
                                                    <div className="gl-inline">
                                                        <div className="u-s-m-b-15">

                                                            <button className="btn btn--e-transparent-brand-b-2" type="submit">LOGIN</button></div>
                                                        <div className="u-s-m-b-15">

                                                            <a className="gl-link" href="lost-password.html">Lost Your Password?</a></div>
                                                    </div>

                                                    <div className="check-box">

                                                        <input type="checkbox" id="remember-me" />
                                                        <div className="check-box__state check-box__state--primary">

                                                            <label className="check-box__label" for="remember-me">Remember Me</label></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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
                        <div className="checkout-f">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h1 className="checkout-f__h1">DELIVERY INFORMATION</h1>
                                    <form
                                        className="checkout-f__delivery"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleCheckout();
                                        }}
                                    >
                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="shipping-name">FULL NAME *</label>
                                            <input
                                                className="input-text input-text--primary-style"
                                                type="text"
                                                id="shipping-name"
                                                value={checkoutInfo.shippingName}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, shippingName: e.target.value })
                                                }
                                                placeholder="Nguyen Van A"
                                                required
                                            />
                                        </div>

                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="shipping-email">E-MAIL *</label>
                                            <input
                                                className="input-text input-text--primary-style"
                                                type="email"
                                                id="shipping-email"
                                                value={checkoutInfo.shippingEmail}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, shippingEmail: e.target.value })
                                                }
                                                placeholder="example@gmail.com"
                                                required
                                            />
                                        </div>

                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="shipping-phone">PHONE *</label>
                                            <input
                                                className="input-text input-text--primary-style"
                                                type="text"
                                                id="shipping-phone"
                                                value={checkoutInfo.phone}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })
                                                }
                                                placeholder="0123456789"
                                            />
                                        </div>

                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="shipping-address">ADDRESS *</label>
                                            <input
                                                className="input-text input-text--primary-style"
                                                type="text"
                                                id="shipping-address"
                                                value={checkoutInfo.shippingAddress}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, shippingAddress: e.target.value })
                                                }
                                                placeholder="123 Nguyen Trai, Hanoi"
                                                required
                                            />
                                        </div>

                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="shipping-method">METHOD *</label>
                                            <select
                                                className="select-box select-box--primary-style"
                                                id="shipping-method"
                                                value={checkoutInfo.shippingMethod}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, shippingMethod: e.target.value })
                                                }
                                            >
                                                <option value="Standard">Standard</option>
                                                <option value="Fast">Fast</option>
                                            </select>
                                        </div>

                                        <div className="u-s-m-b-15">
                                            <label className="gl-label" htmlFor="order-note">ORDER NOTE</label>
                                            <textarea
                                                className="text-area text-area--primary-style"
                                                id="order-note"
                                                value={checkoutInfo.note}
                                                onChange={(e) =>
                                                    setCheckoutInfo({ ...checkoutInfo, note: e.target.value })
                                                }
                                                placeholder="Any note for the order..."
                                            />
                                        </div>

                                        <button className="btn btn--e-transparent-brand-b-2" type="submit">
                                            SAVE
                                        </button>
                                    </form>
                                </div>

                                <div className="col-lg-6">
                                    <h1 className="checkout-f__h1">ORDER SUMMARY</h1>

                                    <div className="o-summary">
                                        <div className="o-summary__section u-s-m-b-30">
                                            <div className="o-summary__item-wrap gl-scroll">
                                                {cartItems.map((item, idx) => (
                                                    <div className="o-card" key={idx}>
                                                        <div className="o-card__flex">
                                                            <div className="o-card__img-wrap">
                                                                <img
                                                                    className="u-img-fluid"
                                                                    src={`${process.env.REACT_APP_IMAGE_URL}/images/${item.productImage}`}
                                                                    alt={item.productName}
                                                                />
                                                            </div>
                                                            <div className="o-card__info-wrap">
                                                                <span className="o-card__name">
                                                                    <a href={`/product/${item.productId}`}>{item.productName}</a>
                                                                </span>
                                                                <span className="o-card__quantity">
                                                                    Quantity x {item.quantity}
                                                                </span>
                                                                <span className="o-card__price">
                                                                    {item.productPrice.toLocaleString("vi-VN")} VNĐ
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <a
                                                            className="o-card__del far fa-trash-alt"
                                                            onClick={() => {
                                                                const newCart = cartItems.filter((_, i) => i !== idx);
                                                                setCartItems(newCart);
                                                                localStorage.setItem("cart", JSON.stringify(newCart));
                                                            }}
                                                        ></a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="o-summary__section u-s-m-b-30">
                                            <div className="o-summary__box">
                                                <table className="o-summary__table">
                                                    <tbody>
                                                        <tr>
                                                            <td>SHIPPING</td>
                                                            <td>{shippingCost.toLocaleString("vi-VN")} VNĐ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>TAX</td>
                                                            <td>{tax.toLocaleString("vi-VN")} VNĐ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>SUBTOTAL</td>
                                                            <td>{subtotal.toLocaleString("vi-VN")} VNĐ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>GRAND TOTAL</td>
                                                            <td>{grandTotal.toLocaleString("vi-VN")} VNĐ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="o-summary__section u-s-m-b-30">
                                            <div className="o-summary__box">
                                                <h1 className="checkout-f__h1">PAYMENT INFORMATION</h1>
                                                <form
                                                    className="checkout-f__payment"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleCheckout();
                                                    }}
                                                >
                                                    <div className="u-s-m-b-10">
                                                        <div className="radio-box">
                                                            <input
                                                                type="radio"
                                                                id="cash-on-delivery"
                                                                name="payment"
                                                                checked
                                                                readOnly
                                                            />
                                                            <div className="radio-box__state radio-box__state--primary">
                                                                <label
                                                                    className="radio-box__label"
                                                                    htmlFor="cash-on-delivery"
                                                                >
                                                                    Cash on Delivery
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <span className="gl-text u-s-m-t-6">
                                                            Pay upon cash on delivery.
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <button className="btn btn--e-brand-b-2" type="submit">
                                                            PLACE ORDER
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default CheckOut;