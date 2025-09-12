import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", { username, password });

    const data = response.data; 
    // data = { token, username, role, id }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);

    navigate("/");
  } catch (err) {
    setError("Invalid username or password");
  }
};

  return (
    <div className="app-content">
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <h1 className="section__heading u-c-secondary">ĐÃ CÓ TÀI KHOẢN?</h1>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="row row--center">
              <div className="col-lg-6 col-md-8 u-s-m-b-30">
                <div className="l-f-o">
                  <div className="l-f-o__pad-box">
                    <h1 className="gl-h1">ĐĂNG NHẬP</h1>
                    <form className="l-f-o__form" onSubmit={handleSubmit}>
                      {error && <p style={{ color: "red" }}>{error}</p>}

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="login-username">
                          TÊN ĐĂNG NHẬP *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="login-username"
                          placeholder="Nhập tên đăng nhập"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="login-password">
                          MẬT KHẨU *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="login-password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <button
                          className="btn btn--e-transparent-brand-b-2"
                          type="submit"
                        >
                          ĐĂNG NHẬP
                        </button>
                      </div>

                      <div className="u-s-m-b-30">
                        <Link className="gl-link" to="/forgot-password">
                          Quên mật khẩu?
                        </Link>
                      </div>
                    </form>

                    <h1 className="gl-h1">KHÁCH HÀNG MỚI</h1>
                    <span className="gl-text u-s-m-b-30">
                      Tạo tài khoản để thanh toán nhanh hơn, lưu địa chỉ giao hàng,
                      theo dõi đơn hàng và nhiều tiện ích khác.
                    </span>
                    <Link
                      className="l-f-o__create-link btn--e-transparent-brand-b-2"
                      to="/signup"
                    >
                      TẠO TÀI KHOẢN
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signin;
