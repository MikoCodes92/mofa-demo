import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import VolunteerEventCard from "./EventCard";
import type { Event } from "../../core/mockData";

type Props = {
  events: Event[];
};

export default function VolunteerLandingPage({ events }: Props) {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "desktop" | "wide"
  >("desktop");

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else if (width < 1920) setScreenSize("desktop");
      else setScreenSize("wide");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Disable heavy animations on mobile/tablet
  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";
  const shouldAnimate = !isMobile && !isTablet;

  // Mouse move parallax (disabled on mobile/tablet)
  useEffect(() => {
    if (!shouldAnimate || !heroRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldAnimate]);

  // Inject global animations
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalAnimations;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Dynamic particle count based on screen size
  const particleCount =
    screenSize === "mobile"
      ? 6
      : screenSize === "tablet"
        ? 12
        : screenSize === "desktop"
          ? 20
          : 30;

  return (
    <div style={pageStyle}>
      {/* Animated Background Particles */}
      <div style={particleContainerStyle}>
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            style={{
              ...particleStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * (screenSize === "wide" ? 8 : 6) + 2}px`,
              height: `${Math.random() * (screenSize === "wide" ? 8 : 6) + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        style={{
          ...heroStyle,
          transform: shouldAnimate
            ? `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
            : "none",
        }}
      >
        {/* Animated Gold Border */}
        <div style={heroBorderStyle}></div>

        {/* Floating Logo with Glow */}
        <div style={logoWrapperStyle}>
          <img
            src="/images/mfa-logo.png"
            alt="Ministry of Foreign Affairs"
            onClick={() => {
              window.location.href = "https://mfa.gov.et/";
            }}
            style={logoStyle}
            onMouseEnter={(e) => {
              if (shouldAnimate) {
                e.currentTarget.style.animation = "none";
                e.currentTarget.style.transform =
                  "scale(1.2) translateY(-10px)";
              }
            }}
            onMouseLeave={(e) => {
              if (shouldAnimate) {
                e.currentTarget.style.animation =
                  "logoAnimation 4s ease-in-out infinite";
                e.currentTarget.style.transform = "";
              }
            }}
          />
          <div style={logoGlowStyle}></div>
        </div>

        <h1 style={heroTitleStyle}>
          Make a Difference with the
          <span style={gradientTextStyle}> Ministry of Foreign Affairs</span>
        </h1>

        <p style={heroSubtitleStyle}>
          Join our elite global volunteer network and contribute to
          international cooperation, diplomatic events, and community outreach
          programs.
        </p>

        {/* CTA Button */}
        <button
          style={ctaButtonStyle}
          onClick={() => navigate("/register/1")}
          onMouseEnter={(e) => {
            if (shouldAnimate) {
              e.currentTarget.style.transform = "scale(1.08) translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 20px 40px -10px rgba(197,160,40,0.6)";
            }
          }}
          onMouseLeave={(e) => {
            if (shouldAnimate) {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 15px 30px -8px rgba(0,0,0,0.5)";
            }
          }}
        >
          <span style={buttonTextStyle}>Become a Volunteer</span>
          <span style={buttonIconStyle}>→</span>
          <div style={buttonRippleStyle}></div>
        </button>

        {/* Scroll Indicator - Hide on mobile */}
        {!isMobile && (
          <div style={scrollIndicatorStyle}>
            <span style={scrollTextStyle}>Scroll to explore</span>
            <div style={scrollArrowStyle}></div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div style={aboutSectionStyle}>
        <h2 style={sectionTitleStyle}>
          <span style={sectionTitleAccentStyle}>✦</span> Why Volunteer With Us?{" "}
          <span style={sectionTitleAccentStyle}>✦</span>
        </h2>

        <div style={benefitsGridStyle}>
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              style={benefitCardStyle}
              className="benefit-card"
              onMouseEnter={(e) => {
                if (shouldAnimate) {
                  e.currentTarget.style.transform =
                    "translateY(-15px) scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (shouldAnimate) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }
              }}
            >
              <div style={benefitIconWrapperStyle}>
                <span style={benefitIconStyle}>{benefit.icon}</span>
                <div style={benefitIconGlowStyle}></div>
              </div>
              <h3 style={benefitTitleStyle}>{benefit.title}</h3>
              <p style={benefitDescStyle}>{benefit.desc}</p>
              <div style={benefitUnderlineStyle}></div>
              <div style={benefitShineStyle}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div style={eventsSectionStyle}>
        <div style={eventsHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            <span style={sectionTitleAccentStyle}>◆</span> Current Volunteer
            Opportunities <span style={sectionTitleAccentStyle}>◆</span>
          </h2>
          <p style={sectionSubtitleStyle}>
            Join us in these prestigious upcoming events and initiatives
          </p>
        </div>

        <div style={eventsGridStyle}>
          {events.map((event, index) => (
            <div key={event.event_id} style={eventCardWrapperStyle}>
              <VolunteerEventCard event={event} featured={index === 0} />
            </div>
          ))}
        </div>

        <button
          style={viewAllButtonStyle}
          onClick={() => navigate("/volunteer/opportunities")}
          onMouseEnter={(e) => {
            if (shouldAnimate) {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #c5a028, #f5d742)";
              e.currentTarget.style.color = "#0a1a3a";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 15px 30px -8px rgba(197,160,40,0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (shouldAnimate) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#c5a028";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          View All Opportunities
          <span style={viewAllIconStyle}>→</span>
        </button>
      </div>

      {/* Testimonial Section */}
      <div style={testimonialSectionStyle}>
        <h2
          style={{
            ...sectionTitleStyle,
            color: "#ffffff",
            borderBottomColor: "#c5a028",
          }}
        >
          <span style={sectionTitleAccentStyle}>❝</span> Volunteer Stories{" "}
          <span style={sectionTitleAccentStyle}>❞</span>
        </h2>

        <div style={testimonialCardStyle} className="testimonial-card">
          <div style={testimonialQuoteStyle}>"</div>
          <p style={testimonialTextStyle}>
            Volunteering with the Ministry has been an eye-opening experience.
            I've helped organize international conferences and met people from
            all over the world. It's truly rewarding to contribute to diplomatic
            relations.
          </p>
          <div style={testimonialAuthorStyle}>
            <div style={testimonialAvatarStyle}>SC</div>
            <div style={testimonialAuthorInfoStyle}>
              <strong style={testimonialNameStyle}>Sarah Chen</strong>
              <span style={testimonialRoleStyle}>
                Diplomatic Event Volunteer
              </span>
            </div>
          </div>
          <div style={testimonialGoldBarStyle}></div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        style={{
          ...fabStyle,
          width:
            screenSize === "mobile" ? 44 : screenSize === "tablet" ? 50 : 60,
          height:
            screenSize === "mobile" ? 44 : screenSize === "tablet" ? 50 : 60,
          fontSize:
            screenSize === "mobile" ? 22 : screenSize === "tablet" ? 26 : 30,
          bottom:
            screenSize === "mobile" ? 16 : screenSize === "tablet" ? 20 : 30,
          right:
            screenSize === "mobile" ? 16 : screenSize === "tablet" ? 20 : 30,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={(e) => {
          if (shouldAnimate) {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 10px 25px -5px #c5a028";
          }
        }}
        onMouseLeave={(e) => {
          if (shouldAnimate) {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 5px 15px -3px rgba(0,0,0,0.3)";
          }
        }}
      >
        ↑
      </button>
    </div>
  );
}

// Add this new style for the benefit icons
const benefitIconImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  position: "relative",
  zIndex: 2,
};

// Benefits data
const benefitsData = [
  {
    icon: (
      <img
        src="/images/global.png"
        alt="Global Impact"
        style={benefitIconImageStyle}
      />
    ),
    title: "Global Impact",
    desc: "Support diplomatic missions and international events that shape foreign policy and global relations.",
  },
  {
    icon: (
      <img
        src="/images/cultural-relation.png"
        alt="Cultural Exchange"
        style={benefitIconImageStyle}
      />
    ),
    title: "Cultural Exchange",
    desc: "Work alongside diplomats and international delegations, experiencing diverse cultures firsthand.",
  },
  {
    icon: (
      <img
        src="/images/professionalism.png"
        alt="Professional Development"
        style={benefitIconImageStyle}
      />
    ),
    title: "Professional Development",
    desc: "Gain valuable experience in international relations, protocol, and cross-cultural communication.",
  },
  {
    icon: (
      <img
        src="/images/community-building.png"
        alt="Community Building"
        style={benefitIconImageStyle}
      />
    ),
    title: "Community Building",
    desc: "Help build bridges between nations through community outreach and educational programs.",
  },
];

// ================== GLOBAL ANIMATIONS ==================
const globalAnimations = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }
  @keyframes logoAnimation {
    0% { transform: translateY(0) scale(1); filter: drop-shadow(0 10px 20px rgba(197,160,40,0.3)); }
    50% { transform: translateY(-15px) scale(1.03); filter: drop-shadow(0 20px 30px rgba(197,160,40,0.5)); }
    100% { transform: translateY(0) scale(1); filter: drop-shadow(0 10px 20px rgba(197,160,40,0.3)); }
  }
  @keyframes particleFloat {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  @keyframes shine {
    0% { left: -100%; }
    20% { left: 100%; }
    100% { left: 100%; }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes borderRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Responsive classes */
  .benefit-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }
  .benefit-card:nth-child(1) { animation-delay: 0.1s; }
  .benefit-card:nth-child(2) { animation-delay: 0.2s; }
  .benefit-card:nth-child(3) { animation-delay: 0.3s; }
  .benefit-card:nth-child(4) { animation-delay: 0.4s; }
  .testimonial-card {
    animation: float 6s ease-in-out infinite;
  }
`;

// ================== STYLES ==================
const colors = {
  deepBlue: "#0a1a3a",
  mediumBlue: "#0f1e4a",
  lightBlue: "#1a2b5a",
  richGold: "#c5a028",
  lightGold: "#f5d742",
  white: "#ffffff",
  offWhite: "#f0f4fa",
  glassWhite: "rgba(255,255,255,0.1)",
  glassGold: "rgba(197,160,40,0.2)",
};

const pageStyle: React.CSSProperties = {
  maxWidth: "min(1920px, 100vw)",
  margin: "0 auto",
  padding: "clamp(16px, 4vw, 48px) clamp(16px, 3vw, 40px)",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  backgroundColor: colors.deepBlue,
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  boxSizing: "border-box" as const,
};

// Particle Background
const particleContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 0,
};

const particleStyle: React.CSSProperties = {
  position: "absolute",
  backgroundColor: colors.richGold,
  borderRadius: "50%",
  opacity: 0.2,
  animation: "particleFloat 8s linear infinite",
  filter: "blur(1px)",
};

// Hero Section - Fully responsive
const heroStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding:
    "clamp(40px, 8vw, 120px) clamp(16px, 4vw, 40px) clamp(60px, 10vw, 140px)",
  background: `radial-gradient(circle at 30% 30%, ${colors.lightBlue}, ${colors.deepBlue})`,
  borderRadius: "clamp(24px, 5vw, 60px)",
  marginBottom: "clamp(32px, 6vw, 80px)",
  boxShadow:
    "0 40px 70px -20px rgba(0,0,0,0.7), inset 0 0 100px rgba(197,160,40,0.1)",
  border: "2px solid rgba(197,160,40,0.3)",
  overflow: "hidden",
  transition: "transform 0.1s ease-out",
  zIndex: 1,
  width: "100%",
  boxSizing: "border-box" as const,
};

const heroBorderStyle: React.CSSProperties = {
  position: "absolute",
  top: -2,
  left: -2,
  right: -2,
  bottom: -2,
  border: "3px solid transparent",
  borderRadius: "clamp(24px, 5vw, 60px)",
  background: `linear-gradient(135deg, ${colors.richGold}, transparent, ${colors.richGold}) border-box`,
  WebkitMask:
    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
  animation: "borderRotate 4s linear infinite",
  opacity: 0.5,
};

const logoWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  marginBottom: "clamp(16px, 3vw, 30px)",
};

const logoStyle: React.CSSProperties = {
  width: "clamp(120px, 25vw, 280px)",
  height: "auto",
  position: "relative",
  zIndex: 3,
  filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.5))",
  animation: "logoAnimation 4s ease-in-out infinite",
  transition: "all 0.3s ease",
  cursor: "pointer",
  border: "4px solid rgba(197,160,40,0.8)",
  borderRadius: "50%",
  padding: "clamp(6px, 1.5vw, 12px)",
  backgroundColor: colors.white,
  maxWidth: "90vw",
};

const logoGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120%",
  height: "120%",
  background: `radial-gradient(circle, ${colors.richGold}40, transparent 70%)`,
  borderRadius: "50%",
  zIndex: 2,
  filter: "blur(20px)",
};

const gradientTextStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, ${colors.richGold}, ${colors.lightGold})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
  wordBreak: "break-word" as const,
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 5vw, 56px)",
  fontWeight: 800,
  color: colors.white,
  marginBottom: "clamp(12px, 2vw, 24px)",
  lineHeight: 1.2,
  textShadow: "0 4px 15px rgba(0,0,0,0.3)",
  maxWidth: "min(1200px, 90vw)",
  margin: "0 auto clamp(12px, 2vw, 24px)",
  padding: "0 10px",
  wordBreak: "break-word" as const,
};

const heroSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(14px, 2.5vw, 20px)",
  color: "#d0d8e8",
  maxWidth: "min(900px, 90vw)",
  margin: "0 auto clamp(24px, 4vw, 40px)",
  lineHeight: 1.6,
  padding: "0 15px",
  wordBreak: "break-word" as const,
};

const ctaButtonStyle: React.CSSProperties = {
  position: "relative",
  background: `linear-gradient(135deg, ${colors.richGold}, #a88920)`,
  color: colors.deepBlue,
  padding: "clamp(12px, 2vw, 18px) clamp(24px, 4vw, 50px)",
  borderRadius: 60,
  fontSize: "clamp(14px, 2vw, 18px)",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 15px 30px -8px rgba(0,0,0,0.5)",
  border: "1px solid rgba(255,255,255,0.3)",
  textTransform: "uppercase" as const,
  letterSpacing: "clamp(1px, 0.2vw, 2px)",
  display: "inline-flex",
  alignItems: "center",
  gap: "clamp(6px, 1vw, 10px)",
  overflow: "hidden",
  width: "fit-content",
  margin: "0 auto",
  whiteSpace: "nowrap" as const,
};

const buttonTextStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  fontSize: "inherit",
};

const buttonIconStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 2.5vw, 24px)",
  position: "relative",
  zIndex: 2,
  transition: "transform 0.3s ease",
};

const buttonRippleStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 0,
  height: 0,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.3)",
  transform: "translate(-50%, -50%)",
  transition: "width 0.6s, height 0.6s",
  zIndex: 1,
};

const scrollIndicatorStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "clamp(15px, 3vw, 30px)",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 8,
  opacity: 0.7,
};

const scrollTextStyle: React.CSSProperties = {
  color: colors.white,
  fontSize: "clamp(10px, 1.5vw, 12px)",
  letterSpacing: 2,
  textTransform: "uppercase" as const,
};

const scrollArrowStyle: React.CSSProperties = {
  width: "clamp(20px, 3vw, 30px)",
  height: "clamp(20px, 3vw, 30px)",
  borderLeft: "2px solid white",
  borderBottom: "2px solid white",
  transform: "rotate(-45deg)",
  animation: "float 2s ease-in-out infinite",
};

// Benefits Section
const aboutSectionStyle: React.CSSProperties = {
  marginBottom: "clamp(32px, 6vw, 80px)",
  position: "relative",
  zIndex: 2,
  width: "100%",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 5vw, 48px)",
  fontWeight: 700,
  color: colors.white,
  marginBottom: "clamp(16px, 3vw, 24px)",
  textAlign: "center" as const,
  position: "relative" as const,
  display: "inline-block",
  left: "50%",
  transform: "translateX(-50%)",
  paddingBottom: "clamp(12px, 2vw, 20px)",
  whiteSpace: "nowrap" as const,
  maxWidth: "95vw",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const sectionTitleAccentStyle: React.CSSProperties = {
  color: colors.richGold,
  fontSize: "clamp(20px, 4vw, 36px)",
  margin: "0 clamp(4px, 1vw, 15px)",
  opacity: 0.8,
};

const benefitsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
  gap: "clamp(16px, 3vw, 35px)",
  marginTop: "clamp(24px, 4vw, 60px)",
  padding: "0 5px",
  width: "100%",
  boxSizing: "border-box" as const,
};

const benefitCardStyle: React.CSSProperties = {
  position: "relative",
  padding: "clamp(20px, 3vw, 40px) clamp(16px, 2.5vw, 32px)",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "clamp(20px, 3vw, 30px)",
  textAlign: "center" as const,
  border: "1px solid rgba(197,160,40,0.2)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  cursor: "pointer",
  width: "100%",
  boxSizing: "border-box" as const,
};

const benefitIconWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "clamp(50px, 8vw, 80px)",
  height: "clamp(50px, 8vw, 80px)",
  margin: "0 auto clamp(12px, 2vw, 20px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const benefitIconStyle: React.CSSProperties = {
  fontSize: "clamp(32px, 6vw, 48px)",
  position: "relative",
  zIndex: 2,
};

const benefitIconGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  background: `radial-gradient(circle, ${colors.richGold}40, transparent 70%)`,
  borderRadius: "50%",
  filter: "blur(10px)",
};

const benefitTitleStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 3vw, 24px)",
  fontWeight: 600,
  marginBottom: "clamp(8px, 1.5vw, 15px)",
  color: colors.white,
  wordBreak: "break-word" as const,
};

