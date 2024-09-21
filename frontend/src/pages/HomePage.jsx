import React from "react";
import logo from "../assets/Icon-192.png";
import heroImage from "../assets/hero1.jpeg";
import secondsImage from "../assets/seconds.jfif";
import yieldImage from "../assets/yield.jfif";
import expertImage from "../assets/expert.jfif";
import priceImage from "../assets/price.jpeg";
import supportIcon from "../assets/support_agent_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png";

// Importing coin images
import shib from "../assets/shib.png";
import fil from "../assets/fil.png";
import eos from "../assets/eos.png";
import dot from "../assets/dot.png";
import usdt from "../assets/usdt.png";
import doge from "../assets/doge.png";
import btc from "../assets/btc.png";
import sol from "../assets/sol.png";
import ton from "../assets/ton.png";
import avax from "../assets/avax.png";
import bnb from "../assets/bnb.png";
import xrp from "../assets/xrp.png";
import eth from "../assets/eth.png";
import link from "../assets/link.png";
import trx from "../assets/trx.png";
import ada from "../assets/ada.png";
import ftm from "../assets/ftm.png";

const coins = [
  {
    imgSrc: shib,
    name: "SHIB",
    change: "-0.29%",
    volume: "$10,334,781.3",
    price: "$0.00001399",
  },
  {
    imgSrc: fil,
    name: "FIL",
    change: "-1.23%",
    volume: "$26,447,709.8",
    price: "$3.67",
  },
  {
    imgSrc: eos,
    name: "EOS",
    change: "-2.63%",
    volume: "$20,102,294.6",
    price: "$0.4890",
  },
  {
    imgSrc: dot,
    name: "DOT",
    change: "-0.11%",
    volume: "$3,880,576.6",
    price: "$4.34",
  },
  {
    imgSrc: usdt,
    name: "USDT",
    change: "-0.02%",
    volume: "$363,618,807.8",
    price: "$1.00",
  },
  {
    imgSrc: doge,
    name: "DOGE",
    change: "-0.55%",
    volume: "$19,814,045.6",
    price: "$0.1005",
  },
  {
    imgSrc: btc,
    name: "BTC",
    change: "-0.79%",
    volume: "$1,403,742,237.0",
    price: "$57,774.3",
  },
  {
    imgSrc: sol,
    name: "SOL",
    change: "-3.04%",
    volume: "$193,726,583.4",
    price: "$128.83",
  },
  {
    imgSrc: ton,
    name: "TON",
    change: "-0.79%",
    volume: "$0",
    price: "$0.9799",
  },
  {
    imgSrc: avax,
    name: "AVAX",
    change: "-1%",
    volume: "$10,363,555.4",
    price: "$21.80",
  },
  {
    imgSrc: bnb,
    name: "BNB",
    change: "-2.75%",
    volume: "$112,540,108.3",
    price: "$507.01",
  },
  {
    imgSrc: xrp,
    name: "XRP",
    change: "-1.54%",
    volume: "$30,250,419.6",
    price: "$0.5507",
  },
  {
    imgSrc: eth,
    name: "ETH",
    change: "-1.14%",
    volume: "$1,049,873,296.8",
    price: "$2,450.79",
  },
  {
    imgSrc: link,
    name: "LINK",
    change: "-3.75%",
    volume: "$11,004,103.5",
    price: "$10.45",
  },
  {
    imgSrc: trx,
    name: "TRX",
    change: "-0.25%",
    volume: "$8,873,219.4",
    price: "$0.1558",
  },
  {
    imgSrc: ada,
    name: "ADA",
    change: "-3.9%",
    volume: "$10,113,408.6",
    price: "$0.3308",
  },
  {
    imgSrc: ftm,
    name: "FTM",
    change: "-2.41%",
    volume: "$42,754,150.6",
    price: "$0.4085",
  },
];

