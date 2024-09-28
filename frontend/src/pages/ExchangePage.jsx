import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import img1 from "../assets/WhatsApp Image 2024-09-02 at 11.54.59 AM.jpeg";
import img2 from "../assets/coming soon.jpeg";

const ExchangePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [refreshableContent, setRefreshableContent] = useState("93");

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const refreshContent = () => {
    fetch("your-server-endpoint-url") // Replace with actual URL
      .then((response) => response.text())
      .then((data) => setRefreshableContent(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setCountdown(60);
        refreshContent();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="main">
      <Navbar />
      <div className="container-fluid">
        <div id="carouselExampleControls" className="carousel slide p-2" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} className="d-block img-fluid" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block img-fluid" alt="..." />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h6 className="mt-3">Platform Price</h6>
        <div className="bg-war text-center m-2 pt-3" id="refreshable-content">
          <span>
            Automatic refresh after <span className="text-warning">{countdown}</span> seconds
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            className="ms-3"
            width="20px"
            fill="#5f6368"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
          <br />
          <b className="fs-2">{refreshableContent}</b>
          <span className="base">Base</span>
          <br />
          <span>1USDT= ₹{refreshableContent}</span>
          <table className="table mt-2 table-body">
            <tbody className="p-2 bg-white">
              <tr>
                <td className="border-end">>=$1075.27 and &lt;$2150.54</td>
                <td>₹93.25</td>
              </tr>
              <tr>
                <td className="border-end">>=$2150.54 and &lt;$3225.81</td>
                <td>₹93.1</td>
              </tr>
              <tr>
                <td className="border-end">>=$3225.81</td>
                <td>₹93.05</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="popup-click btn btn-link" onClick={openPopup}>
                    What is tiered price policy?
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {popupOpen && (
          <div className="popup open-popup text-center" id="popup">
            <h2>Thank You!</h2>
            <p>Your details have been successfully submitted.</p>
            <button type="button" className="btn btn-primary" onClick={closePopup}>
              Ok
            </button>
          </div>
        )}
      </div>

      <div className="text-center pb-4">
        <a href="usdtLogin.html" type="button" className="btn btn-dark button mt-4">
          Login for sell USDT
        </a>
        <br />
        <span className="text-danger small">
          First time login will register new account for you
        </span>
        <div className="row pt-3">
          <div className="d-flex justify-content-between">
            <div className="col-4">
              <a href="deposite.html" className="text-center d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
                </svg>
                <br />
                Deposit
              </a>
            </div>
            <div className="col-4">
              <a href="withdrawLogin.html" className="text-center d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z" />
                </svg>
                <br />
                Withdraw
              </a>
            </div>
            <div className="col-4">
              <a href="invite.html" className="text-center d-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
                </svg>
                <br />
                Invite
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <h6 className="m-2">Exchange price</h6>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-between">
              <div className="bg-white px-4 mb-3">
                <div className="head d-flex pt-2 align-items-center">
                  <img
                    src="assets/img/wazirx-wrx-logo-1B1169E0C7-seeklogo.com.png"
                    alt=""
                    className="waz-img img-fluid"
                  />
                  <h6 className="fw-bold ms-2">WAZIRX</h6>
                  <a href="https://wazirx.com/" className="ms-auto" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white px-4">
                <div className="head d-flex pt-2 align-items-center">
                  <img src="assets/img/bnb.png" className="waz-img img-fluid" alt="" />
                  <h6 className="fw-bold ms-2">BINANCE</h6>
                  <a
                    href="https://p2p.binance.com/en/trade/BUY/USDT?fiat=INR&payment=ALL"
                    className="ms-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </div>
                <div>
                  <p className="m-2">
                    Avg <span className="fw-bold" style={{ fontSize: "20px" }}>89.75</span> Rs
                    <br />
                    <span className="b3b3">1USDT=89.75</span>
                    <br />
                    <span className="mi89">Min 89.59Rs</span>
                    <br />
                    <span className="mi89">Max 89.85Rs</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="pice10">Statistics based on the latest 10 pieces of data</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExchangePage;
