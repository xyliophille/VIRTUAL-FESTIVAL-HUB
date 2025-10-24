// Holi.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "./Holi.css";

const Holi = () => {
  const navigate = useNavigate();
  const headerRef = useRef();
  const aboutRef = useRef();
  const traditionsRef = useRef();
  const significanceRef = useRef();
  const galleryRef = useRef();
  const videoRef = useRef();
  const backButtonRef = useRef();

  const [videoLoaded, setVideoLoaded] = useState(false);

  const festivalData = {
    title: "HOLI",
    about: {
      title: "About Holi",
      content: `Holi is a popular and significant Hindu festival celebrated as the Festival of Colors, Love, and Spring. It celebrates the eternal and divine love of the deities Radha and Krishna. The festival also signifies the triumph of good over evil, as it commemorates the victory of Lord Vishnu as Narasimha Narayana over Hiranyakashipu.

Holi is celebrated at the approach of vernal equinox, on the Phalguna Purnima (Full Moon). The festival lasts for a night and a day, beginning on the evening of the Purnima (Full Moon day) falling in the Vikram Samvat Hindu Calendar month of Phalguna, which falls around middle of March in the Gregorian calendar.`,
    },
    traditions: {
      title: "Traditions & Customs",
      content: `• Holika Dahan: Bonfires are lit on the eve of Holi to signify the burning of Holika
• Playing with Colors: People smear each other with colors and drench each other with water
• Traditional Songs & Dance: Singing folk songs and performing traditional dances
• Special Foods: Preparing and sharing traditional sweets like gujiya, mathri, and malpua
• Visiting Friends & Family: Exchanging greetings and colors with loved ones`,
    },
    significance: {
      title: "Significance",
      content: `Holi celebrates the arrival of spring, the end of winter, the blossoming of love, and for many, it's a festive day to meet others, play and laugh, forget and forgive, and repair broken relationships. The festival is also celebrated as a thanksgiving for a good harvest.`,
    },
    images: [
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=500",
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=500",
      "https://images.unsplash.com/photo-1602922966763-51ef6eae1a33?w=500",
    ],
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-celebrating-holi-festival-43539-large.mp4",
  };

  useEffect(() => {
    animatePage();
  }, []);

  const animatePage = () => {
    // Reset initial states
    gsap.set(
      [
        headerRef.current,
        aboutRef.current,
        traditionsRef.current,
        significanceRef.current,
        galleryRef.current,
        videoRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Staggered animation for sections
    const tl = gsap.timeline();

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        aboutRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        traditionsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        significanceRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        galleryRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        videoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            if (videoRef.current) {
              videoRef.current.play();
            }
          },
        },
        "-=0.2"
      );
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="holi-learn-more">
      {/* Back Button */}
      <button
        className="back-button"
        ref={backButtonRef}
        onClick={handleBackClick}
      >
        ← Back to Festivals
      </button>

      {/* Main Header */}
      <header className="holi-header" ref={headerRef}>
        <h1 className="holi-main-title">{festivalData.title}</h1>
        <div className="holi-header-decoration">
          <div className="color-dot dot-1"></div>
          <div className="color-dot dot-2"></div>
          <div className="color-dot dot-3"></div>
          <div className="color-dot dot-4"></div>
          <div className="color-dot dot-5"></div>
        </div>
      </header>

      {/* About Section */}
      <section className="holi-section about-section" ref={aboutRef}>
        <h2 className="section-title">{festivalData.about.title}</h2>
        <div className="section-content">
          <p className="section-text">{festivalData.about.content}</p>
          <div className="holi-icon">🎨</div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="holi-section traditions-section" ref={traditionsRef}>
        <h2 className="section-title">{festivalData.traditions.title}</h2>
        <div className="section-content">
          <div className="traditions-list">
            {festivalData.traditions.content.split("\n").map((item, index) => (
              <div key={index} className="tradition-item">
                <span className="tradition-bullet">🎯</span>
                <span className="tradition-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Significance Section */}
      <section
        className="holi-section significance-section"
        ref={significanceRef}
      >
        <h2 className="section-title">{festivalData.significance.title}</h2>
        <div className="section-content">
          <p className="section-text">{festivalData.significance.content}</p>
          <div className="significance-icons">
            <div className="significance-icon">
              <span className="icon">❤️</span>
              <span className="icon-text">Love</span>
            </div>
            <div className="significance-icon">
              <span className="icon">🕊️</span>
              <span className="icon-text">Peace</span>
            </div>
            <div className="significance-icon">
              <span className="icon">🎉</span>
              <span className="icon-text">Joy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="holi-section gallery-section" ref={galleryRef}>
        <h2 className="section-title">Holi Celebration Gallery</h2>
        <div className="gallery-grid">
          {festivalData.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt={`Holi celebration ${index + 1}`}
                className="gallery-image"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Holi+${
                    index + 1
                  }`;
                }}
              />
              <div className="image-overlay">
                <span className="overlay-text">Holi Festivity</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Video Section */}
      <section className="holi-section video-section" ref={videoRef}>
        <h2 className="section-title">Experience Holi Celebration</h2>
        <div className="video-container">
          {!videoLoaded && (
            <div className="video-loading">
              <div className="loading-spinner"></div>
              <p>Loading celebration video...</p>
            </div>
          )}
          <video
            className="holi-video"
            controls
            muted
            loop
            preload="auto"
            onLoadedData={handleVideoLoad}
            poster="https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800"
          >
            <source src={festivalData.video} type="video/mp4" />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-celebrating-holi-festival-43539-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="video-caption">
            <p>
              Watch the vibrant colors and joyful celebrations of Holi festival
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="holi-footer">
        <div className="footer-content">
          <h3>Celebrate Holi with Virtual Festival Hub</h3>
          <p>
            Join our virtual Holi celebration and experience the joy of colors
            from anywhere in the world!
          </p>
          <button className="join-celebration-btn">
            🎨 Join Holi Celebration
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Holi;