function HomePage() {
  return (
    <div className="main">
      {/* Navbar */}
      <nav className="bg-white sticky top-0 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#">
            <img
              src={logo}
              alt="Angelx Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
          <a href="#">
            <img src={supportIcon} alt="Support Icon" className="w-8" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="section-hero">
        <div className="container mx-auto flex justify-center">
          <img src={heroImage} alt="Hero" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-6 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row border rounded-lg">
            <div className="md:w-1/3">
              <img
                src={secondsImage}
                alt="Get started in seconds"
                className="max-w-full h-auto"
              />
            </div>
            <div className="md:w-2/3 p-4">
              <h5 className="text-lg font-semibold">Get started in seconds</h5>
              <p className="text-gray-500">
                Whether you are a beginner or an expert, you can easily get
                started without any professional knowledge.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row border rounded-lg">
            <div className="md:w-1/3">
              <img
                src={yieldImage}
                alt="Boost your yields"
                className="max-w-full h-auto"
              />
            </div>
            <div className="md:w-2/3 p-4">
              <h5 className="text-lg font-semibold">Boost your yields</h5>
              <p className="text-gray-500">
                Every transaction has potential for huge profits, allowing every
                user to thrive simultaneously with the platform.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row border rounded-lg">
            <div className="md:w-1/3">
              <img
                src={expertImage}
                alt="Access expert knowledge"
                className="max-w-full h-auto"
              />
            </div>
            <div className="md:w-2/3 p-4">
              <h5 className="text-lg font-semibold">Access expert knowledge</h5>
              <p className="text-gray-500">
                Ensure that every user can earn profits on the platform
                regardless of how much money they have.
              </p>
            </div>
          </div>
        </div>

        <div className="my-6">
          <h4 className="text-center text-lg mb-4">AngelX Official Screenshot</h4>
          <div className="flex justify-center">
            <img src={priceImage} alt="Price" className="max-w-full h-auto" />
          </div>

          <div className="card my-6">
            <div className="card-header bg-white">
              <h4 className="text-md font-semibold">Market list</h4>
            </div>
            <div className="card-body overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 font-light">Crypto Coin</th>
                    <th className="text-left px-4 py-2 font-light">Volume (24h)</th>
                    <th className="text-right px-4 py-2 font-light">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((coin, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 flex items-center font-bold">
                        <img src={coin.imgSrc} alt={coin.name} className="w-5 h-5 mr-2" />
                        {coin.name}
                        <span className="text-red-500 text-sm ml-2">{coin.change}</span>
                      </td>
                      <td className="px-4 py-2">{coin.volume}</td>
                      <td className="px-4 py-2 text-right">{coin.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>

        {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-around text-center">
          <div>
            <a href="index.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#5f6368"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
              <p>Home</p>
            </a>
          </div>
          <div>
            <a href="exchange.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#5f6368"
              >
                <path d="M280-160 80-360l200-200 56 57-103 103h287v80H233l103 103-56 57Zm400-240-56-57 103-103H440v-80h287L624-743l56-57 200 200-200 200Z" />
              </svg>
              <p>Exchange</p>
            </a>
          </div>
          <div>
            <a href="mine.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#5f6368"
              >
                <path d="M479.825-485Q421-485 380-524.825 339-564.65 339-624t40.175-99.825Q419.35-763 479.825-763T579-723.175q40 40.175 40 100T579.825-525Q540-485 479.825-485ZM320-80q-41.825 0-70.913-29.088Q220-138.175 220-180v-45q0-29 15-53.5t40-38.5q54-24 106.5-36.5T479.825-365q57.35 0 110.663 12.5Q643.8-340 700-316q25 11 40 38.5t15 53.5v45q0 41.825-29.088 70.912Q681.825-80 640-80H320Zm0-60h320q14 0 23-9t9-23v-45q0-14-7-25t-18-16q-48-22-94-31t-93.175-9Q402-298 355-289t-93 31q-12 5-18.5 16T236-157v45q0 14 9 23t23 9ZM480-545Zm0 400Z" />
              </svg>
              <p>Mine</p>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
