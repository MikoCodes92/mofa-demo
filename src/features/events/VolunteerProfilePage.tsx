import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  StarOutlined,
  GlobalOutlined,
  WomanOutlined,
  ManOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  UploadOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";

// Mock data for registered user (miki@1383)
const registeredUserData = {
  application_number: "APP-2024-001234",
  user: {
    first_name: "Miki",
    middle_name: "Terefe",
    last_name: "shimeles",
    email: "miki@example.com",
  },
  university: "Addis Ababa University",
  department: "International Relations and Diplomacy",
  year_of_study: 4,
  gpa: 3.85,
  primary_language: "Amharic",
  additional_languages: ["English", "French", "Arabic"],
  phone_number: "+251 912 345 678",
  gender: "male",
  date_of_birth: "2001-08-22",
  motivation_statement:
    "I am deeply passionate about diplomacy and international relations. Growing up in Ethiopia, I've witnessed firsthand the importance of strong diplomatic ties. My academic background in International Relations has prepared me for this opportunity. I am fluent in multiple languages and have participated in Model United Nations conferences. I believe volunteering with the Ministry of Foreign Affairs will provide me with invaluable practical experience in diplomatic protocols and international cooperation. I am committed to representing my country with professionalism and contributing meaningfully to the Ministry's outreach programs.",
  current_stage: "Interview Scheduled",
  status: "interview_scheduled",
  submitted_at: "2024-02-10T09:30:00Z",

  // Application stages timeline
  stages: [
    {
      name: "Application Submitted",
      status: "completed",
      date: "2024-02-10",
      icon: "📝",
    },
    {
      name: "Document Verification",
      status: "completed",
      date: "2024-02-13",
      icon: "✅",
    },
    {
      name: "Initial Review",
      status: "completed",
      date: "2024-02-17",
      icon: "🔍",
    },
    {
      name: "Interview Scheduled",
      status: "current",
      date: "2024-03-05",
      icon: "🎯",
    },
    { name: "Final Decision", status: "pending", date: "TBD", icon: "🏆" },
  ],

  // Documents uploaded
  documents: [
    {
      id: "doc1",
      type: "id",
      name: "National ID",
      file_url: "/docs/recommendation.pdf",
      file_type: "pdf",
      is_verified: true,
      verified_at: "2024-02-13",
      uploaded_at: "2024-02-10",
    },
    {
      id: "doc2",
      type: "transcript",
      name: "Academic Transcript",
      file_url: "/docs/transcript.pdf",
      file_type: "pdf",
      is_verified: true,
      verified_at: "2024-02-13",
      uploaded_at: "2024-02-10",
    },
    {
      id: "doc3",
      type: "recommendation",
      name: "Recommendation Letter",
      file_url: "/docs/recommendation.pdf",
      file_type: "pdf",
      is_verified: true,
      verified_at: "2024-02-13",
      uploaded_at: "2024-02-10",
    },
    {
      id: "doc4",
      type: "language_certificate",
      name: "Language Proficiency Certificate",
      file_url: "/docs/recommendation.pdf",
      file_type: "pdf",
      is_verified: true,
      verified_at: "2024-02-13",
      uploaded_at: "2024-02-10",
    },
  ],

  // Interview details
  interview: {
    date: "March 5, 2024",
    time: "10:00 AM",
    location: "Ministry of Foreign Affairs, Addis Ababa",
    duration: "45 minutes",
    format: "In-person",
    what_to_bring: [
      "Original National ID or Passport",
      "Printed application confirmation",
      "Academic transcripts (original & copy)",
      "2 recent passport-size photos",
      "Language certificates",
      "Pen and notebook",
    ],
    preparation_tips: [
      "Research Ethiopia's current foreign policy priorities",
      "Practice common diplomatic interview questions",
      "Prepare questions for the panel about the Ministry",
      "Arrive 30 minutes early",
      "Dress in professional business attire",
    ],
  },
};

// Mock data for user who needs to register (mela@474)
const unregisteredUserData = {
  application_number: null,
  user: {
    first_name: "Mela",
    middle_name: "Bekele",
    last_name: "Tadesse",
    email: "mela@example.com",
  },
  university: "",
  department: "",
  year_of_study: null,
  gpa: null,
  primary_language: "Amharic",
  additional_languages: ["English"],
  phone_number: "",
  gender: "male",
  date_of_birth: "",
  motivation_statement: "",
  current_stage: "Not Registered",
  status: "not_registered",
  submitted_at: null,

  stages: [],

  documents: [],

  interview: null,
};

// Document type options
const documentTypes = [
  { value: "id", label: "National ID / Passport" },
  { value: "transcript", label: "Academic Transcript" },
  { value: "recommendation", label: "Recommendation Letter" },
  { value: "language_certificate", label: "Language Certificate" },
  { value: "photo", label: "Passport Photo" },
  { value: "other", label: "Other Document" },
];

// Status mapping for display
const statusConfig = {
  submitted: {
    color: "#9CA3AF",
    label: "Submitted",
    icon: ClockCircleOutlined,
  },
  under_review: {
    color: "#F5D742",
    label: "Under Review",
    icon: FileTextOutlined,
  },
  document_verification: {
    color: "#C5A028",
    label: "Verifying Documents",
    icon: CheckCircleOutlined,
  },
  interview_scheduled: {
    color: "#0A1A3A",
    label: "Interview Scheduled",
    icon: CalendarOutlined,
  },
  interview_completed: {
    color: "#4B5563",
    label: "Interview Completed",
    icon: UserOutlined,
  },
  selected: { color: "#10B981", label: "Selected", icon: StarOutlined },
  rejected: {
    color: "#EF4444",
    label: "Not Selected",
    icon: ClockCircleOutlined,
  },
  not_registered: {
    color: "#9CA3AF",
    label: "Not Registered",
    icon: FileTextOutlined,
  },
};

