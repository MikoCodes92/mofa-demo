import { useNavigate } from "react-router-dom";
import type { Event } from "../../core/mockData";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  RightOutlined,
} from "@ant-design/icons";

type Props = {
  event: Event;
  featured?: boolean;
};

// ================== CLEAN COLOR PALETTE ==================
const colors = {
  deepBlue: "#0A1A3A",
  richGold: "#C5A028",
  lightGold: "#F5D742",
  pureWhite: "#FFFFFF",
  offWhite: "#F8F9FA",
  softGray: "#E5E7EB",
  mediumGray: "#9CA3AF",
  darkGray: "#4B5563",
};

// ================== STYLES ==================
const styles = {
  card: {
    position: "relative" as const,
    border: `1px solid ${colors.softGray}`,
    padding: 28,
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: colors.pureWhite,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden",
  },

  featuredCard: {
    border: `2px solid ${colors.richGold}`,
    boxShadow: `0 8px 24px ${colors.richGold}20`,
  },

  featuredBorderGlow: {
    position: "absolute" as const,
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 24,
    background: `linear-gradient(135deg, ${colors.richGold}40, transparent, ${colors.richGold}40)`,
    zIndex: -1,
    animation: "borderPulse 3s ease-in-out infinite",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  badge: (type: string): React.CSSProperties => ({
    background: type === "Diplomatic" ? colors.softGray : colors.offWhite,
    color: colors.darkGray,
    padding: "6px 14px",
    borderRadius: 40,
    fontSize: 12,
    fontWeight: 600,
    border: `1px solid ${colors.mediumGray}30`,
  }),

  featuredBadge: {
    background: colors.richGold,
    color: colors.pureWhite,
    padding: "6px 16px",
    borderRadius: 40,
    fontSize: 12,
    fontWeight: 600,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
    color: colors.deepBlue,
    lineHeight: 1.3,
  },

  featuredTitle: {
    fontSize: 22,
    color: colors.deepBlue,
  },

  infoContainer: {
    marginBottom: 16,
    padding: "16px 0",
    borderTop: `1px solid ${colors.softGray}`,
    borderBottom: `1px solid ${colors.softGray}`,
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },

  icon: {
    fontSize: 18,
    color: colors.richGold,
    width: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: 500,
  },

  description: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 20,
    lineHeight: 1.6,
    opacity: 0.9,
  },

  featuredDescription: {
    borderLeft: `3px solid ${colors.richGold}`,
    paddingLeft: 16,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  registerButton: {
    background: "none",
    border: "none",
    fontSize: 14,
    color: colors.deepBlue,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    padding: "8px 0",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },

  registerIcon: {
    fontSize: 14,
    color: colors.richGold,
    transition: "transform 0.2s ease",
  },

  spotsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 14px",
    borderRadius: 40,
    backgroundColor: colors.offWhite,
    border: `1px solid ${colors.softGray}`,
  },

  featuredSpotsContainer: {
    backgroundColor: colors.richGold + "10",
    borderColor: colors.richGold,
  },

  spotsText: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.darkGray,
  },

  spotsPulse: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: colors.richGold,
    animation: "pulse 1.5s ease-in-out infinite",
  },
};

// ================== ANIMATIONS ==================

export default function VolunteerEventCard({ event, featured = false }: Props) {
  const navigate = useNavigate();

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/register/${event.event_id}`);
  };

  return (
    <div
      style={
        featured ? { ...styles.card, ...styles.featuredCard } : styles.card
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = featured
          ? `0 8px 24px ${colors.richGold}20`
          : "0 4px 12px rgba(0, 0, 0, 0.05)";
      }}
    >
      {/* Featured Elements */}
      {featured && <div style={styles.featuredBorderGlow}></div>}

      {/* Header */}
      <div style={styles.header}>
        <span style={styles.badge(event.type)}>
          {event.type === "Diplomatic" ? "🌍 Diplomatic" : "🤝 Community"}
        </span>

        {featured && <span style={styles.featuredBadge}>Featured</span>}
      </div>

      {/* Title */}
      <h3
        style={
          featured ? { ...styles.title, ...styles.featuredTitle } : styles.title
        }
      >
        {event.title}
      </h3>

      {/* Info with Ant Design Icons */}
      <div style={styles.infoContainer}>
        <div style={styles.infoRow}>
          <CalendarOutlined style={styles.icon} />
          <span style={styles.infoText}>{event.date}</span>
        </div>

        <div style={styles.infoRow}>
          <EnvironmentOutlined style={styles.icon} />
          <span style={styles.infoText}>
            {event.location || "Ministry of Foreign Affairs"}
          </span>
        </div>

        <div style={styles.infoRow}>
          <TeamOutlined style={styles.icon} />
          <span style={styles.infoText}>
            Needed: {event.volunteersNeeded || "Multiple"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={
          featured
            ? { ...styles.description, ...styles.featuredDescription }
            : styles.description
        }
      >
        {event.description ||
          "Join us in making a difference through international cooperation."}
      </p>

      {/* Footer */}
      <div style={styles.footer}>
        <button
          onClick={handleRegister}
          style={styles.registerButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "12px";
            const icon = e.currentTarget.querySelector(
              ".anticon-right",
            ) as HTMLElement;
            if (icon) icon.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "8px";
            const icon = e.currentTarget.querySelector(
              ".anticon-right",
            ) as HTMLElement;
            if (icon) icon.style.transform = "translateX(0)";
          }}
        >
          <span>Register</span>
          <RightOutlined
            style={styles.registerIcon}
            className="anticon-right"
          />
        </button>
      </div>
    </div>
  );
}
