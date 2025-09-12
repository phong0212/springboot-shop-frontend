import React, { useState } from "react";
import axios from "axios";
import api from "../api/axios";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, subject, message };
      await api.post("/contacts", payload); // dùng api, tự nối baseURL
      setStatusMessage("Gửi liên hệ thành công!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatusMessage("Gửi liên hệ thất bại, thử lại sau.");
    }
  };
  return (
    <div className="app-content">
      {/* Intro */}
      <div className="section__intro u-s-p-y-60">
        <div className="container">
          <h1 className="section__heading u-c-secondary">Contact Us</h1>
          <span className="section__span u-c-grey">
            We’d love to hear from you!
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="section__content u-s-p-b-60">
        <div className="container">
          <div className="row">
            {/* Form */}
            <div className="col-lg-6 col-md-12 u-s-m-b-30">
              {statusMessage && <p style={{ color: "green" }}>{statusMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="u-s-m-b-30">
                  <input
                    className="input-text input-text--border-radius input-text--primary-style"
                    type="text"
                    placeholder="Name (Required)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="u-s-m-b-30">
                  <input
                    className="input-text input-text--border-radius input-text--primary-style"
                    type="email"
                    placeholder="Email (Required)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="u-s-m-b-30">
                  <input
                    className="input-text input-text--border-radius input-text--primary-style"
                    type="text"
                    placeholder="Subject (Required)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="u-s-m-b-30">
                  <textarea
                    className="text-area text-area--border-radius text-area--primary-style"
                    placeholder="Compose a Message (Required)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button className="btn btn--e-brand-b-2" type="submit">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact info + map */}
            <div className="col-lg-6 col-md-12 u-s-m-b-30">
              <div className="contact-info">
                <h2>Our Office</h2>
                <ul className="contact-info__list">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>331,Quoc lo 1, Ho Chi Minh, Vietnam</span>
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <span>0372 648 367</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>2200008924@nttu.edu.vn</span>
                  </li>
                </ul>

                {/* Embedded Google Map */}
                <div className="contact-info__map u-s-m-t-30">
                  <iframe
                    title="Shop Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.123456789!2d105.819456!3d21.002345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab123456789%3A0xabcdef123456789!2s123%20Nguyen%20Trai%2C%20Hanoi!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
