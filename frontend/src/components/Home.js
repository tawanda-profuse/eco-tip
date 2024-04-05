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
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:5000"
    : "https://ecotip-backend.onrender.com";
  const [data, isPending, error] = useFetchTips(url);

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * data.length)
  );
  const [display, showDisplay] = useState(false);
  const [notification, showNotification] = useState(false);

  useEffect(() => {
    const soundEffect = new Audio("sounds/bell.mp3");
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * data.length));
      // Alert/push notifications
      notifyUser("You have a new EcoTip", data[currentIndex].method);
      soundEffect
        .play()
        .then()
        .catch((error) => console.error(error));
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
      {/* Popup notification: */}
      {!notification && !(Notification.permission === "granted") ? (
        <div className="push-popup">
          <span className="buttons">
            <button onClick={enableNotifs}>
              <i className="fas fa-times"></i>
            </button>
          </span>
          <p>Disable notifications?</p>
        </div>
      ) : (
        <div></div>
      )}
      {/* Menu info button */}
      <button
        className="info"
        onMouseOver={() => {
          showDisplay(true);
        }}
        onMouseOut={() => {
          showDisplay(false);
        }}
      >
        <i className="fas fa-info"></i>
      </button>
      {/* Dynamic menu */}
      <nav
        className="about-info"
        style={{ display: display ? "block" : "none" }}
      >
        <img src="images/logo.png" alt="EcoTip logo" />
        <p>
          EcoTip is a web application that gives advice about efficient and
          better ways to live life. The messages are insightful and serve as a
          guideline to a healthier, cheaper, and more fulfilling lifestyle.
        </p>
      </nav>
      <main className="container">
        <i className="fas fa-question"></i>
        {/* Conditional rendering */}
        {error && <div>{error}</div>}
        {isPending && (
          <div className="loading">
            <i className="fas fa-spinner"></i>
          </div>
        )}
        {data.length && <p>{data[currentIndex].method}.</p>}
      </main>
    </>
  );
};

export default Home;
