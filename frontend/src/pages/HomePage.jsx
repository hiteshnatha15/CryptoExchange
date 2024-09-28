import React from "react";
import heroImage from "../assets/hero1.jpeg";
import secondsImage from "../assets/seconds.jfif";
import yieldImage from "../assets/yield.jfif";
import expertImage from "../assets/expert.jfif";
import priceImage from "../assets/price.jpeg";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

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
  { imgSrc: shib, name: "SHIB", change: "-0.29%", volume: "$10,334,781.3", price: "$0.00001399" },
  { imgSrc: fil, name: "FIL", change: "-1.23%", volume: "$26,447,709.8", price: "$3.67" },
  { imgSrc: eos, name: "EOS", change: "-2.63%", volume: "$20,102,294.6", price: "$0.4890" },
  { imgSrc: dot, name: "DOT", change: "-0.11%", volume: "$3,880,576.6", price: "$4.34" },
  { imgSrc: usdt, name: "USDT", change: "-0.02%", volume: "$363,618,807.8", price: "$1.00" },
  { imgSrc: doge, name: "DOGE", change: "-0.55%", volume: "$19,814,045.6", price: "$0.1005" },
  { imgSrc: btc, name: "BTC", change: "-0.79%", volume: "$1,403,742,237.0", price: "$57,774.3" },
  { imgSrc: sol, name: "SOL", change: "-3.04%", volume: "$193,726,583.4", price: "$128.83" },
  { imgSrc: ton, name: "TON", change: "-0.79%", volume: "$0", price: "$0.9799" },
  { imgSrc: avax, name: "AVAX", change: "-1%", volume: "$10,363,555.4", price: "$21.80" },
  { imgSrc: bnb, name: "BNB", change: "-2.75%", volume: "$112,540,108.3", price: "$507.01" },
  { imgSrc: xrp, name: "XRP", change: "-1.54%", volume: "$30,250,419.6", price: "$0.5507" },
  { imgSrc: eth, name: "ETH", change: "-1.14%", volume: "$1,049,873,296.8", price: "$2,450.79" },
  { imgSrc: link, name: "LINK", change: "-3.75%", volume: "$11,004,103.5", price: "$10.45" },
  { imgSrc: trx, name: "TRX", change: "-0.25%", volume: "$8,873,219.4", price: "$0.1558" },
  { imgSrc: ada, name: "ADA", change: "-3.9%", volume: "$10,113,408.6", price: "$0.3308" },
  { imgSrc: ftm, name: "FTM", change: "-2.41%", volume: "$42,754,150.6", price: "$0.4085" },
];

function HomePage() {
  return (
    <div className="main">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="section-hero">
        <div className="container mx-auto flex justify-center">
          <img src={heroImage} alt="Hero" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto my-6 px-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {/* Feature 1 */}
          <div className="flex border rounded-lg">
            <div className="w-full">
              <img
                src={secondsImage}
                alt="Get started in seconds"
                className="max-w-full h-auto"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold">Get started in seconds</h5>
                <p className="text-gray-500">
                  Whether you are a beginner or an expert, you can easily get
                  started without any professional knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex border rounded-lg">
            <div className="w-full">
              <img
                src={yieldImage}
                alt="Boost your yields"
                className="max-w-full h-auto"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold">Boost your yields</h5>
                <p className="text-gray-500">
                  Every transaction has potential for huge profits, allowing every
                  user to thrive simultaneously with the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex border rounded-lg">
            <div className="w-full">
              <img
                src={expertImage}
                alt="Access expert knowledge"
                className="max-w-full h-auto"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold">Access expert knowledge</h5>
                <p className="text-gray-500">
                  Ensure that every user can earn profits on the platform
                  regardless of how much money they have.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshot Section */}
        <div className="my-6">
          <h4 className="text-center text-lg mb-4">AngelX Official Screenshot</h4>
          <div className="flex justify-center">
            <img src={priceImage} alt="Price" className="max-w-full h-auto" />
          </div>
        </div>

        {/* Market List Section */}
        <div className="card my-6">
          <div className="card-header bg-white">
            <h4 className="text-md font-semibold">Market List</h4>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
