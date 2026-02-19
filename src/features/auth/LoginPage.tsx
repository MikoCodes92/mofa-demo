import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  // Mouse move effect for card glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate login API call
    setTimeout(() => {
      // Check credentials - Using the credentials from your profile page
      if (formData.username === "miki@1383" && formData.password === "12345") {
        // Store credentials in localStorage
        localStorage.setItem("username", formData.username);
        localStorage.setItem("password", formData.password);

        console.log("Login successful for registered user");
        setIsSubmitting(false);
        navigate("/profile");
      } else if (
        formData.username === "mela@474" &&
        formData.password === "678910"
      ) {
        // Store credentials in localStorage
        localStorage.setItem("username", formData.username);
        localStorage.setItem("password", formData.password);

        console.log("Login successful for unregistered user");
        setIsSubmitting(false);
        navigate("/profile");
      } else {
        setError("Invalid username or password");
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Check if already logged in
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      navigate("/profile");
    }
  }, [navigate]);

  return (
    <div style={pageStyle}>
      {/* Animated Background with Gradient */}
      <div style={animatedBgStyle}>
        <div style={gradientOrb1Style}></div>
        <div style={gradientOrb2Style}></div>
        <div style={gradientOrb3Style}></div>
      </div>

      {/* Larger Golden Droplets - Enhanced Animation */}
      <div style={dropletContainerStyle}>
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 25 + 10; // 10-35px droplets
          const duration = 15 + Math.random() * 20; // 15-35s duration
          const delay = Math.random() * 10;
          const left = Math.random() * 100;

          return (
            <div
              key={i}
              style={{
                ...dropletStyle,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                filter: `blur(${Math.random() * 3}px)`,
                opacity: Math.random() * 0.4 + 0.2,
                transform: `rotate(${Math.random() * 360}deg)`,
                background: `radial-gradient(circle at 30% 30%, ${colors.richGold}, ${colors.deepBlue})`,
                boxShadow: `0 0 ${size / 2}px ${colors.richGold}`,
              }}
            />
          );
        })}
      </div>

      {/* Floating Particles (Smaller) */}
      <div style={particleContainerStyle}>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            style={{
              ...particleStyle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${18 + Math.random() * 15}s`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered */}
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <button style={backNavButtonStyle} onClick={() => navigate("/")}>
            <ArrowLeftOutlined
              style={{
                fontSize: "clamp(16px, 4vw, 18px)",
                color: colors.pureWhite,
              }}
            />
          </button>
          <div>
            <h1 style={headerTitleStyle}>Welcome Back</h1>
            <p style={headerSubtitleStyle}>Login to continue</p>
          </div>
          <div style={headerSpacerStyle}></div>
        </div>

        {/* Card Container */}
        <div style={cardContainerStyle}>
          <div style={formCardStyle} onMouseMove={handleMouseMove}>
            {/* Dynamic Glow Effect */}
            <div
              style={{
                ...cardGlowStyle,
                background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${colors.richGold}40, transparent 70%)`,
              }}
            />

            {/* MoFA Logo with Golden Pulse Animation */}
            <div style={logoContainerStyle}>
              <div style={logoPulseRing1Style}></div>
              <div style={logoPulseRing2Style}></div>
              <div style={logoPulseRing3Style}></div>
              <div style={logoGlowStyle}></div>
              <img
                src="/images/mfa-logo.png"
                alt="Ministry of Foreign Affairs"
                style={logoStyle}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={errorMessageStyle}>
                <span style={errorIconStyle}>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <UserOutlined
                    style={{
                      marginRight: 6,
                      color: colors.richGold,
                      fontSize: "clamp(12px, 3vw, 13px)",
                    }}
                  />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  style={inputStyle}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <LockOutlined
                    style={{
                      marginRight: 6,
                      color: colors.richGold,
                      fontSize: "clamp(12px, 3vw, 13px)",
                    }}
                  />
                  Password
                </label>
                <div style={passwordContainerStyle}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    style={passwordInputStyle}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    style={passwordToggleStyle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOutlined
                        style={{
                          color: colors.richGold,
                          fontSize: "clamp(14px, 3.5vw, 16px)",
                        }}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        style={{
                          color: colors.mediumGray,
                          fontSize: "clamp(14px, 3.5vw, 16px)",
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div style={forgotPasswordStyle}>
                <a href="#" style={forgotPasswordLinkStyle}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                style={submitButtonStyle}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span style={spinnerStyle}></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <LoginOutlined
                      style={{
                        marginLeft: 6,
                        fontSize: "clamp(12px, 3vw, 14px)",
                      }}
                    />
                  </>
                )}
              </button>

              <div style={dividerStyle}>
                <span style={dividerTextStyle}>New here?</span>
              </div>

              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </form>

            {/* Demo credentials hint */}
            <div style={demoHintStyle}>
              <p style={demoHintTextStyle}>
                <strong>Demo:</strong> miki@1383 / 12345 (registered)
                <br />
                or mela@474 / 678910 (new user)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================== STYLES ==================
const colors = {
  deepBlue: "#0A1A3A",
  mediumBlue: "#0f1e4a",
  lightBlue: "#1a2b5a",
  richGold: "#C5A028",
  lightGold: "#F5D742",
  pureWhite: "#FFFFFF",
  offWhite: "#F8F9FA",
  softGray: "#E5E7EB",
  mediumGray: "#9CA3AF",
  darkGray: "#4B5563",
  errorRed: "#EF4444",
};

const pageStyle: React.CSSProperties = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  position: "relative",
};

const animatedBgStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(125deg, ${colors.deepBlue}, ${colors.mediumBlue}, ${colors.lightBlue})`,
  zIndex: 0,
};

const gradientOrb1Style: React.CSSProperties = {
  position: "absolute",
  width: "min(80vmax, 1000px)",
  height: "min(80vmax, 1000px)",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.richGold}15, transparent 70%)`,
  top: "-30vmax",
  left: "-30vmax",
  animation: "moveOrb1 25s ease-in-out infinite",
};

const gradientOrb2Style: React.CSSProperties = {
  position: "absolute",
  width: "min(90vmax, 1100px)",
  height: "min(90vmax, 1100px)",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.lightGold}12, transparent 70%)`,
  bottom: "-40vmax",
  right: "-40vmax",
  animation: "moveOrb2 30s ease-in-out infinite",
};

const gradientOrb3Style: React.CSSProperties = {
  position: "absolute",
  width: "min(70vmax, 900px)",
  height: "min(70vmax, 900px)",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.deepBlue}30, transparent 70%)`,
  top: "20%",
  right: "10%",
  animation: "moveOrb3 22s ease-in-out infinite",
};

// Larger Golden Droplets Container
const dropletContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,
  overflow: "hidden",
};

const dropletStyle: React.CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  background: `radial-gradient(circle at 30% 30%, ${colors.richGold}, ${colors.deepBlue})`,
  animation: "floatDroplet linear infinite",
  opacity: 0.3,
  boxShadow: `0 0 20px ${colors.richGold}`,
};

const particleContainerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,
};

const particleStyle: React.CSSProperties = {
  position: "absolute",
  backgroundColor: colors.richGold,
  borderRadius: "50%",
  opacity: 0.15,
  animation: "floatParticle linear infinite",
  filter: "blur(1px)",
};

const mainContentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 3,
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  padding: "clamp(16px, 4vw, 24px)",
  boxSizing: "border-box" as const,
};

const headerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "min(400px, 90%)",
  marginBottom: "clamp(16px, 4vh, 24px)",
};