const benefitDescStyle: React.CSSProperties = {
  fontSize: "clamp(13px, 2vw, 15px)",
  color: "#c0c8d8",
  lineHeight: 1.7,
  marginBottom: "clamp(12px, 2vw, 20px)",
  wordBreak: "break-word" as const,
};

const benefitUnderlineStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 3,
  background: `linear-gradient(90deg, transparent, ${colors.richGold}, transparent)`,
};

const benefitShineStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "-100%",
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
  animation: "shine 3s infinite",
  pointerEvents: "none" as const,
};

// Events Section
const eventsSectionStyle: React.CSSProperties = {
  marginBottom: "clamp(32px, 6vw, 80px)",
  position: "relative",
  zIndex: 2,
  width: "100%",
};

const eventsHeaderStyle: React.CSSProperties = {
  marginBottom: "clamp(24px, 4vw, 50px)",
};

const sectionSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(14px, 2.2vw, 18px)",
  color: "#b0c0d0",
  textAlign: "center" as const,
  marginBottom: "clamp(16px, 2.5vw, 20px)",
  padding: "0 15px",
  wordBreak: "break-word" as const,
};

const eventsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
  gap: "clamp(16px, 3vw, 30px)",
  marginBottom: "clamp(24px, 4vw, 50px)",
  padding: "0 5px",
  width: "100%",
  boxSizing: "border-box" as const,
};

const eventCardWrapperStyle: React.CSSProperties = {
  position: "relative",
  transition: "transform 0.3s ease",
  width: "100%",
};

const viewAllButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: colors.richGold,
  border: `2px solid ${colors.richGold}`,
  padding: "clamp(10px, 1.8vw, 15px) clamp(24px, 4vw, 45px)",
  borderRadius: 50,
  fontSize: "clamp(14px, 2vw, 18px)",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(5px, 1vw, 10px)",
  margin: "0 auto",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  textTransform: "uppercase" as const,
  letterSpacing: "clamp(1px, 0.2vw, 2px)",
  backdropFilter: "blur(5px)",
  width: "fit-content",
  whiteSpace: "nowrap" as const,
};

const viewAllIconStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 2.5vw, 24px)",
  transition: "transform 0.3s ease",
};

// Testimonial Section
const testimonialSectionStyle: React.CSSProperties = {
  position: "relative",
  background: `linear-gradient(145deg, ${colors.mediumBlue}, ${colors.deepBlue})`,
  padding: "clamp(32px, 6vw, 100px) clamp(16px, 3vw, 40px)",
  borderRadius: "clamp(24px, 5vw, 60px)",
  textAlign: "center" as const,
  color: colors.white,
  marginTop: "clamp(24px, 4vw, 60px)",
  border: "2px solid rgba(197,160,40,0.3)",
  boxShadow: "0 40px 60px -20px rgba(0,0,0,0.7)",
  overflow: "hidden",
  zIndex: 2,
  width: "100%",
  boxSizing: "border-box" as const,
};

const testimonialCardStyle: React.CSSProperties = {
  position: "relative",
  maxWidth: "min(900px, 95vw)",
  margin: "clamp(20px, 4vw, 50px) auto 0",
  padding: "clamp(24px, 4vw, 60px) clamp(20px, 3vw, 40px)",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  borderRadius: "clamp(20px, 3vw, 40px)",
  border: "1px solid rgba(197,160,40,0.2)",
  width: "100%",
  boxSizing: "border-box" as const,
};

const testimonialQuoteStyle: React.CSSProperties = {
  position: "absolute",
  top: "clamp(8px, 2vw, 20px)",
  left: "clamp(12px, 2.5vw, 30px)",
  fontSize: "clamp(48px, 10vw, 120px)",
  color: "rgba(197,160,40,0.2)",
  fontFamily: "Georgia, serif",
};

const testimonialTextStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 2.5vw, 20px)",
  fontStyle: "italic" as const,
  color: colors.white,
  lineHeight: 1.8,
  marginBottom: "clamp(16px, 3vw, 30px)",
  position: "relative",
  zIndex: 2,
  wordBreak: "break-word" as const,
};

const testimonialAuthorStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "clamp(12px, 2vw, 20px)",
  flexWrap: "wrap" as const,
};

const testimonialAvatarStyle: React.CSSProperties = {
  width: "clamp(44px, 6vw, 60px)",
  height: "clamp(44px, 6vw, 60px)",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.richGold}, ${colors.lightGold})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "clamp(18px, 3vw, 24px)",
  fontWeight: 700,
  color: colors.deepBlue,
  flexShrink: 0,
};

const testimonialAuthorInfoStyle: React.CSSProperties = {
  textAlign: "left" as const,
};

const testimonialNameStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 2.5vw, 18px)",
  color: colors.white,
  display: "block",
  marginBottom: 4,
};

const testimonialRoleStyle: React.CSSProperties = {
  fontSize: "clamp(12px, 2vw, 14px)",
  color: colors.richGold,
};

const testimonialGoldBarStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "clamp(120px, 30vw, 60%)",
  height: 3,
  background: `linear-gradient(90deg, transparent, ${colors.richGold}, transparent)`,
};

// Floating Action Button
const fabStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 30,
  right: 30,
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.richGold}, ${colors.lightGold})`,
  color: colors.deepBlue,
  fontSize: 30,
  cursor: "pointer",
  boxShadow: "0 5px 15px -3px rgba(0,0,0,0.3)",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid rgba(255,255,255,0.3)",
};
