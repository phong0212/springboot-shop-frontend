import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const userId = localStorage.getItem("userId"); // đã lưu khi login

    useEffect(() => {
        api.get(`/wishlist/user/${userId}`)
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.content || [];
                setWishlist(data);
            })
            .catch(err => console.error(err));
    }, [userId]);

    function handleRemove(productId) {
        api.delete(`/wishlist/${userId}/${productId}`)
            .then(() => {
                setWishlist(wishlist.filter(item => item.productId !== productId));
            })
            .catch(err => console.error(err));
    }


    return (
        <div className="app-content">
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <h1 className="section__heading u-c-secondary">Wishlist</h1>
                    </div>
                </div>

                <div className="section__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                {wishlist.length === 0 ? (
                                    <p>Your wishlist is empty.</p>
                                ) : (
                                    wishlist.map(item => (
                                        <div key={item.id} className="w-r u-s-m-b-30">
                                            <div className="w-r__container">
                                                <div className="w-r__wrap-1">
                                                    <div className="w-r__img-wrap" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
                                                        <img
                                                            className="u-img-fluid"
                                                            src={item.productImage || "/images/no-image.png"}
                                                            alt={item.productName}
                                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                        />
                                                    </div>

                                                    <div className="w-r__info">
                                                        <span className="w-r__name">
                                                            <a href={`/product/${item.productId}`}>
                                                                {item.productName}
                                                            </a>
                                                        </span>
                                                        <span className="w-r__category">
                                                            {item.categoryName}
                                                        </span>
                                                        <span className="w-r__price">
                                                            {new Intl.NumberFormat('vi-VN').format(item.productPrice)} VNĐ
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-r__wrap-2">
                                                    <a className="w-r__link btn--e-brand-b-2">ADD TO CART</a>
                                                    <a
                                                        className="w-r__link btn--e-transparent-platinum-b-2"
                                                        href={`/product/${item.productId}`}
                                                    >
                                                        VIEW
                                                    </a>
                                                    <a
                                                        className="w-r__link btn--e-transparent-platinum-b-2"
                                                        href="#"
                                                        onClick={() => handleRemove(item.productId)}
                                                    >
                                                        REMOVE
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
