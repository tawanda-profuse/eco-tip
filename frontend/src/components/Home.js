import { useEffect, useState } from "react";
import useFetchTips from "./../useFetchTips";
import ".././index.css";

const Home = () => {
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:5000"
    : "https://ecotip-backend.onrender.com";
  const [data, isPending, error] = useFetchTips(url);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, showDisplay] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(
    localStorage.getItem("soundPreference") === "muted" ? true : false
  );

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
    }
  };

  const enableNotifications = async () => {
    await notifyUser("Notifications have been enabled");
  };

  const toggleSoundPreference = () => {
    const newSoundState = !isMuted;
    setIsMuted(newSoundState);
    localStorage.setItem("soundPreference", newSoundState ? "muted" : "unmuted");
    alert(`Sound is now ${newSoundState ? "muted" : "unmuted"}`);
  };

  const resetPreferences = () => {
    localStorage.removeItem("soundPreference");
    setIsMuted(false);
    alert(
      "To reset notification permissions, please go to your browser's site settings:\n\n" +
      "For Chrome: Click the lock icon next to the URL -> Site Settings -> Reset Permissions.\n\n" +
      "For Firefox: Click the lock icon -> Clear Cookies and Site Data.\n\n" +
      "For Safari: Go to Preferences -> Websites -> Notifications -> Remove the site."
    );
    setOpenDialog(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * data.length));
        notifyUser("You have a new EcoTip", data[currentIndex].method);
      if (!isMuted) {
        const soundEffect = new Audio("sounds/bell.mp3");
        soundEffect.play().catch((error) => console.error(error));
      }
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, data, isMuted]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <>
      {/* Popup notification: */}
      {!isPending && (
        <button
          className="push-popup"
          onClick={() => setOpenDialog(!openDialog)}
          title="Toggle settings"
        >
          <i className="fas fa-gear"></i>
        </button>
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
        {!isPending && (
          <>
            <p>{data[currentIndex].method}.</p>
            <div className="nav-buttons">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 ? true : false}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button onClick={handleNext}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </main>
      <dialog open={openDialog}>
        <button className="close-dialog" onClick={() => setOpenDialog(false)}>
          <i className="fas fa-times"></i>
        </button>
        <div className="action-buttons">
          <button onClick={enableNotifications}>
            Notification Preferences
          </button>
          <button onClick={toggleSoundPreference}>
            Sound Preference: (<i className={isMuted ? "fas fa-volume-high" : "fas fa-volume-xmark"}></i>)
          </button>
          <button onClick={resetPreferences}>
            Reset Preferences
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Home;