// ================== STYLES ==================
const colors = {
  deepBlue: "#0A1A3A",
  richGold: "#C5A028",
  lightGold: "#F5D742",
  pureWhite: "#FFFFFF",
  offWhite: "#F8F9FA",
  softGray: "#E5E7EB",
  mediumGray: "#9CA3AF",
  darkGray: "#4B5563",
  successGreen: "#10B981",
  errorRed: "#EF4444",
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: colors.offWhite,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  position: "relative",
};

const backgroundPatternStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at 10% 20%, ${colors.richGold}08, transparent 30%),
              radial-gradient(circle at 90% 80%, ${colors.deepBlue}08, transparent 30%)`,
  pointerEvents: "none",
  zIndex: 0,
};

// Dashboard Header Styles
const dashboardHeaderStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: colors.pureWhite,
  borderBottom: `1px solid ${colors.softGray}`,
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const headerLeftStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  flex: 1,
};

const logoContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const headerLogoStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover" as const,
};

const logoTextStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: colors.deepBlue,
  letterSpacing: "0.5px",
};

const headerRightStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 16,
};

const headerDateTimeStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.darkGray,
  display: "flex",
  alignItems: "center",
  padding: "6px 12px",
  background: colors.offWhite,
  borderRadius: 30,
  border: `1px solid ${colors.softGray}`,
};

const headerIconButtonStyle: React.CSSProperties = {
  position: "relative",
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `1px solid ${colors.softGray}`,
  background: colors.pureWhite,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

const headerIconStyle: React.CSSProperties = {
  fontSize: 18,
  color: colors.darkGray,
};

const notificationBadgeStyle: React.CSSProperties = {
  position: "absolute",
  top: -2,
  right: -2,
  background: colors.errorRed,
  color: colors.pureWhite,
  fontSize: 10,
  fontWeight: 600,
  padding: "2px 5px",
  borderRadius: 10,
  minWidth: 16,
  textAlign: "center" as const,
};

const userMenuStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "4px 8px 4px 4px",
  borderRadius: 40,
  background: colors.offWhite,
  border: `1px solid ${colors.softGray}`,
};

const userAvatarSmallStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 14,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const userInfoSmallStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
};

const userNameSmallStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: colors.deepBlue,
};

const userRoleSmallStyle: React.CSSProperties = {
  fontSize: 11,
  color: colors.mediumGray,
};

const logoutButtonStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.mediumGray,
  transition: "all 0.2s ease",
};

const mainContentAreaStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  padding: "24px",
  maxWidth: 1200,
  margin: "0 auto",
};

const headerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 30,
  maxWidth: 800,
  marginLeft: "auto",
  marginRight: "auto",
};

const backNavButtonStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: `2px solid ${colors.softGray}`,
  background: colors.pureWhite,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
};

const headerTitleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: colors.deepBlue,
  margin: 0,
  textAlign: "center" as const,
};

const headerSubtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.mediumGray,
  margin: "4px 0 0",
  textAlign: "center" as const,
};

const headerSpacerStyle: React.CSSProperties = {
  width: 44,
};

const containerStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 800,
  margin: "0 auto",
};

const applicationBannerStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 16,
  padding: "16px 24px",
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  border: `1px solid ${colors.softGray}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const applicationNumberStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: colors.deepBlue,
  flex: 1,
};

const statusBadgeStyle: React.CSSProperties = {
  padding: "6px 16px",
  borderRadius: 40,
  background: colors.richGold + "10",
  color: colors.deepBlue,
  fontSize: 13,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  border: `1px solid ${colors.richGold}`,
};

const profileHeaderStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 24,
  padding: "32px",
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  gap: 24,
  border: `1px solid ${colors.softGray}`,
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
};

const avatarContainerStyle: React.CSSProperties = {
  position: "relative",
};

const avatarStyle: React.CSSProperties = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 36,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 10px 20px -5px ${colors.richGold}60`,
};

const profileInfoStyle: React.CSSProperties = {
  flex: 1,
};

const profileNameStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: colors.deepBlue,
  margin: "0 0 8px",
};

const profileEmailStyle: React.CSSProperties = {
  fontSize: 16,
  color: colors.mediumGray,
  margin: 0,
  display: "flex",
  alignItems: "center",
};

// Tab Styles
const tabContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  marginBottom: 24,
  background: colors.pureWhite,
  padding: "8px",
  borderRadius: 50,
  border: `1px solid ${colors.softGray}`,
  flexWrap: "wrap" as const,
};

const tabStyle: React.CSSProperties = {
  flex: 1,
  padding: "12px 24px",
  borderRadius: 40,
  border: "none",
  background: "transparent",
  fontSize: 15,
  fontWeight: 600,
  color: colors.mediumGray,
  cursor: "pointer",
  transition: "all 0.3s ease",
  minWidth: "fit-content" as const,
};

const activeTabStyle: React.CSSProperties = {
  background: colors.deepBlue,
  color: colors.pureWhite,
};

const tabContentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const sectionCardStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 24,
  padding: "28px",
  border: `1px solid ${colors.softGray}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const sectionHeaderWithButtonStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  flexWrap: "wrap" as const,
  gap: 16,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: colors.deepBlue,
  margin: 0,
  display: "flex",
  alignItems: "center",
};

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(5px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContentStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 24,
  width: "90%",
  maxWidth: 800,
  maxHeight: "90vh",
  overflow: "hidden",
  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
};

const modalHeaderStyle: React.CSSProperties = {
  padding: "20px 24px",
  borderBottom: `1px solid ${colors.softGray}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: colors.deepBlue,
  margin: 0,
};

const modalCloseStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "none",
  background: colors.offWhite,
  fontSize: 24,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalBodyStyle: React.CSSProperties = {
  padding: 24,
  maxHeight: "calc(90vh - 140px)",
  overflow: "auto",
};

const modalFooterStyle: React.CSSProperties = {
  padding: "20px 24px",
  borderTop: `1px solid ${colors.softGray}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
};

