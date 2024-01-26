import { useEffect, useState } from "react";
import useFetchTips from "./../useFetchTips";
import ".././index.css";

const Home = () => {
  const url = "http://localhost:3000";
  const [data, isPending, error] = useFetchTips(url);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, showDisplay] = useState(false);
  const [notification, showNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      // Alert/push notifications
      showNotification(true);
    }, 3000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, data]);

  return (
    <>
      <div
        className="push-popup"
        style={{
          translate: notification ? "0% 0" : "120% 0",
        }}
      >
        <img src="images/logo.png" alt="logo" />
        <p>You have a new Eco tip!</p>
      </div>
      <span
        className="info"
        onMouseOver={() => {
          showDisplay(true);
        }}
        onMouseOut={() => {
          showDisplay(false);
        }}
      >
        <i className="fas fa-info"></i>
      </span>
      <div
        className="about-info"
        style={{ display: display ? "block" : "none" }}
      >
        <img src="images/logo.png" alt="EcoTip logo" />
        <p>
          EcoTip is a web application that gives advice about efficient and
          better ways to live life. The messages are insightful and serve as a
          guideline to a healthier, cheaper, and more fulfilling lifestyle.
        </p>
      </div>
      <div className="container">
        <h1>
          <i className="fas fa-question"></i>
        </h1>
        {error && <div>error</div>}
        {isPending && <img className="loading" src="images/logo.png" alt="" />}
        {data.length && <p>{data[currentIndex].method}.</p>}
      </div>
    </>
  );
};

export default Home;
