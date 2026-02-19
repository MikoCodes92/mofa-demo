import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"signup" | "otp">("signup");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
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
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      alert("❌ Password must be at least 8 characters long!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("OTP sent to:", formData.email);
      setIsSubmitting(false);
      setStep("otp");

      setOtpTimer(60);
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("❌ Please enter the complete 6-digit OTP!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("OTP verified:", otpString);
      console.log("User registered:", formData);
      alert("✅ Registration successful! Welcome to our volunteer community.");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const resendOtp = () => {
    setOtpTimer(60);
    setOtp(["", "", "", "", "", ""]);

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    alert("📧 New OTP sent to your email!");
  };

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div style={pageStyle}>
      {/* Animated Background with Gradient */}
      <div style={animatedBgStyle}>
        <div style={gradientOrb1Style}></div>
        <div style={gradientOrb2Style}></div>
        <div style={gradientOrb3Style}></div>
      </div>

      {/* Larger Golden Droplets */}
      <div style={dropletContainerStyle}>
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 25 + 10;
          const duration = 15 + Math.random() * 20;
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

      {/* Floating Particles */}
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
            <h1 style={headerTitleStyle}>
              {step === "signup" ? "Create Account" : "Verify Email"}
            </h1>
            <p style={headerSubtitleStyle}>
              {step === "signup"
                ? "Join our volunteer community"
                : `Code sent to ${formData.email}`}
            </p>
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
              />
            </div>

            {/* Scrollable Content Area */}
            <div style={scrollableContentStyle}>
              {/* Sign Up Form */}
              {step === "signup" && (
                <form onSubmit={handleSignUp} style={formStyle}>
                  <h3 style={stepTitleStyle}>Personal Information</h3>
                  <p style={stepSubtitleStyle}>
                    Fill in your details to create an account
                  </p>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <UserOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter first name"
                      style={inputStyle}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <UserOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Enter middle name (optional)"
                      style={inputStyle}
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <UserOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter last name"
                      style={inputStyle}
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <MailOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      style={inputStyle}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <UserOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a username"
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
                      Password *
                    </label>
                    <div style={passwordContainerStyle}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Min. 8 characters"
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

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>
                      <LockOutlined
                        style={{
                          marginRight: 6,
                          color: colors.richGold,
                          fontSize: "clamp(12px, 3vw, 13px)",
                        }}
                      />
                      Confirm Password *
                    </label>
                    <div style={passwordContainerStyle}>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        style={passwordInputStyle}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        style={passwordToggleStyle}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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

                  <button
                    type="submit"
                    style={submitButtonStyle}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span style={spinnerStyle}></span>
                        Sending OTP...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <div style={dividerStyle}>
                    <span style={dividerTextStyle}>
                      Already have an account?
                    </span>
                  </div>

                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => navigate("/login")}
                  >
                    Login Instead
                  </button>
                </form>
              )}

              {/* OTP Verification Form */}
              {step === "otp" && (
                <div style={otpContainerStyle}>
                  <h3 style={stepTitleStyle}>Enter Verification Code</h3>
                  <p style={stepSubtitleStyle}>
                    We've sent a 6-digit code to{" "}
                    <strong>{formData.email}</strong>
                  </p>

                  <div style={otpInputsContainerStyle}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        style={otpInputStyle}
                      />
                    ))}
                  </div>

                  <div style={otpTimerStyle}>
                    {otpTimer > 0 ? (
                      <span>
                        Resend in <strong>{otpTimer}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        style={resendButtonStyle}
                        onClick={resendOtp}
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    style={submitButtonStyle}
                    disabled={isSubmitting || otp.join("").length !== 6}
                  >
                    {isSubmitting ? (
                      <>
                        <span style={spinnerStyle}></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Register
                        <CheckCircleOutlined
                          style={{
                            marginLeft: 8,
                            fontSize: "clamp(14px, 3vw, 16px)",
                          }}
                        />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => setStep("signup")}
                  >
                    Back to Sign Up
                  </button>
                </div>
              )}
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
  maxWidth: "min(500px, 90%)",
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
  fontSize: "clamp(18px, 5vw, 24px)",
  fontWeight: 700,
  color: colors.pureWhite,
  margin: 0,
  textAlign: "center" as const,
  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  whiteSpace: "nowrap" as const,
};

const headerSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(10px, 3vw, 13px)",
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
  maxHeight: "calc(100vh - 120px)",
};

const formCardStyle: React.CSSProperties = {
  position: "relative",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(20px)",
  borderRadius: "clamp(24px, 5vw, 32px)",
  padding: "clamp(24px, 5vw, 32px) clamp(20px, 4vw, 28px)",
  boxShadow: `0 25px 50px -12px ${colors.deepBlue}`,
  border: `1px solid ${colors.richGold}30`,
  overflow: "hidden",
  width: "100%",
  maxWidth: "min(500px, 95%)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column" as const,
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

// Scrollable Content Style
const scrollableContentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxHeight: "calc(80vh - 200px)",
  overflowY: "auto" as const,
  paddingRight: "8px",
  marginRight: "-8px",
  scrollbarWidth: "thin" as const,
  scrollbarColor: `${colors.richGold} ${colors.softGray}`,
};

// Custom scrollbar styles (will be added via CSS)
// Add this to your global CSS or inject with style tag

// MoFA Logo Styles
const logoContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: "clamp(20px, 5vh, 24px)",
  zIndex: 1,
  flexShrink: 0,
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

const stepTitleStyle: React.CSSProperties = {
  fontSize: "clamp(18px, 5vw, 22px)",
  fontWeight: 700,
  color: colors.deepBlue,
  margin: "0 0 4px",
  textAlign: "center" as const,
};

const stepSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(12px, 3.5vw, 14px)",
  color: colors.mediumGray,
  margin: "0 0 clamp(20px, 5vh, 28px)",
  textAlign: "center" as const,
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
  padding: "clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  border: `1px solid ${colors.softGray}`,
  fontSize: "clamp(13px, 3.5vw, 14px)",
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
  padding: "clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 14px)",
  paddingRight: "clamp(40px, 10vw, 45px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  border: `1px solid ${colors.softGray}`,
  fontSize: "clamp(13px, 3.5vw, 14px)",
  transition: "all 0.3s ease",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "inherit",
  backgroundColor: colors.pureWhite,
};

const passwordToggleStyle: React.CSSProperties = {
  position: "absolute",
  right: "clamp(10px, 2.5vw, 12px)",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(12px, 3vw, 14px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: "clamp(14px, 3.5vw, 15px)",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  marginTop: 16,
  boxShadow: `0 4px 15px -3px ${colors.richGold}`,
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(10px, 2.5vw, 12px)",
  borderRadius: "clamp(8px, 2vw, 10px)",
  background: "transparent",
  color: colors.deepBlue,
  fontSize: "clamp(13px, 3.5vw, 14px)",
  fontWeight: 600,
  border: `1px solid ${colors.richGold}`,
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "rgba(255,255,255,0.5)",
};

const dividerStyle: React.CSSProperties = {
  position: "relative",
  textAlign: "center" as const,
  margin: "clamp(16px, 4vh, 20px) 0",
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

// OTP Styles
const otpContainerStyle: React.CSSProperties = {
  ...formStyle,
};

const otpInputsContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "clamp(8px, 2vw, 12px)",
  justifyContent: "center",
  marginBottom: "clamp(20px, 5vh, 24px)",
  flexWrap: "wrap" as const,
};

const otpInputStyle: React.CSSProperties = {
  width: "clamp(45px, 10vw, 50px)",
  height: "clamp(50px, 12vw, 60px)",
  textAlign: "center" as const,
  fontSize: "clamp(20px, 5vw, 24px)",
  fontWeight: 600,
  borderRadius: "clamp(8px, 2vw, 12px)",
  border: `1px solid ${colors.softGray}`,
  outline: "none",
  transition: "all 0.3s ease",
  backgroundColor: colors.pureWhite,
};

const otpTimerStyle: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "clamp(20px, 5vh, 24px)",
  color: colors.mediumGray,
  fontSize: "clamp(13px, 3.5vw, 14px)",
};

const resendButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: colors.richGold,
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "underline",
  fontSize: "clamp(13px, 3.5vw, 14px)",
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

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${colors.softGray};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${colors.richGold};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.lightGold};
  }
`;

// Inject animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = globalAnimations;
  document.head.appendChild(style);
}