// Upload Form Styles - ADD THIS MISSING STYLE
const uploadFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

// Document Preview Styles
const pdfViewerStyle: React.CSSProperties = {
  width: "100%",
  height: "70vh",
  border: "none",
};

const imageViewerStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "70vh",
  objectFit: "contain" as const,
  display: "block",
  margin: "0 auto",
};

// Document Grid Styles
const documentsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 16,
  marginTop: 20,
};

const documentCardStyle: React.CSSProperties = {
  background: colors.offWhite,
  borderRadius: 16,
  padding: "16px",
  border: `1px solid ${colors.softGray}`,
  transition: "all 0.3s ease",
};

const documentCardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
};

const documentCardIconStyle: React.CSSProperties = {
  fontSize: 24,
  color: colors.richGold,
};

const documentCardInfoStyle: React.CSSProperties = {
  flex: 1,
};

const documentCardTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: colors.deepBlue,
  margin: "0 0 4px",
};

const documentCardMetaStyle: React.CSSProperties = {
  fontSize: 12,
  color: colors.mediumGray,
  margin: 0,
};

const documentCardActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
};

const actionButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: `1px solid ${colors.softGray}`,
  background: colors.pureWhite,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

const deleteButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: `1px solid ${colors.errorRed}`,
  background: colors.pureWhite,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  color: colors.errorRed,
};

const verifiedBadgeStyle: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 20,
  background: colors.successGreen + "15",
  color: colors.successGreen,
  fontSize: 11,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 4,
};

// Button Styles
const uploadButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 30,
  border: `1px solid ${colors.richGold}`,
  background: "transparent",
  color: colors.richGold,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const editButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 30,
  border: `1px solid ${colors.richGold}`,
  background: "transparent",
  color: colors.richGold,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const saveButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 30,
  border: "none",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 30,
  border: `1px solid ${colors.softGray}`,
  background: "transparent",
  color: colors.darkGray,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const downloadButtonStyle: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.richGold}`,
  background: "transparent",
  color: colors.richGold,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const modalCloseBtnStyle: React.CSSProperties = {
  padding: "8px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.softGray}`,
  background: colors.pureWhite,
  color: colors.darkGray,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

// Form Styles
const profileFormStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const formRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
};

const formGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const formLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: colors.deepBlue,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${colors.softGray}`,
  fontSize: 14,
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
};

const selectStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${colors.softGray}`,
  fontSize: 14,
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
  background: colors.pureWhite,
};

const textareaStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: 10,
  border: `1px solid ${colors.softGray}`,
  fontSize: 14,
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
  resize: "vertical" as const,
};

const formMessageStyle: React.CSSProperties = {
  padding: "12px",
  background: colors.offWhite,
  borderRadius: 10,
  fontSize: 13,
  color: colors.mediumGray,
  display: "flex",
  alignItems: "center",
};

// File Upload Styles
const fileUploadAreaStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap" as const,
};

const fileUploadLabelStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.richGold}`,
  background: "transparent",
  color: colors.richGold,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const fileNameStyle: React.CSSProperties = {
  fontSize: 13,
  color: colors.darkGray,
};

const fileHintStyle: React.CSSProperties = {
  fontSize: 11,
  color: colors.mediumGray,
  margin: "4px 0 0",
};

// Empty States
const emptyDocumentsStyle: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "40px 20px",
};

const emptyIconStyle: React.CSSProperties = {
  fontSize: 48,
  color: colors.mediumGray,
  marginBottom: 16,
};

const emptyTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: colors.deepBlue,
  margin: "0 0 8px",
};

const emptyTextStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.mediumGray,
  margin: "0 0 20px",
};

const uploadEmptyButtonStyle: React.CSSProperties = {
  padding: "10px 24px",
  borderRadius: 30,
  border: "none",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

// Welcome Card
const welcomeCardStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  borderRadius: 24,
  padding: "60px 40px",
  textAlign: "center" as const,
  color: colors.pureWhite,
};

const welcomeIconStyle: React.CSSProperties = {
  fontSize: 64,
  color: colors.pureWhite,
  marginBottom: 24,
  opacity: 0.9,
};

const welcomeTitleStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  color: colors.pureWhite,
  margin: "0 0 16px",
};

const welcomeTextStyle: React.CSSProperties = {
  fontSize: 18,
  color: "rgba(255,255,255,0.9)",
  margin: "0 0 32px",
  maxWidth: 500,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
};

const getStartedButtonStyle: React.CSSProperties = {
  padding: "14px 32px",
  borderRadius: 40,
  border: "none",
  background: colors.pureWhite,
  color: colors.deepBlue,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.3s ease",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

// Required Documents
const requiredDocsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginBottom: 24,
};

const requiredDocItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "8px 12px",
  background: colors.offWhite,
  borderRadius: 8,
  fontSize: 14,
  color: colors.darkGray,
};

const docUploadedStyle: React.CSSProperties = {
  marginLeft: "auto",
  color: colors.successGreen,
  fontSize: 12,
  fontWeight: 600,
};

const uploadedDocsTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: colors.deepBlue,
  margin: "20px 0 12px",
};

const submitSectionStyle: React.CSSProperties = {
  marginTop: 24,
  textAlign: "center" as const,
};

const submitApplicationButtonStyle: React.CSSProperties = {
  padding: "14px 32px",
  borderRadius: 40,
  border: "none",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: `0 8px 20px -5px ${colors.richGold}`,
};

// Timeline Styles
const timelineStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const timelineItemStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
};

const timelineIconStyle: React.CSSProperties = {
  position: "relative",
  width: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const timelineDotStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  zIndex: 2,
};

const timelineLineStyle: React.CSSProperties = {
  position: "absolute",
  top: 16,
  width: 2,
  height: 40,
  background: colors.softGray,
  zIndex: 1,
};

const timelineContentStyle: React.CSSProperties = {
  flex: 1,
  paddingBottom: 20,
};

const timelineHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 4,
};

const timelineTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: colors.deepBlue,
};

const timelineDateStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.mediumGray,
};

const timelineStatusStyle: React.CSSProperties = {
  fontSize: 13,
  color: colors.richGold,
};

// Info Grid
const infoGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 20,
};

const infoItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: colors.mediumGray,
  display: "flex",
  alignItems: "center",
};

const infoValueStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: colors.deepBlue,
};

// Languages
const languageContainerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
};

const languageBadgeStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: 40,
  background: colors.offWhite,
  border: `1px solid ${colors.softGray}`,
  fontSize: 14,
  color: colors.deepBlue,
};

const motivationStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.8,
  color: colors.darkGray,
  margin: 0,
};

// Interview
const interviewDetailsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const interviewDetailItemStyle: React.CSSProperties = {
  display: "flex",
  borderBottom: `1px solid ${colors.softGray}`,
  paddingBottom: 12,
};

const interviewDetailLabelStyle: React.CSSProperties = {
  width: 140,
  fontSize: 15,
  fontWeight: 600,
  color: colors.mediumGray,
};

const interviewDetailValueStyle: React.CSSProperties = {
  flex: 1,
  fontSize: 15,
  color: colors.deepBlue,
  fontWeight: 500,
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const listItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: `1px solid ${colors.softGray}`,
  fontSize: 15,
  color: colors.darkGray,
};

// Empty State
const emptyStateStyle: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "60px 20px",
  background: colors.pureWhite,
  borderRadius: 24,
  border: `1px solid ${colors.softGray}`,
};

const emptyStateTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  color: colors.deepBlue,
  margin: "0 0 8px",
};

const emptyStateTextStyle: React.CSSProperties = {
  fontSize: 15,
  color: colors.mediumGray,
  margin: 0,
};

export default function VolunteerProfilePage() {
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(registeredUserData);
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "interview" | "profile"
  >("overview");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRegistered, setIsRegistered] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    type: "",
    name: "",
    file: null as File | null,
  });

  // Form state for unregistered user
  const [formData, setFormData] = useState({
    university: "",
    department: "",
    year_of_study: "",
    gpa: "",
    phone_number: "",
    date_of_birth: "",
    motivation_statement: "",
    additional_languages: [] as string[],
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username === "miki@1383" && password === "12345") {
      setApplicant(registeredUserData);
      setIsRegistered(true);
    } else if (username === "mela@474" && password === "678910") {
      setApplicant(unregisteredUserData);
      setIsRegistered(false);
      // Initialize form with existing data
      setFormData({
        university: unregisteredUserData.university || "",
        department: unregisteredUserData.department || "",
        year_of_study: unregisteredUserData.year_of_study?.toString() || "",
        gpa: unregisteredUserData.gpa?.toString() || "",
        phone_number: unregisteredUserData.phone_number || "",
        date_of_birth: unregisteredUserData.date_of_birth || "",
        motivation_statement: unregisteredUserData.motivation_statement || "",
        additional_languages: unregisteredUserData.additional_languages || [
          "English",
        ],
      });
    } else {
      navigate("/login");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Clean up object URLs when component unmounts or when documents change
  useEffect(() => {
    return () => {
      // Clean up object URLs to prevent memory leaks
      applicant.documents.forEach((doc: any) => {
        if (doc.file_url?.startsWith("blob:")) {
          URL.revokeObjectURL(doc.file_url);
        }
      });
    };
  }, [applicant.documents]);

  const getStatusConfig = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.submitted
    );
  };

  const StatusIcon = applicant.status
    ? getStatusConfig(applicant.status).icon
    : ClockCircleOutlined;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (doc: any) => {
    setPreviewDocument(doc);
  };

  const closePreview = () => {
    setPreviewDocument(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    // Save profile data
    const updatedApplicant = {
      ...applicant,
      university: formData.university,
      department: formData.department,
      year_of_study: parseInt(formData.year_of_study) || null,
      gpa: parseFloat(formData.gpa) || null,
      phone_number: formData.phone_number,
      date_of_birth: formData.date_of_birth,
      motivation_statement: formData.motivation_statement,
      additional_languages: formData.additional_languages,
    };
    setApplicant(updatedApplicant);
    setIsEditing(false);
    alert("✅ Profile information saved successfully!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPG, and PNG files are allowed");
        return;
      }

      setUploadData({ ...uploadData, file: file });
    }
  };

  const handleUploadDocument = () => {
    if (!uploadData.type || !uploadData.name || !uploadData.file) {
      alert("Please fill all fields and select a file");
      return;
    }

    // Create a local URL for preview
    const fileUrl = URL.createObjectURL(uploadData.file);

    // Simulate upload
    const newDoc = {
      id: `doc${Date.now()}`,
      type: uploadData.type,
      name: uploadData.name,
      file_url: fileUrl,
      file_type: uploadData.file.type.includes("pdf") ? "pdf" : "image",
      is_verified: false,
      uploaded_at: new Date().toISOString().split("T")[0],
    };

    const updatedApplicant = {
      ...applicant,
      documents: [...applicant.documents, newDoc],
    };
    setApplicant(updatedApplicant);
    setUploadModal(false);
    setUploadData({ type: "", name: "", file: null });
    alert("✅ Document uploaded successfully! It will be verified shortly.");
  };

  const handleDeleteDocument = (docId: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      const updatedDocuments = applicant.documents.filter(
        (d: any) => d.id !== docId,
      );
      const updatedApplicant = { ...applicant, documents: updatedDocuments };
      setApplicant(updatedApplicant);
    }
  };

  return (
    <div style={pageStyle}>
      {/* Background Pattern */}
      <div style={backgroundPatternStyle}></div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <div style={modalOverlayStyle} onClick={closePreview}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>{previewDocument.name}</h3>
              <button style={modalCloseStyle} onClick={closePreview}>
                ×
              </button>
            </div>
            <div style={modalBodyStyle}>
              {previewDocument.file_type === "pdf" ? (
                <iframe
                  src={previewDocument.file_url}
                  style={pdfViewerStyle}
                  title={previewDocument.name}
                />
              ) : (
                <img
                  src={previewDocument.file_url}
                  alt={previewDocument.name}
                  style={imageViewerStyle}
                />
              )}
            </div>
            <div style={modalFooterStyle}>
              <button
                style={downloadButtonStyle}
                onClick={() =>
                  handleDownload(previewDocument.file_url, previewDocument.name)
                }
              >
                <DownloadOutlined /> Download
              </button>
              <button style={modalCloseBtnStyle} onClick={closePreview}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {uploadModal && (
        <div style={modalOverlayStyle} onClick={() => setUploadModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>Upload Document</h3>
              <button
                style={modalCloseStyle}
                onClick={() => {
                  setUploadModal(false);
                  setUploadData({ type: "", name: "", file: null });
                }}
              >
                ×
              </button>
            </div>
            <div style={modalBodyStyle}>
              <div style={uploadFormStyle}>
                <div style={formGroupStyle}>
                  <label style={formLabelStyle}>Document Type</label>
                  <select
                    style={selectStyle}
                    value={uploadData.type}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, type: e.target.value })
                    }
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={formGroupStyle}>
                  <label style={formLabelStyle}>Document Name</label>
                  <input
                    type="text"
                    style={inputStyle}
                    placeholder="e.g., National ID Front"
                    value={uploadData.name}
                    onChange={(e) =>
                      setUploadData({ ...uploadData, name: e.target.value })
                    }
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={formLabelStyle}>Select File</label>
                  <div style={fileUploadAreaStyle}>
                    <input
                      type="file"
                      id="file-upload"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" style={fileUploadLabelStyle}>
                      <UploadOutlined /> Choose File
                    </label>
                    {uploadData.file && (
                      <span style={fileNameStyle}>{uploadData.file.name}</span>
                    )}
                  </div>
                  <p style={fileHintStyle}>
                    Accepted formats: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
            <div style={modalFooterStyle}>
              <button
                style={{
                  ...saveButtonStyle,
                  opacity:
                    !uploadData.type || !uploadData.name || !uploadData.file
                      ? 0.5
                      : 1,
                  cursor:
                    !uploadData.type || !uploadData.name || !uploadData.file
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={handleUploadDocument}
                disabled={
                  !uploadData.type || !uploadData.name || !uploadData.file
                }
              >
                <UploadOutlined /> Upload
              </button>
              <button
                style={cancelButtonStyle}
                onClick={() => {
                  setUploadModal(false);
                  setUploadData({ type: "", name: "", file: null });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Dashboard Header */}
      <div style={dashboardHeaderStyle}>
        <div style={headerLeftStyle}>
          <div style={logoContainerStyle}>
            <img
              src="/images/mfa-logo.png"
              alt="MoFA"
              style={headerLogoStyle}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span style={logoTextStyle}>MoFA Volunteer Portal</span>
          </div>
        </div>

        <div style={headerRightStyle}>
          <div style={headerDateTimeStyle}>
            <CalendarOutlined
              style={{ marginRight: 8, color: colors.richGold }}
            />
            {formatDate(currentTime)}
          </div>
          <button style={headerIconButtonStyle}>
            <BellOutlined style={headerIconStyle} />
            {isRegistered && <span style={notificationBadgeStyle}>3</span>}
          </button>
          <button style={headerIconButtonStyle}>
            <SettingOutlined style={headerIconStyle} />
          </button>
          <div style={userMenuStyle}>
            <div style={userAvatarSmallStyle}>
              {applicant.user.first_name[0]}
              {applicant.user.last_name[0]}
            </div>
            <div style={userInfoSmallStyle}>
              <div style={userNameSmallStyle}>
                {applicant.user.first_name} {applicant.user.last_name}
              </div>
              <div style={userRoleSmallStyle}>
                {isRegistered ? "Volunteer Applicant" : "Guest User"}
              </div>
            </div>
            <button
              style={logoutButtonStyle}
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={mainContentAreaStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <button style={backNavButtonStyle} onClick={() => navigate("/")}>
            <ArrowLeftOutlined
              style={{ fontSize: 20, color: colors.deepBlue }}
            />
          </button>
          <div>
            <h1 style={headerTitleStyle}>
              {isRegistered
                ? "My Application"
                : "Welcome to MoFA Volunteer Portal"}
            </h1>
            <p style={headerSubtitleStyle}>
              {isRegistered
                ? "Track your volunteer application status"
                : "Complete your profile to apply"}
            </p>
          </div>
          <div style={headerSpacerStyle}></div>
        </div>

        {/* Main Container */}
        <div style={containerStyle}>
          {/* Application Number Banner - Only show if registered */}
          {isRegistered && (
            <div style={applicationBannerStyle}>
              <IdcardOutlined
                style={{
                  fontSize: 24,
                  color: colors.richGold,
                  marginRight: 12,
                }}
              />
              <span style={applicationNumberStyle}>
                Application #: {applicant.application_number}
              </span>
              <div style={statusBadgeStyle}>
                <StatusIcon style={{ marginRight: 6 }} />
                {getStatusConfig(applicant.status).label}
              </div>
            </div>
          )}

          {/* Profile Header */}
          <div style={profileHeaderStyle}>
            <div style={avatarContainerStyle}>
              <div style={avatarStyle}>
                {applicant.user.first_name[0]}
                {applicant.user.last_name[0]}
              </div>
            </div>
            <div style={profileInfoStyle}>
              <h2 style={profileNameStyle}>
                {applicant.user.first_name} {applicant.user.middle_name}{" "}
                {applicant.user.last_name}
              </h2>
              <p style={profileEmailStyle}>
                <MailOutlined
                  style={{ marginRight: 8, color: colors.richGold }}
                />
                {applicant.user.email}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div style={tabContainerStyle}>
            <button
              style={{
                ...tabStyle,
                ...(activeTab === "overview" ? activeTabStyle : {}),
              }}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              style={{
                ...tabStyle,
                ...(activeTab === "documents" ? activeTabStyle : {}),
              }}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              style={{
                ...tabStyle,
                ...(activeTab === "interview" ? activeTabStyle : {}),
              }}
              onClick={() => setActiveTab("interview")}
            >
              Interview
            </button>
            {!isRegistered && (
              <button
                style={{
                  ...tabStyle,
                  ...(activeTab === "profile" ? activeTabStyle : {}),
                }}
                onClick={() => setActiveTab("profile")}
              >
                <EditOutlined /> Profile
              </button>
            )}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div style={tabContentStyle}>
              {isRegistered ? (
                <>
                  {/* Application Timeline */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <ClockCircleOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Application Timeline
                    </h3>
                    <div style={timelineStyle}>
                      {applicant.stages.map((stage, index) => (
                        <div key={index} style={timelineItemStyle}>
                          <div style={timelineIconStyle}>
                            <div
                              style={{
                                ...timelineDotStyle,
                                backgroundColor:
                                  stage.status === "completed"
                                    ? colors.successGreen
                                    : stage.status === "current"
                                      ? colors.richGold
                                      : colors.softGray,
                              }}
                            ></div>
                            {index < applicant.stages.length - 1 && (
                              <div style={timelineLineStyle}></div>
                            )}
                          </div>
                          <div style={timelineContentStyle}>
                            <div style={timelineHeaderStyle}>
                              <span style={timelineTitleStyle}>
                                {stage.name}
                              </span>
                              <span style={timelineDateStyle}>
                                {stage.date}
                              </span>
                            </div>
                            <span style={timelineStatusStyle}>
                              {stage.status === "completed" && "✓ Completed"}
                              {stage.status === "current" && "● In Progress"}
                              {stage.status === "pending" && "○ Pending"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <UserOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Personal Information
                    </h3>
                    <div style={infoGridStyle}>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <UserOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Full Name
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.user.first_name}{" "}
                          {applicant.user.middle_name}{" "}
                          {applicant.user.last_name}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <MailOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Email
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.user.email}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <PhoneOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Phone
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.phone_number}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          {applicant.gender === "female" ? (
                            <WomanOutlined
                              style={{ marginRight: 6, color: colors.richGold }}
                            />
                          ) : (
                            <ManOutlined
                              style={{ marginRight: 6, color: colors.richGold }}
                            />
                          )}
                          Gender
                        </span>
                        <span style={infoValueStyle}>{applicant.gender}</span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <CalendarOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Date of Birth
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.date_of_birth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <BookOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Academic Information
                    </h3>
                    <div style={infoGridStyle}>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <BankOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          University
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.university}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <BookOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Department
                        </span>
                        <span style={infoValueStyle}>
                          {applicant.department}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <StarOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          Year of Study
                        </span>
                        <span style={infoValueStyle}>
                          Year {applicant.year_of_study}
                        </span>
                      </div>
                      <div style={infoItemStyle}>
                        <span style={infoLabelStyle}>
                          <StarOutlined
                            style={{ marginRight: 6, color: colors.richGold }}
                          />
                          GPA
                        </span>
                        <span style={infoValueStyle}>{applicant.gpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <GlobalOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Languages
                    </h3>
                    <div style={languageContainerStyle}>
                      <div style={languageBadgeStyle}>
                        <strong>Primary:</strong> {applicant.primary_language}
                      </div>
                      {applicant.additional_languages.map((lang, index) => (
                        <div key={index} style={languageBadgeStyle}>
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Motivation Statement */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <FileTextOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Motivation Statement
                    </h3>
                    <p style={motivationStyle}>
                      {applicant.motivation_statement}
                    </p>
                  </div>
                </>
              ) : (
                <div style={welcomeCardStyle}>
                  <StarOutlined style={welcomeIconStyle} />
                  <h2 style={welcomeTitleStyle}>
                    Welcome to MoFA Volunteer Program!
                  </h2>
                  <p style={welcomeTextStyle}>
                    Complete your profile and upload required documents to start
                    your journey with the Ministry of Foreign Affairs.
                  </p>
                  <button
                    style={getStartedButtonStyle}
                    onClick={() => setActiveTab("profile")}
                  >
                    Get Started{" "}
                    <ArrowLeftOutlined
                      style={{ transform: "rotate(180deg)" }}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div style={tabContentStyle}>
              <div style={sectionCardStyle}>
                <div style={sectionHeaderWithButtonStyle}>
                  <h3 style={sectionTitleStyle}>
                    <FileTextOutlined
                      style={{ marginRight: 8, color: colors.richGold }}
                    />
                    {isRegistered ? "Verified Documents" : "My Documents"}
                  </h3>
                  {!isRegistered && (
                    <button
                      style={uploadButtonStyle}
                      onClick={() => {
                        setUploadModal(true);
                        setUploadData({ type: "", name: "", file: null });
                      }}
                    >
                      <PlusOutlined /> Upload Document
                    </button>
                  )}
                </div>

                {applicant.documents.length === 0 ? (
                  <div style={emptyDocumentsStyle}>
                    <FileTextOutlined style={emptyIconStyle} />
                    <h4 style={emptyTitleStyle}>No Documents Uploaded</h4>
                    <p style={emptyTextStyle}>
                      {isRegistered
                        ? "Your documents are being processed."
                        : "Upload your documents to complete your application."}
                    </p>
                    {!isRegistered && (
                      <button
                        style={uploadEmptyButtonStyle}
                        onClick={() => {
                          setUploadModal(true);
                          setUploadData({ type: "", name: "", file: null });
                        }}
                      >
                        <UploadOutlined /> Upload Now
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={documentsGridStyle}>
                    {applicant.documents.map((doc: any, index) => (
                      <div key={index} style={documentCardStyle}>
                        <div style={documentCardHeaderStyle}>
                          <FileTextOutlined style={documentCardIconStyle} />
                          <div style={documentCardInfoStyle}>
                            <h4 style={documentCardTitleStyle}>{doc.name}</h4>
                            <p style={documentCardMetaStyle}>
                              Uploaded: {doc.uploaded_at || doc.verified_at}
                            </p>
                          </div>
                          {doc.is_verified && (
                            <span style={verifiedBadgeStyle}>
                              <CheckCircleOutlined /> Verified
                            </span>
                          )}
                        </div>
                        <div style={documentCardActionsStyle}>
                          {isRegistered ? (
                            <>
                              <button
                                style={actionButtonStyle}
                                onClick={() => handlePreview(doc)}
                                title="Preview"
                              >
                                <EyeOutlined />
                              </button>
                              <button
                                style={actionButtonStyle}
                                onClick={() =>
                                  handleDownload(doc.file_url, doc.name)
                                }
                                title="Download"
                              >
                                <DownloadOutlined />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                style={actionButtonStyle}
                                onClick={() => handlePreview(doc)}
                                title="Preview"
                              >
                                <EyeOutlined />
                              </button>
                              <button
                                style={actionButtonStyle}
                                onClick={() =>
                                  handleDownload(doc.file_url, doc.name)
                                }
                                title="Download"
                              >
                                <DownloadOutlined />
                              </button>
                              <button
                                style={deleteButtonStyle}
                                onClick={() => handleDeleteDocument(doc.id)}
                                title="Delete"
                              >
                                <DeleteOutlined />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interview Tab */}
          {activeTab === "interview" && (
            <div style={tabContentStyle}>
              {isRegistered && applicant.status === "interview_scheduled" ? (
                <>
                  {/* Interview Details */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <CalendarOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Interview Details
                    </h3>
                    <div style={interviewDetailsStyle}>
                      <div style={interviewDetailItemStyle}>
                        <span style={interviewDetailLabelStyle}>Date:</span>
                        <span style={interviewDetailValueStyle}>
                          {applicant.interview.date}
                        </span>
                      </div>
                      <div style={interviewDetailItemStyle}>
                        <span style={interviewDetailLabelStyle}>Time:</span>
                        <span style={interviewDetailValueStyle}>
                          {applicant.interview.time}
                        </span>
                      </div>
                      <div style={interviewDetailItemStyle}>
                        <span style={interviewDetailLabelStyle}>Duration:</span>
                        <span style={interviewDetailValueStyle}>
                          {applicant.interview.duration}
                        </span>
                      </div>
                      <div style={interviewDetailItemStyle}>
                        <span style={interviewDetailLabelStyle}>Location:</span>
                        <span style={interviewDetailValueStyle}>
                          {applicant.interview.location}
                        </span>
                      </div>
                      <div style={interviewDetailItemStyle}>
                        <span style={interviewDetailLabelStyle}>Format:</span>
                        <span style={interviewDetailValueStyle}>
                          {applicant.interview.format}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What to Bring */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <FileTextOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      What to Bring
                    </h3>
                    <ul style={listStyle}>
                      {applicant.interview.what_to_bring.map((item, index) => (
                        <li key={index} style={listItemStyle}>
                          <CheckCircleOutlined
                            style={{
                              color: colors.richGold,
                              marginRight: 12,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preparation Tips */}
                  <div style={sectionCardStyle}>
                    <h3 style={sectionTitleStyle}>
                      <StarOutlined
                        style={{ marginRight: 8, color: colors.richGold }}
                      />
                      Preparation Tips
                    </h3>
                    <ul style={listStyle}>
                      {applicant.interview.preparation_tips.map(
                        (tip, index) => (
                          <li key={index} style={listItemStyle}>
                            <CheckCircleOutlined
                              style={{
                                color: colors.richGold,
                                marginRight: 12,
                              }}
                            />
                            {tip}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <div style={emptyStateStyle}>
                  <CalendarOutlined
                    style={{
                      fontSize: 48,
                      color: colors.mediumGray,
                      marginBottom: 16,
                    }}
                  />
                  <h3 style={emptyStateTitleStyle}>No Interview Scheduled</h3>
                  <p style={emptyStateTextStyle}>
                    {isRegistered
                      ? "Your application is currently under review. You'll be notified when an interview is scheduled."
                      : "Complete your profile and submit your application to be considered for interviews."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab (for unregistered users) */}
          {activeTab === "profile" && !isRegistered && (
            <div style={tabContentStyle}>
              <div style={sectionCardStyle}>
                <div style={sectionHeaderWithButtonStyle}>
                  <h3 style={sectionTitleStyle}>
                    <UserOutlined
                      style={{ marginRight: 8, color: colors.richGold }}
                    />
                    Complete Your Profile
                  </h3>
                  {!isEditing ? (
                    <button
                      style={editButtonStyle}
                      onClick={() => setIsEditing(true)}
                    >
                      <EditOutlined /> Edit Profile
                    </button>
                  ) : (
                    <button style={saveButtonStyle} onClick={handleSaveProfile}>
                      <SaveOutlined /> Save Profile
                    </button>
                  )}
                </div>

                <div style={profileFormStyle}>
                  <div style={formRowStyle}>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>University *</label>
                      <input
                        type="text"
                        name="university"
                        style={inputStyle}
                        value={formData.university}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your university"
                      />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>Department *</label>
                      <input
                        type="text"
                        name="department"
                        style={inputStyle}
                        value={formData.department}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your department"
                      />
                    </div>
                  </div>

                  <div style={formRowStyle}>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>Year of Study</label>
                      <select
                        name="year_of_study"
                        style={selectStyle}
                        value={formData.year_of_study}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      >
                        <option value="">Select year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                        <option value="5">Year 5+</option>
                      </select>
                    </div>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>GPA</label>
                      <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        style={inputStyle}
                        value={formData.gpa}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., 3.75"
                      />
                    </div>
                  </div>

                  <div style={formRowStyle}>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone_number"
                        style={inputStyle}
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="+251 912 345 678"
                      />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={formLabelStyle}>Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        style={inputStyle}
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div style={formGroupStyle}>
                    <label style={formLabelStyle}>Motivation Statement *</label>
                    <textarea
                      name="motivation_statement"
                      style={textareaStyle}
                      rows={5}
                      value={formData.motivation_statement}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Tell us why you want to volunteer with the Ministry of Foreign Affairs..."
                    />
                  </div>

                  <div style={formGroupStyle}>
                    <label style={formLabelStyle}>Additional Languages</label>
                    <input
                      type="text"
                      style={inputStyle}
                      value={formData.additional_languages
                        .filter((l) => l !== "English")
                        .join(", ")}
                      onChange={(e) => {
                        const langs = e.target.value
                          .split(",")
                          .map((l) => l.trim())
                          .filter((l) => l);
                        setFormData({
                          ...formData,
                          additional_languages: ["English", ...langs],
                        });
                      }}
                      disabled={!isEditing}
                      placeholder="French, Arabic, etc. (comma separated)"
                    />
                  </div>

                  {!isEditing && (
                    <div style={formMessageStyle}>
                      <CheckCircleOutlined
                        style={{ color: colors.richGold, marginRight: 8 }}
                      />
                      Click "Edit Profile" to update your information
                    </div>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div style={sectionCardStyle}>
                <div style={sectionHeaderWithButtonStyle}>
                  <h3 style={sectionTitleStyle}>
                    <FileTextOutlined
                      style={{ marginRight: 8, color: colors.richGold }}
                    />
                    Required Documents
                  </h3>
                  <button
                    style={uploadButtonStyle}
                    onClick={() => {
                      setUploadModal(true);
                      setUploadData({ type: "", name: "", file: null });
                    }}
                  >
                    <PlusOutlined /> Add Document
                  </button>
                </div>

                <div style={requiredDocsListStyle}>
                  <div style={requiredDocItemStyle}>
                    <CheckCircleOutlined
                      style={{
                        color: applicant.documents.some((d) => d.type === "id")
                          ? colors.successGreen
                          : colors.mediumGray,
                      }}
                    />
                    <span>National ID / Passport</span>
                    {applicant.documents.some((d) => d.type === "id") && (
                      <span style={docUploadedStyle}>Uploaded</span>
                    )}
                  </div>
                  <div style={requiredDocItemStyle}>
                    <CheckCircleOutlined
                      style={{
                        color: applicant.documents.some(
                          (d) => d.type === "transcript",
                        )
                          ? colors.successGreen
                          : colors.mediumGray,
                      }}
                    />
                    <span>Academic Transcript</span>
                    {applicant.documents.some(
                      (d) => d.type === "transcript",
                    ) && <span style={docUploadedStyle}>Uploaded</span>}
                  </div>
                  <div style={requiredDocItemStyle}>
                    <CheckCircleOutlined
                      style={{
                        color: applicant.documents.some(
                          (d) => d.type === "recommendation",
                        )
                          ? colors.successGreen
                          : colors.mediumGray,
                      }}
                    />
                    <span>Recommendation Letter</span>
                    {applicant.documents.some(
                      (d) => d.type === "recommendation",
                    ) && <span style={docUploadedStyle}>Uploaded</span>}
                  </div>
                  <div style={requiredDocItemStyle}>
                    <CheckCircleOutlined
                      style={{
                        color: applicant.documents.some(
                          (d) => d.type === "photo",
                        )
                          ? colors.successGreen
                          : colors.mediumGray,
                      }}
                    />
                    <span>Passport Photo</span>
                    {applicant.documents.some((d) => d.type === "photo") && (
                      <span style={docUploadedStyle}>Uploaded</span>
                    )}
                  </div>
                </div>

                {applicant.documents.length > 0 && (
                  <>
                    <h4 style={uploadedDocsTitleStyle}>Uploaded Documents</h4>
                    <div style={documentsGridStyle}>
                      {applicant.documents.map((doc: any, index) => (
                        <div key={index} style={documentCardStyle}>
                          <div style={documentCardHeaderStyle}>
                            <FileTextOutlined style={documentCardIconStyle} />
                            <div style={documentCardInfoStyle}>
                              <h4 style={documentCardTitleStyle}>{doc.name}</h4>
                              <p style={documentCardMetaStyle}>
                                {doc.is_verified
                                  ? "Verified"
                                  : "Pending Verification"}
                              </p>
                            </div>
                          </div>
                          <div style={documentCardActionsStyle}>
                            <button
                              style={actionButtonStyle}
                              onClick={() => handlePreview(doc)}
                              title="Preview"
                            >
                              <EyeOutlined />
                            </button>
                            <button
                              style={actionButtonStyle}
                              onClick={() =>
                                handleDownload(doc.file_url, doc.name)
                              }
                              title="Download"
                            >
                              <DownloadOutlined />
                            </button>
                            <button
                              style={deleteButtonStyle}
                              onClick={() => handleDeleteDocument(doc.id)}
                              title="Delete"
                            >
                              <DeleteOutlined />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {isEditing && (
                  <div style={submitSectionStyle}>
                    <button
                      style={submitApplicationButtonStyle}
                      onClick={() => {
                        if (
                          !formData.university ||
                          !formData.department ||
                          !formData.phone_number ||
                          !formData.motivation_statement
                        ) {
                          alert("Please fill in all required fields");
                          return;
                        }
                        if (applicant.documents.length < 3) {
                          alert("Please upload at least 3 required documents");
                          return;
                        }
                        alert(
                          "✅ Application submitted successfully! You will be notified of the next steps.",
                        );
                        setIsEditing(false);
                      }}
                    >
                      Submit Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
