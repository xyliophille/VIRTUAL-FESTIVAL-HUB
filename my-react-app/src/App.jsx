import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import "./App.css";

// Gemini AI Assistant Component with actual AI integration
const GeminiAssistant = () => {
  const buttonRef = useRef(null);
  const chatBodyRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm your Virtual Festival Hub assistant! 🎉 I can help you explore festivals, join meetings, learn about features, or navigate the platform. What would you like to know?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
        delay: 3,
      });
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleButtonClick = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Get AI response from backend API
  const getAIResponse = async (userMessage) => {
    try {
      // First try to get response from your backend API
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context:
            "Virtual Festival Hub - A platform for experiencing cultural festivals through Google Meet integration. Users can browse festivals, join virtual meetings, learn about cultural traditions, and connect with Team Innovators developers.",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return (
          data.response || "I'm here to help with the Virtual Festival Hub!"
        );
      } else {
        throw new Error("API not available");
      }
    } catch (error) {
      console.log("Using fallback AI responses");
      // Fallback to intelligent responses if API is not available
      return getFallbackResponse(userMessage);
    }
  };

  // Intelligent fallback responses
  const getFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Festival-related queries
    if (lowerMessage.includes("festival") || lowerMessage.includes("event")) {
      if (
        lowerMessage.includes("join") ||
        lowerMessage.includes("participate")
      ) {
        return "To join a festival meeting: 1) Browse the festival cards on the main page 2) Click the 'JOIN GOOGLE MEET' button on any festival 3) This will open a new Google Meet session where you can experience the cultural celebration in real-time! 🎪";
      }
      if (lowerMessage.includes("list") || lowerMessage.includes("available")) {
        return "The Virtual Festival Hub features various cultural festivals! You'll see them displayed as cards on the main page. Each festival has its own description, date, and a direct link to join the virtual celebration via Google Meet. 🌍";
      }
      return "Our platform showcases cultural festivals from around the world! Each festival offers a unique virtual experience where you can learn about traditions, watch performances, and connect with others interested in that culture. Click any festival card to get started!";
    }

    // Google Meet queries
    if (
      lowerMessage.includes("meet") ||
      lowerMessage.includes("meeting") ||
      lowerMessage.includes("video")
    ) {
      if (
        lowerMessage.includes("problem") ||
        lowerMessage.includes("error") ||
        lowerMessage.includes("not working")
      ) {
        return "If you're having issues with Google Meet: 1) Check your internet connection 2) Ensure pop-ups are allowed 3) Make sure you're signed into a Google account 4) Try refreshing the page. If problems persist, you can visit meet.google.com directly. 🔧";
      }
      return "Google Meet integration allows you to join live virtual festival sessions! Simply click the 'JOIN GOOGLE MEET' button on any festival card to enter the celebration. You'll need a Google account to participate. 🎥";
    }

    // Platform features
    if (
      lowerMessage.includes("feature") ||
      lowerMessage.includes("what can") ||
      lowerMessage.includes("how to use")
    ) {
      return "Virtual Festival Hub Features: • Browse cultural festivals • Join live Google Meet sessions • Learn about different traditions • Connect with global participants • Meet the development team • Get AI assistance (that's me!) ✨";
    }

    // Team information
    if (
      lowerMessage.includes("team") ||
      lowerMessage.includes("developer") ||
      lowerMessage.includes("innovator")
    ) {
      return "Team Innovators built this platform! We're passionate about creating immersive virtual experiences. Scroll down to the 'Meet the Team' section to learn about our developers, their roles, and connect with them on GitHub and LinkedIn. 👨‍💻";
    }

    // Navigation help
    if (
      lowerMessage.includes("navigate") ||
      lowerMessage.includes("where is") ||
      lowerMessage.includes("how to find")
    ) {
      return "Navigation Guide: • Main page: Festival cards • About section: Platform information • Team section: Developer profiles • Use the navigation bar at the top for quick navigation • I'm here to help with anything else! 🗺️";
    }

    // Technical help
    if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support") ||
      lowerMessage.includes("problem")
    ) {
      return "I'm here to help! You can: • Ask about specific festivals • Get help with Google Meet • Learn platform features • Navigate the site • Contact the team. What do you need assistance with? 🤗";
    }

    // Greetings
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! 👋 Welcome to the Virtual Festival Hub! I'm your AI assistant here to help you explore cultural festivals, join virtual celebrations, and navigate our platform. What would you like to know?";
    }

    // Default response
    return "I'm here to help you get the most out of the Virtual Festival Hub! You can ask me about joining festivals, using Google Meet, platform features, or anything else about your virtual cultural experience. What would you like to know? 🎉";
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage = { type: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(inputText);
      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I apologize, but I'm having trouble responding right now. Please try again in a moment, or browse the festival hub directly! 🎪",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action suggestions
  const quickActions = [
    "How do I join a festival?",
    "What festivals are available?",
    "Tell me about Google Meet integration",
    "Who built this platform?",
    "How do I navigate the site?",
  ];

  const handleQuickAction = (action) => {
    setInputText(action);
  };

  return (
    <>
      {isChatOpen && (
        <div className="gemini-chat-modal">
          <div className="chat-header">
            <h4>🎪 Ask With Riry</h4>
            <button
              className="chat-close-btn"
              onClick={() => setIsChatOpen(false)}
              title="Close Chat"
            >
              ×
            </button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}-message`}>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai-message">
                <div className="message-content typing-indicator">
                  <span>💭</span>
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="quick-actions">
                <p className="quick-actions-title">
                  Quick questions you can ask:
                </p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Ask about festivals, features, or how to use the platform..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? "..." : "➤"}
            </button>
          </div>
        </div>
      )}

      <div
        className="gemini-assistant-btn"
        ref={buttonRef}
        onClick={handleButtonClick}
        title={isChatOpen ? "Close Chat" : "Ask the Festival Assistant"}
      >
        <img
          src="Gemini_Generated_Image_8q6yw68q6yw68q6y (1).png"
          alt="Festival Assistant Logo"
          className="gemini-logo-icon"
        />
        <span className="assistant-text">
          {isChatOpen ? "Close" : "Ask With Riry"}
        </span>
      </div>
    </>
  );
};

// Your existing App component
function App() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetStatus, setMeetStatus] = useState("ready");
  const [activeSection, setActiveSection] = useState("home");

  const appRef = useRef();
  const cardsRef = useRef([]);
  const titleRef = useRef();
  const subtitleRef = useRef();
  const teamSectionRef = useRef();
  const teamMembersRef = useRef([]);

  useEffect(() => {
    fetchFestivals();
  }, []);

  useEffect(() => {
    if (festivals.length > 0 && !loading) {
      animatePage();
    }
  }, [festivals, loading]);

  const fetchFestivals = async () => {
    try {
      console.log("🔄 Fetching festivals from backend...");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/festivals`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFestivals(data);
      setLoading(false);
      setError(null);
      console.log("✅ Successfully loaded festivals:", data);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      setError(
        "Failed to connect to server. Make sure backend is running on port 5001."
      );
      setLoading(false);
    }
  };

  const joinGoogleMeet = async (festivalName) => {
    setMeetStatus("loading");

    try {
      console.log(`🎥 Creating Google Meet for: ${festivalName}`);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/create-meeting`,
        {
          topic: `${festivalName} - Virtual Festival`,
          duration: 60,
        },
        {
          timeout: 10000,
        }
      );

      console.log("🔧 Full backend response:", res.data);

      if (res.data && res.data.join_url) {
        const meetUrl = res.data.join_url;
        console.log("✅ Google Meet created successfully:", meetUrl);

        setMeetStatus("ready");

        const newWindow = window.open(meetUrl, "_blank", "noopener,noreferrer");

        if (newWindow) {
          console.log("✅ Google Meet opened in new tab");
        } else {
          console.log("⚠️ Popup blocked, redirecting in current tab");
          window.location.href = meetUrl;
        }

        return;
      } else {
        throw new Error("Invalid response from server - no join_url");
      }
    } catch (err) {
      console.error("❌ Google Meet error:", err);
      setMeetStatus("ready");

      // Fallback: Direct Google Meet link
      window.open("https://meet.google.com/new", "_blank");
    }
  };

  const animatePage = () => {
    // Reset initial states
    gsap.set(appRef.current, { opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: -30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(cardsRef.current, { opacity: 0, y: 40 });
    gsap.set(teamSectionRef.current, { opacity: 0, y: 50 });
    gsap.set(teamMembersRef.current, { opacity: 0, scale: 0.8 });

    // Animate main container
    gsap.to(appRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate title
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    // Animate subtitle
    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6,
    });

    // Stagger animation for festival cards
    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.9,
    });

    // Animate team section
    gsap.to(teamSectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 1.5,
    });

    // Stagger animation for team members
    gsap.to(teamMembersRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 1.8,
    });
  };

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToTeamRefs = (el) => {
    if (el && !teamMembersRef.current.includes(el)) {
      teamMembersRef.current.push(el);
    }
  };

  const handleCardHover = (index) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleCardLeave = (index) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleTeamMemberHover = (index) => {
    if (teamMembersRef.current[index]) {
      gsap.to(teamMembersRef.current[index], {
        y: -5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleTeamMemberLeave = (index) => {
    if (teamMembersRef.current[index]) {
      gsap.to(teamMembersRef.current[index], {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const openGitHub = (url) => {
    window.open(url, "_blank");
  };

  const openLinkedIn = (url) => {
    window.open(url, "_blank");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Festivals from Backend...</div>
        <div className="loading-subtext">
          Connecting to: {import.meta.env.VITE_BACKEND}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚡</div>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <div className="backend-status">
          <p>
            Backend should be running on:{" "}
            <strong>{import.meta.env.VITE_BACKEND}</strong>
          </p>
          <p>
            Check the terminal where you ran `npm run dev` in the Backend
            folder.
          </p>
        </div>
        <button onClick={fetchFestivals} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="App" ref={appRef}>
      {/* Static Navigation Bar */}
      <nav className="static-navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img
              src="Gemini_Generated_Image_8q6yw68q6yw68q6y (1).png"
              alt="Virtual Festival Hub Logo"
              className="nav-logo-img"
            />
            {/* <span className="nav-logo-text">Virtual Festival Hub</span> */}
          </div>

          <div className="nav-menu">
            <button
              className={`nav-item ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollToScection("home")}
            >
              HOME
            </button>
            <button
              className={`nav-item ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              ABOUT US
            </button>
            <button
              className={`nav-item ${activeSection === "team" ? "active" : ""}`}
              onClick={() => scrollToSection("team")}
            >
              MEET THE TEAM
            </button>
          </div>
        </div>
      </nav>

      {/* Main App Content */}
      <div className="main-content">
        {/* Header with Logo REMOVED */}
        <header className="main-header" id="home">
          <div className="header-text">
            <h1 className="main-title" ref={titleRef}>
              VIRTUAL FESTIVAL HUB
            </h1>
            <p className="main-subtitle" ref={subtitleRef}>
              Experience cultural celebrations in immersive virtual spaces
            </p>
            <div className="meet-status-indicator">
              {meetStatus === "loading" && (
                <span className="loading-mode">⏳ Creating Meeting...</span>
              )}
            </div>
          </div>
        </header>

        {/* Festivals Container */}
        <div className="festivals-container">
          {festivals.map((festival, index) => (
            <div
              key={festival._id || festival.id}
              ref={addToRefs}
              className="festival-card"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <div className="festival-content">
                <h2 className="festival-name">{festival.name}</h2>
                <p className="festival-description">{festival.description}</p>

                {festival.date && (
                  <div className="festival-date">
                    {new Date(festival.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}

                {festival.extraInfo && (
                  <p className="festival-extra">{festival.extraInfo}</p>
                )}

                <div className="action-buttons">
                  <button
                    onClick={() => joinGoogleMeet(festival.name)}
                    className="btn-meet"
                    disabled={meetStatus === "loading"}
                  >
                    {meetStatus === "loading" ? (
                      <>⏳ CREATING MEETING...</>
                    ) : (
                      <>🎥 JOIN GOOGLE MEET</>
                    )}
                  </button>
                  <button className="btn-learn">📚 LEARN MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <section className="about-section" id="about">
          <div className="about-container">
            <h2 className="about-title">About Virtual Festival Hub</h2>
            <div className="about-content">
              <p className="about-description">
                A virtual festival hub is a centralized online platform that
                replicates the experience of a physical festival. It allows a
                global audience to gather in a digital environment to celebrate,
                learn, and connect. Its core functions include: Live Content:
                Streaming performances, talks, and main stage events.
                Information Center: Providing schedules, artist bios, and
                festival details. Interaction: Enabling live video conferencing,
                text chat, and networking with attendees and speakers. Immersive
                Experience: Offering explorable virtual spaces like exhibition
                halls, lounges, and booths. In essence, it breaks down
                geographical barriers, making a festival accessible to anyone
                with an internet connection.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🎉</span>
                  <h3>Cultural Preservation</h3>
                  <p>Keeping traditional festivals alive in the digital age</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌍</span>
                  <h3>Global Access</h3>
                  <p>Join celebrations from anywhere in the world</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">💻</span>
                  <h3>Technology Driven</h3>
                  <p>Using latest tech to create immersive experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="team-section" ref={teamSectionRef} id="team">
          <div className="team-container">
            <h2 className="team-title">Meet the Team</h2>
            <div className="team-name">TEAM INNOVATORS</div>

            <div className="team-members">
              {/* Ayush Sharma */}
              <div
                className="team-member"
                ref={addToTeamRefs}
                onMouseEnter={() => handleTeamMemberHover(0)}
                onMouseLeave={() => handleTeamMemberLeave(0)}
              >
                <div>
                  <p className="apple">Team Lead</p>
                </div>

                <div className="member-photo">
                  <img
                    src="Team Innovators Lead.png"
                    alt="Ayush Sharma"
                    onError={(e) => {
                      e.target.src = "Team Innovators Lead.png";
                    }}
                  />
                </div>
                <h3 className="member-name">AYUSH SHARMA</h3>
                <p className="member-role">Data Analyst</p>
                <p className="member-role">UI/UX Designer</p>

                <p className="member-bio">
                  Driven by a passion for end-to-end product development. As a
                  Full Stack Developer with a foundation in Data Analysis and a
                  sharp eye for UI/UX, I bridge the gap between complex
                  technical challenges and compelling user experiences.
                </p>
                <div className="social-links">
                  <button
                    className="github-btn"
                    onClick={() => openGitHub("https://github.com/xyliophille")}
                  >
                    <span className="github-icon">🐙</span>
                    GitHub
                  </button>
                  <button
                    className="linkedin-btn"
                    onClick={() =>
                      openLinkedIn(
                        "https://www.linkedin.com/in/ayush-sharma-6b8b6b371/"
                      )
                    }
                  >
                    <span className="linkedin-icon">💼</span>
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Team Member 2 */}
              <div
                className="team-member"
                ref={addToTeamRefs}
                onMouseEnter={() => handleTeamMemberHover(1)}
                onMouseLeave={() => handleTeamMemberLeave(1)}
              >
                <div>
                  <p className="apple">Team Member</p>
                </div>
                <div className="member-photo">
                  <img
                    src="/api/placeholder/150/150"
                    alt="Team Member 2"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150/764ba2/ffffff?text=TM";
                    }}
                  />
                </div>
                <h3 className="member-name">Durga Prasad Nayak</h3>
                <p className="member-role">Frontend Developer</p>
                <p className="member-bio">
                  Creating beautiful and responsive user interfaces.
                </p>
                <div className="social-links">
                  <button
                    className="github-btn"
                    onClick={() => openGitHub("https://github.com")}
                  >
                    <span className="github-icon">🐙</span>
                    GitHub
                  </button>
                  <button
                    className="linkedin-btn"
                    onClick={() => openLinkedIn("https://linkedin.com")}
                  >
                    <span className="linkedin-icon">💼</span>
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Team Member 3
              <div
                className="team-member"
                ref={addToTeamRefs}
                onMouseEnter={() => handleTeamMemberHover(2)}
                onMouseLeave={() => handleTeamMemberLeave(2)}
              >
                <div>
                  <p className="apple">Team Member</p>
                </div>
                <div className="member-photo">
                  <img
                    src="/api/placeholder/150/150"
                    alt="Team Member 3"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150/f093fb/ffffff?text=TM";
                    }}
                  />
                </div>
                <h3 className="member-name">TEAM MEMBER 3</h3>
                <p className="member-role">Backend Developer</p>
                <p className="member-bio">
                  Building robust server-side solutions and APIs.
                </p>
                <div className="social-links">
                  <button
                    className="github-btn"
                    onClick={() => openGitHub("https://github.com")}
                  >
                    <span className="github-icon">🐙</span>
                    GitHub
                  </button>
                  <button
                    className="linkedin-btn"
                    onClick={() => openLinkedIn("https://linkedin.com")}
                  >
                    <span className="linkedin-icon">💼</span>
                    LinkedIn
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>

      {/* Gemini AI Assistant Component */}
      <GeminiAssistant />
    </div>
  );
}

export default App;
