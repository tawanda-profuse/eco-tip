import { useEffect, useState } from "react";
import useFetchTips from "./../useFetchTips";
import ".././index.css";

// Check if notifications exist in user browser:
const notifyUser = async (notificationText, body) => {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
  } else if (Notification.permission === "granted") {
    new Notification(notificationText, {
      icon: "images/logo.png",
      body,
    });
  } else if (Notification.permission !== "denied") {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(notificationText, {
          icon: "images/logo.png",
          body,
        });
      }
    });
  } else {
    new Notification(null);
  }
};

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
      notifyUser("You have a new EcoTip", data[currentIndex].method);
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, data]);

  const enableNotifs = async () => {
    await notifyUser("Notifications have been enabled").then(() => {
      showNotification(true);
    });
  };

  return (
    <>
      {!notification && !(Notification.permission === "granted") ? (
        <div className="push-popup">
          <div className="buttons">
            <button onClick={enableNotifs}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <p>Disable notifications?</p>
        </div>
      ) : (
        <div></div>
      )}
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