const backNavButtonStyle: React.CSSProperties = {
  width: "clamp(32px, 8vw, 36px)",
  height: "clamp(32px, 8vw, 36px)",
  borderRadius: "50%",
  border: `1px solid ${colors.richGold}40`,
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  color: colors.pureWhite,
  flexShrink: 0,
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 5vw, 22px)",
  fontWeight: 700,
  color: colors.pureWhite,
  margin: 0,
  textAlign: "center" as const,
  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  whiteSpace: "nowrap" as const,
};

const headerSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(10px, 3vw, 12px)",
  color: "rgba(255,255,255,0.8)",
  margin: "2px 0 0",
  textAlign: "center" as const,
};

const headerSpacerStyle: React.CSSProperties = {
  width: "clamp(32px, 8vw, 36px)",
  flexShrink: 0,
};

const cardContainerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formCardStyle: React.CSSProperties = {
  position: "relative",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(20px)",
  borderRadius: "clamp(20px, 5vw, 28px)",
  padding: "clamp(20px, 5vw, 28px) clamp(16px, 4vw, 24px)",
  boxShadow: `0 25px 50px -12px ${colors.deepBlue}`,
  border: `1px solid ${colors.richGold}30`,
  overflow: "hidden",
  width: "100%",
  maxWidth: "min(360px, 90%)",
  margin: "0 auto",
};

const cardGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  transition: "background 0.1s ease",
  zIndex: 0,
};

// Error Message Styles
const errorMessageStyle: React.CSSProperties = {
  backgroundColor: colors.errorRed + "15",
  border: `1px solid ${colors.errorRed}`,
  borderRadius: 8,
  padding: "10px 16px",
  marginBottom: 16,
  color: colors.errorRed,
  fontSize: 13,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const errorIconStyle: React.CSSProperties = {
  fontSize: 16,
};

// MoFA Logo Styles
const logoContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: "clamp(16px, 4vh, 20px)",
  zIndex: 1,
};

const logoPulseRing1Style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(100px, 25vw, 120px)",
  height: "clamp(100px, 25vw, 120px)",
  borderRadius: "50%",
  border: `2px solid ${colors.richGold}`,
  animation: "pulseRing1 3s ease-out infinite",
  opacity: 0,
};

const logoPulseRing2Style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(90px, 22vw, 110px)",
  height: "clamp(90px, 22vw, 110px)",
  borderRadius: "50%",
  border: `2px solid ${colors.lightGold}`,
  animation: "pulseRing2 3s ease-out infinite",
  opacity: 0,
  animationDelay: "0.5s",
};

const logoPulseRing3Style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(80px, 20vw, 100px)",
  height: "clamp(80px, 20vw, 100px)",
  borderRadius: "50%",
  border: `2px solid ${colors.richGold}`,
  animation: "pulseRing3 3s ease-out infinite",
  opacity: 0,
  animationDelay: "1s",
};

const logoGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(90px, 22vw, 110px)",
  height: "clamp(90px, 22vw, 110px)",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.richGold}60, transparent 70%)`,
  filter: "blur(15px)",
  animation: "glowPulse 3s ease-in-out infinite",
};

const logoStyle: React.CSSProperties = {
  position: "relative",
  width: "clamp(70px, 18vw, 90px)",
  height: "auto",
  borderRadius: "50%",
  border: `3px solid ${colors.richGold}`,
  padding: "clamp(4px, 1vw, 6px)",
  backgroundColor: colors.pureWhite,
  boxShadow: `0 15px 30px -5px ${colors.deepBlue}`,
  animation: "logoFloat 4s ease-in-out infinite",
  zIndex: 10,
  cursor: "pointer",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  position: "relative",
  zIndex: 1,
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: "clamp(12px, 3vh, 16px)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "clamp(11px, 3vw, 12px)",
  fontWeight: 600,
  color: colors.deepBlue,
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(8px, 2.5vw, 10px) clamp(10px, 3vw, 12px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  border: `1px solid ${colors.softGray}`,
  fontSize: "clamp(12px, 3.5vw, 13px)",
  transition: "all 0.3s ease",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "inherit",
  backgroundColor: colors.pureWhite,
};

const passwordContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
};

const passwordInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(8px, 2.5vw, 10px) clamp(10px, 3vw, 12px)",
  paddingRight: "clamp(35px, 10vw, 40px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  border: `1px solid ${colors.softGray}`,
  fontSize: "clamp(12px, 3.5vw, 13px)",
  transition: "all 0.3s ease",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "inherit",
  backgroundColor: colors.pureWhite,
};

const passwordToggleStyle: React.CSSProperties = {
  position: "absolute",
  right: "clamp(8px, 2.5vw, 10px)",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const forgotPasswordStyle: React.CSSProperties = {
  textAlign: "right" as const,
  marginBottom: "clamp(12px, 3vh, 16px)",
};

const forgotPasswordLinkStyle: React.CSSProperties = {
  color: colors.richGold,
  fontSize: "clamp(11px, 3vw, 12px)",
  textDecoration: "none",
  fontWeight: 500,
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(10px, 3vw, 12px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: "clamp(13px, 3.5vw, 14px)",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  marginBottom: "clamp(12px, 3vh, 16px)",
  boxShadow: `0 4px 15px -3px ${colors.richGold}`,
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(8px, 2.5vw, 10px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  background: "transparent",
  color: colors.deepBlue,
  fontSize: "clamp(12px, 3.5vw, 13px)",
  fontWeight: 600,
  border: `1px solid ${colors.richGold}`,
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "rgba(255,255,255,0.5)",
};

const dividerStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center" as const,
  margin: "clamp(12px, 3vh, 16px) 0",
};

const dividerTextStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.9)",
  padding: "0 clamp(8px, 2vw, 12px)",
  color: colors.mediumGray,
  fontSize: "clamp(11px, 3vw, 12px)",
};

const spinnerStyle: React.CSSProperties = {
  width: "clamp(14px, 3.5vw, 16px)",
  height: "clamp(14px, 3.5vw, 16px)",
  border: "2px solid rgba(255,255,255,0.3)",
  borderRadius: "50%",
  borderTopColor: colors.pureWhite,
  animation: "spin 0.8s linear infinite",
  marginRight: 6,
};

// Demo hint style
const demoHintStyle: React.CSSProperties = {
  marginTop: 16,
  padding: "12px",
  borderRadius: 8,
  background: colors.richGold + "10",
  border: `1px dashed ${colors.richGold}`,
  textAlign: "center" as const,
};

const demoHintTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: colors.darkGray,
  margin: 0,
  lineHeight: 1.6,
};

// Enhanced Global Animations
const globalAnimations = `
  @keyframes floatDroplet {
    0% { transform: translateY(110vh) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.5; }
    50% { opacity: 0.4; transform: translateY(50vh) rotate(180deg) scale(1.2); }
    90% { opacity: 0.3; }
    100% { transform: translateY(-20vh) rotate(360deg) scale(0.8); opacity: 0; }
  }
  
  @keyframes floatParticle {
    0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.2; }
    90% { opacity: 0.15; }
    100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
  }
  
  @keyframes moveOrb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(8%, 8%) scale(1.15); }
    66% { transform: translate(-8%, -8%) scale(0.9); }
  }
  
  @keyframes moveOrb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-8%, -8%) scale(1.15); }
    66% { transform: translate(8%, 8%) scale(0.9); }
  }
  
  @keyframes moveOrb3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(5%, -5%) scale(1.1); }
    66% { transform: translate(-5%, 5%) scale(0.95); }
  }
  
  @keyframes pulseRing1 {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
  }
  
  @keyframes pulseRing2 {
    0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.7; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
    100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
  }
  
  @keyframes pulseRing3 {
    0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
    50% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.2; }
    100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
  }
  
  @keyframes glowPulse {
    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
  }
  
  @keyframes logoFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Inject animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = globalAnimations;
  document.head.appendChild(style);
}
