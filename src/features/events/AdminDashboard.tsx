import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
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
  TrophyOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  StarOutlined,
  GlobalOutlined,
  WomanOutlined,
  ManOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  TeamOutlined,
  DashboardOutlined,
  PrinterOutlined,
  FilePdfOutlined,
  CopyOutlined,
  FilterOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";

// Mock volunteer data
const mockVolunteers = [
  {
    id: "VOL-2024-001",
    application_number: "APP-2024-001234",
    user: {
      first_name: "Miki",
      middle_name: "Terefe",
      last_name: "Shimeles",
      email: "miki@example.com",
      phone: "+251 912 345 678",
      gender: "male",
      date_of_birth: "2001-08-22",
    },
    university: "Addis Ababa University",
    department: "International Relations and Diplomacy",
    year_of_study: 4,
    gpa: 3.85,
    primary_language: "Amharic",
    additional_languages: ["English", "French", "Arabic"],
    motivation_statement: "I am deeply passionate about diplomacy...",
    current_stage: "Interview Scheduled",
    status: "interview_scheduled",
    submitted_at: "2024-02-10T09:30:00Z",
    documents: [
      {
        id: "doc1",
        type: "id",
        name: "National ID - Front",
        file_url: "/docs/id-front.jpg",
        file_type: "image",
        is_verified: true,
      },
      {
        id: "doc2",
        type: "id_back",
        name: "National ID - Back",
        file_url: "/docs/id-back.jpg",
        file_type: "image",
        is_verified: true,
      },
    ],
  },
  {
    id: "VOL-2024-002",
    application_number: "APP-2024-001235",
    user: {
      first_name: "Mela",
      middle_name: "Bekele",
      last_name: "Tadesse",
      email: "mela@example.com",
      phone: "+251 923 456 789",
      gender: "female",
      date_of_birth: "2002-03-15",
    },
    university: "Addis Ababa University",
    department: "Political Science",
    year_of_study: 3,
    gpa: 3.92,
    primary_language: "Amharic",
    additional_languages: ["English", "Oromo"],
    motivation_statement:
      "I want to contribute to Ethiopia's diplomatic efforts...",
    current_stage: "Document Verification",
    status: "document_verification",
    submitted_at: "2024-02-12T14:20:00Z",
    documents: [
      {
        id: "doc3",
        type: "id",
        name: "National ID - Front",
        file_url: "/docs/id-front2.jpg",
        file_type: "image",
        is_verified: false,
      },
      {
        id: "doc4",
        type: "id_back",
        name: "National ID - Back",
        file_url: "/docs/id-back2.jpg",
        file_type: "image",
        is_verified: false,
      },
    ],
  },
  {
    id: "VOL-2024-003",
    application_number: "APP-2024-001236",
    user: {
      first_name: "Abeba",
      middle_name: "Kebede",
      last_name: "Mekonnen",
      email: "abeba@example.com",
      phone: "+251 934 567 890",
      gender: "male",
      date_of_birth: "2000-11-30",
    },
    university: "Jimma University",
    department: "Law",
    year_of_study: 5,
    gpa: 3.78,
    primary_language: "Amharic",
    additional_languages: ["English", "Amharic"],
    motivation_statement: "I want to learn about international law...",
    current_stage: "Application Submitted",
    status: "submitted",
    submitted_at: "2024-02-15T09:45:00Z",
    documents: [
      {
        id: "doc5",
        type: "id",
        name: "National ID - Front",
        file_url: "/docs/id-front3.jpg",
        file_type: "image",
        is_verified: false,
      },
      {
        id: "doc6",
        type: "id_back",
        name: "National ID - Back",
        file_url: "/docs/id-back3.jpg",
        file_type: "image",
        is_verified: false,
      },
    ],
  },
];

// ID Card Template Component with the exact design
const IDCardTemplate = ({
  volunteer,
  side = "front",
}: {
  volunteer: any;
  side: "front" | "back";
}) => {
  const getFullName = () => {
    return `${volunteer.user.first_name} ${volunteer.user.middle_name} ${volunteer.user.last_name}`;
  };

  const getFullNameAmharic = () => {
    const amharicNames: { [key: string]: string } = {
      "Miki Shimeles": "ሚኪ ተረፈ ሽመልስ",
      "Mela Tadesse": "መላ በቀለ ታደሰ",
      "Abeba Mekonnen": "አበበ ከበደ መኮንን",
    };
    const fullName = `${volunteer.user.first_name} ${volunteer.user.last_name}`;
    return amharicNames[fullName] || fullName;
  };

  const getPhotoPath = () => {
    // Fix the path - remove /public/ and ensure correct path
    const photoMap: { [key: string]: string } = {
      "Miki Shimeles": "/Miki_Shimeles.png",
      "Mela Tadesse": "/Mela_Tadesse.png",
      "Abeba Mekonnen": "/Abeba_Mekonnen.png",
    };
    const fullName = `${volunteer.user.first_name} ${volunteer.user.last_name}`;
    return photoMap[fullName] || "";
  };

  const [imageError, setImageError] = useState(false);
  const [headerImageError, setHeaderImageError] = useState(false);

  if (side === "front") {
    return (
      <div style={idCardFrontStyle}>
        {/* Header Image */}
        <div style={idCardHeaderContainerStyle}>
          {!headerImageError ? (
            <img
              src="images/mofa-idheader.jpg"
              alt="MOFA Header"
              style={idCardHeaderImageStyle}
              crossOrigin="anonymous"
              onError={() => setHeaderImageError(true)}
            />
          ) : (
            <div style={idCardHeaderFallbackStyle}>
              <span style={idCardHeaderFallbackText}>
                Ministry of Foreign Affairs
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={idCardFrontContentStyle}>
          {/* Photo */}
          <div style={idCardPhotoWrapperStyle}>
            {!imageError && getPhotoPath() ? (
              <img
                src={getPhotoPath()}
                alt={getFullName()}
                style={idCardPhotoStyle}
                crossOrigin="anonymous"
                onError={() => setImageError(true)}
              />
            ) : (
              <div style={idCardPhotoFallbackStyle}>
                {volunteer.user.first_name[0]}
                {volunteer.user.last_name[0]}
              </div>
            )}
          </div>

          {/* Name and Info */}
          <div style={idCardNameSectionStyle}>
            <p style={idCardNameStyle}>{getFullName()}</p>
            <p style={idCardNameAmharicStyle}>{getFullNameAmharic()}</p>
            <p style={idCardRoleStyle}>Volunteer</p>
          </div>
        </div>

        {/* Footer - Red with White Text - with Amharic */}
        <div style={idCardFrontFooterStyle}>
          <div style={idCardFooterTextStyle}>TEMPORARY ID</div>
          <div style={idCardFooterAmharicStyle}>ጊዜያዊ መታወቂያ</div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={idCardBackStyle}>
        {/* Header Image */}
        <div style={idCardHeaderContainerStyle}>
          {!headerImageError ? (
            <img
              src="images/mofa-idheader.jpg"
              alt="MOFA Header"
              style={idCardHeaderImageStyle}
              crossOrigin="anonymous"
              onError={() => setHeaderImageError(true)}
            />
          ) : (
            <div style={idCardHeaderFallbackStyle}>
              <span style={idCardHeaderFallbackText}>
                Ministry of Foreign Affairs
              </span>
            </div>
          )}
        </div>

        {/* Back Content - Only text */}
        <div style={idCardBackContentStyle}>
          <div style={idCardBackTextContentStyle}>
            {/* Validity Dates in Amharic and English */}
            <div style={idCardValidityStyle}>
              <div style={idCardAmharicValidityStyle}>
                <p style={idCardAmharicTextStyle}>
                  ይህ መታወቂያ የሚያገለግለው 20/5/2018
                </p>
                <p style={idCardAmharicTextStyle}>አስከ 19/11/2018</p>
              </div>
              <div style={idCardEnglishValidityStyle}>
                <p style={idCardEnglishTextStyle}>
                  This ID Card is Valid Until
                </p>
                <p style={idCardEnglishTextStyle}>Nov 28/01/2026, 27/07/2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Red with White Text */}
        <div style={idCardFrontFooterStyle}>
          <div style={idCardFooterTextStyle}>TEMPORARY ID</div>
          <div style={idCardFooterAmharicStyle}>ጊዜያዊ መታወቂያ</div>
        </div>
      </div>
    );
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [filteredVolunteers, setFilteredVolunteers] = useState(mockVolunteers);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [showIdPreview, setShowIdPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bulkGenerate, setBulkGenerate] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const [idSide, setIdSide] = useState<"front" | "back">("front");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");

    if (userRole !== "admin" || !username) {
      navigate("/login");
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    let filtered = volunteers;

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.application_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          v.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((v) => v.status === statusFilter);
    }

    setFilteredVolunteers(filtered);
  }, [searchTerm, statusFilter, volunteers]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleCertificateClick = () => {
    alert("Certificate Generation feature coming soon!");
  };

  const handleViewVolunteer = (volunteer: any) => {
    setSelectedVolunteer(volunteer);
    setIdSide("front");
  };

  const closePreview = () => {
    setSelectedVolunteer(null);
    setIdSide("front");
  };

  const handleGeneratePDF = async (volunteer: any, side: "front" | "back") => {
    try {
      // Create PDF with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Card dimensions - increased height to prevent compression
      const cardWidth = 86; // ID card width in mm
      const cardHeight = 74; // Increased from 64mm to 74mm for better proportions

      // Calculate positions for side by side cards on A4
      const pageWidth = 210; // A4 width
      const totalWidth = cardWidth * 2 + 15; // Two cards plus gap
      const startX = (pageWidth - totalWidth) / 2; // Center both cards horizontally

      // Center vertically on page
      const centerY = (297 - cardHeight) / 2;

      // Create temporary divs for rendering
      const { createRoot } = await import("react-dom/client");

      // Helper function to wait for images to load
      const waitForImages = (element: HTMLElement): Promise<void> => {
        const images = Array.from(element.getElementsByTagName("img"));
        const promises = images.map((img) => {
          if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = () => resolve(null);
            img.onerror = () => {
              console.warn("Image failed to load:", img.src);
              resolve(null); // Don't reject, just continue with fallback
            };
          });
        });
        return Promise.all(promises).then(() => {});
      };

      // Render front side
      const frontDiv = document.createElement("div");
      frontDiv.style.position = "absolute";
      frontDiv.style.left = "-9999px";
      frontDiv.style.top = "-9999px";
      frontDiv.style.width = "350px";
      frontDiv.style.height = "500px";
      frontDiv.style.backgroundColor = "#ffffff";
      frontDiv.style.overflow = "hidden";
      document.body.appendChild(frontDiv);

      const frontRoot = createRoot(frontDiv);
      frontRoot.render(<IDCardTemplate volunteer={volunteer} side="front" />);

      // Wait for images to load
      await waitForImages(frontDiv);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Additional delay for rendering

      const frontCanvas = await html2canvas(frontDiv, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        useCORS: true,
        windowWidth: 350,
        windowHeight: 500,
        onclone: (clonedDoc) => {
          // Ensure images in cloned document are handled
          const clonedImages = clonedDoc.getElementsByTagName("img");
          Array.from(clonedImages).forEach((img) => {
            if (img.src) {
              img.crossOrigin = "anonymous";
            }
          });
        },
      });

      const frontImgData = frontCanvas.toDataURL("image/png");
      frontRoot.unmount();
      document.body.removeChild(frontDiv);

      // Render back side
      const backDiv = document.createElement("div");
      backDiv.style.position = "absolute";
      backDiv.style.left = "-9999px";
      backDiv.style.top = "-9999px";
      backDiv.style.width = "350px";
      backDiv.style.height = "500px";
      backDiv.style.backgroundColor = "#ffffff";
      backDiv.style.overflow = "hidden";
      document.body.appendChild(backDiv);

      const backRoot = createRoot(backDiv);
      backRoot.render(<IDCardTemplate volunteer={volunteer} side="back" />);

      // Wait for images to load
      await waitForImages(backDiv);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const backCanvas = await html2canvas(backDiv, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        useCORS: true,
        windowWidth: 350,
        windowHeight: 500,
        onclone: (clonedDoc) => {
          const clonedImages = clonedDoc.getElementsByTagName("img");
          Array.from(clonedImages).forEach((img) => {
            if (img.src) {
              img.crossOrigin = "anonymous";
            }
          });
        },
      });

      const backImgData = backCanvas.toDataURL("image/png");
      backRoot.unmount();
      document.body.removeChild(backDiv);

      // Add front card to PDF (left side)
      pdf.addImage(
        frontImgData,
        "PNG",
        startX,
        centerY,
        cardWidth,
        cardHeight,
        undefined,
        "FAST",
      );

      // Add back card to PDF (right side)
      pdf.addImage(
        backImgData,
        "PNG",
        startX + cardWidth + 15,
        centerY,
        cardWidth,
        cardHeight,
        undefined,
        "FAST",
      );

      pdf.save(`${volunteer.id}_both_sides.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleBulkGenerate = async () => {
    if (selectedVolunteers.length === 0) {
      alert("Please select at least one volunteer");
      return;
    }

    try {
      const selected = volunteers.filter((v) =>
        selectedVolunteers.includes(v.id),
      );

      // Generate PDF with 2 pairs of cards per page
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const cardWidth = 86; // ID card width
      const cardHeight = 74; // Increased for better proportions
      const leftMargin = 12;
      const topMargin = 25;
      const verticalSpacing = 30;
      const gapBetweenCards = 15;

      let cardsProcessed = 0;

      // Create a temporary container for rendering
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.display = "flex";
      tempContainer.style.flexDirection = "column";
      tempContainer.style.gap = "20px";
      tempContainer.style.backgroundColor = "#ffffff";
      document.body.appendChild(tempContainer);

      const { createRoot } = await import("react-dom/client");

      // Helper function to wait for images
      const waitForImages = (element: HTMLElement): Promise<void> => {
        const images = Array.from(element.getElementsByTagName("img"));
        const promises = images.map((img) => {
          if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = () => resolve(null);
            img.onerror = () => {
              console.warn("Image failed to load:", img.src);
              resolve(null);
            };
          });
        });
        return Promise.all(promises).then(() => {});
      };

      for (const volunteer of selected) {
        // Add new page if needed (2 rows per page)
        if (cardsProcessed > 0 && cardsProcessed % 2 === 0) {
          pdf.addPage();
        }

        const rowOnPage = cardsProcessed % 2;
        const yOffset = topMargin + rowOnPage * (cardHeight + verticalSpacing);

        // Front side (left)
        const frontX = leftMargin;

        // Render front side
        const frontDiv = document.createElement("div");
        frontDiv.style.width = "350px";
        frontDiv.style.height = "500px";
        frontDiv.style.backgroundColor = "#ffffff";
        frontDiv.style.overflow = "hidden";
        tempContainer.appendChild(frontDiv);

        const frontRoot = createRoot(frontDiv);
        frontRoot.render(<IDCardTemplate volunteer={volunteer} side="front" />);

        await waitForImages(frontDiv);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const frontCanvas = await html2canvas(frontDiv, {
          scale: 2.5,
          backgroundColor: "#ffffff",
          logging: false,
          allowTaint: true,
          useCORS: true,
          windowWidth: 350,
          windowHeight: 500,
          onclone: (clonedDoc) => {
            const clonedImages = clonedDoc.getElementsByTagName("img");
            Array.from(clonedImages).forEach((img) => {
              if (img.src) {
                img.crossOrigin = "anonymous";
              }
            });
          },
        });

        const frontImgData = frontCanvas.toDataURL("image/png");
        pdf.addImage(
          frontImgData,
          "PNG",
          frontX,
          yOffset,
          cardWidth,
          cardHeight,
          undefined,
          "FAST",
        );

        frontRoot.unmount();
        tempContainer.removeChild(frontDiv);

        // Render back side
        const backX = leftMargin + cardWidth + gapBetweenCards;

        const backDiv = document.createElement("div");
        backDiv.style.width = "350px";
        backDiv.style.height = "500px";
        backDiv.style.backgroundColor = "#ffffff";
        backDiv.style.overflow = "hidden";
        tempContainer.appendChild(backDiv);

        const backRoot = createRoot(backDiv);
        backRoot.render(<IDCardTemplate volunteer={volunteer} side="back" />);

        await waitForImages(backDiv);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const backCanvas = await html2canvas(backDiv, {
          scale: 2.5,
          backgroundColor: "#ffffff",
          logging: false,
          allowTaint: true,
          useCORS: true,
          windowWidth: 350,
          windowHeight: 500,
          onclone: (clonedDoc) => {
            const clonedImages = clonedDoc.getElementsByTagName("img");
            Array.from(clonedImages).forEach((img) => {
              if (img.src) {
                img.crossOrigin = "anonymous";
              }
            });
          },
        });

        const backImgData = backCanvas.toDataURL("image/png");
        pdf.addImage(
          backImgData,
          "PNG",
          backX,
          yOffset,
          cardWidth,
          cardHeight,
          undefined,
          "FAST",
        );

        backRoot.unmount();
        tempContainer.removeChild(backDiv);

        cardsProcessed++;
      }

      // Clean up
      document.body.removeChild(tempContainer);

      pdf.save("volunteer_id_cards.pdf");
      setBulkGenerate(false);
      setSelectedVolunteers([]);
    } catch (error) {
      console.error("Error generating bulk PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const toggleVolunteerSelection = (id: string) => {
    setSelectedVolunteers((prev) =>
      prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedVolunteers.length === filteredVolunteers.length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(filteredVolunteers.map((v) => v.id));
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      submitted: "#9CA3AF",
      document_verification: "#F5D742",
      interview_scheduled: "#0A1A3A",
      selected: "#10B981",
      rejected: "#EF4444",
    };
    return colors[status as keyof typeof colors] || colors.submitted;
  };

  return (
    <div style={pageStyle}>
      <div style={backgroundPatternStyle}></div>

      {selectedVolunteer && (
        <div style={modalOverlayStyle} onClick={closePreview}>
          <div style={idPreviewModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                <IdcardOutlined
                  style={{ marginRight: 8, color: colors.richGold }}
                />
                Volunteer ID Card - {selectedVolunteer.user.first_name}{" "}
                {selectedVolunteer.user.last_name}
              </h3>
              <div style={modalHeaderActionsStyle}>
                <button
                  style={sideToggleButtonStyle}
                  onClick={() =>
                    setIdSide(idSide === "front" ? "back" : "front")
                  }
                >
                  <ReloadOutlined /> Flip to{" "}
                  {idSide === "front" ? "Back" : "Front"}
                </button>
                <button style={modalCloseStyle} onClick={closePreview}>
                  ×
                </button>
              </div>
            </div>

            <div style={idPreviewContainerStyle}>
              <IDCardTemplate volunteer={selectedVolunteer} side={idSide} />
            </div>

            <div style={modalFooterStyle}>
              <button
                style={downloadButtonStyle}
                onClick={() => handleGeneratePDF(selectedVolunteer, idSide)}
              >
                <FilePdfOutlined /> Download{" "}
                {idSide === "front" ? "Front" : "Back"}
              </button>
              <button style={modalCloseBtnStyle} onClick={closePreview}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {bulkGenerate && (
        <div style={modalOverlayStyle} onClick={() => setBulkGenerate(false)}>
          <div style={bulkModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                <PrinterOutlined
                  style={{ marginRight: 8, color: colors.richGold }}
                />
                Generate ID Cards in Bulk
              </h3>
              <button
                style={modalCloseStyle}
                onClick={() => setBulkGenerate(false)}
              >
                ×
              </button>
            </div>

            <div style={modalBodyStyle}>
              <p style={bulkInfoStyle}>
                Selected {selectedVolunteers.length} volunteers. Cards will be
                generated 2 per page (front and back side by side, 2 rows per
                page = 4 cards total).
              </p>

              <div style={bulkPreviewStyle}>
                <div style={bulkCardPreviewStyle}>
                  <div style={bulkCardFrontStyle}>Front</div>
                  <div style={bulkCardBackStyle}>Back</div>
                </div>
                <p style={bulkCardLabelStyle}>
                  Sample Layout - 2 cards per page (4 cards total - 2 front, 2
                  back)
                </p>
              </div>

              {selectedVolunteers.length === 0 && (
                <p style={warningTextStyle}>
                  Please select volunteers from the list below
                </p>
              )}
            </div>

            <div style={modalFooterStyle}>
              <button
                style={primaryButtonStyle}
                onClick={handleBulkGenerate}
                disabled={selectedVolunteers.length === 0}
              >
                <FilePdfOutlined /> Generate PDF ({selectedVolunteers.length}{" "}
                cards)
              </button>
              <button
                style={cancelButtonStyle}
                onClick={() => setBulkGenerate(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={dashboardHeaderStyle}>
        <div style={headerLeftStyle}>
          <div style={logoContainerStyle}>
            <img
              src="/mfa-logo.png"
              alt="MoFA"
              style={headerLogoStyle}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span style={logoTextStyle}>MoFA Admin Dashboard</span>
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
            <span style={notificationBadgeStyle}>5</span>
          </button>
          <button style={headerIconButtonStyle}>
            <SettingOutlined style={headerIconStyle} />
          </button>
          <div style={userMenuStyle}>
            <div style={userAvatarSmallStyle}>AD</div>
            <div style={userInfoSmallStyle}>
              <div style={userNameSmallStyle}>Admin User</div>
              <div style={userRoleSmallStyle}>Administrator</div>
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

      <div style={mainContentAreaStyle}>
        <div style={headerStyle}>
          <button style={backNavButtonStyle} onClick={() => navigate("/")}>
            <ArrowLeftOutlined
              style={{ fontSize: 20, color: colors.deepBlue }}
            />
          </button>
          <div>
            <h1 style={headerTitleStyle}>Volunteer Management</h1>
            <p style={headerSubtitleStyle}>
              Manage and generate ID cards for volunteers
            </p>
          </div>
          <div style={headerSpacerStyle}></div>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <TeamOutlined style={statIconStyle} />
            <div style={statInfoStyle}>
              <span style={statValueStyle}>{volunteers.length}</span>
              <span style={statLabelStyle}>Total Volunteers</span>
            </div>
          </div>
          <div style={statCardStyle}>
            <CheckCircleOutlined
              style={{ ...statIconStyle, color: colors.successGreen }}
            />
            <div style={statInfoStyle}>
              <span style={statValueStyle}>
                {
                  volunteers.filter((v) => v.status === "interview_scheduled")
                    .length
                }
              </span>
              <span style={statLabelStyle}>Interview Scheduled</span>
            </div>
          </div>
          <div style={statCardStyle}>
            <ClockCircleOutlined
              style={{ ...statIconStyle, color: colors.richGold }}
            />
            <div style={statInfoStyle}>
              <span style={statValueStyle}>
                {
                  volunteers.filter((v) => v.status === "document_verification")
                    .length
                }
              </span>
              <span style={statLabelStyle}>Pending Verification</span>
            </div>
          </div>
          <div style={statCardStyle}>
            <IdcardOutlined
              style={{ ...statIconStyle, color: colors.deepBlue }}
            />
            <div style={statInfoStyle}>
              <span style={statValueStyle}>
                {
                  volunteers.filter((v) =>
                    v.documents.some((d) => d.type.includes("id")),
                  ).length
                }
              </span>
              <span style={statLabelStyle}>ID Documents Uploaded</span>
            </div>
          </div>
        </div>

        <div style={actionsBarStyle}>
          <div style={searchBoxStyle}>
            <SearchOutlined style={searchIconStyle} />
            <input
              type="text"
              placeholder="Search by name, ID, or application..."
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={filterBoxStyle}>
            <FilterOutlined
              style={{ color: colors.mediumGray, marginRight: 8 }}
            />
            <select
              style={filterSelectStyle}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="document_verification">
                Document Verification
              </option>
              <option value="interview_scheduled">Interview Scheduled</option>
            </select>
          </div>

          <button style={bulkButtonStyle} onClick={() => setBulkGenerate(true)}>
            <PrinterOutlined /> Bulk Generate IDs
          </button>
        </div>

        {filteredVolunteers.length > 0 && (
          <div style={selectionBarStyle}>
            <div style={selectionInfoStyle}>
              <input
                type="checkbox"
                checked={
                  selectedVolunteers.length === filteredVolunteers.length
                }
                onChange={selectAll}
                style={checkboxStyle}
              />
              <span style={selectionTextStyle}>
                {selectedVolunteers.length === 0
                  ? "Select all"
                  : `Selected ${selectedVolunteers.length} of ${filteredVolunteers.length}`}
              </span>
            </div>
            {selectedVolunteers.length > 0 && (
              <button
                style={generateSelectedStyle}
                onClick={() => setBulkGenerate(true)}
              >
                <FilePdfOutlined /> Generate IDs for Selected
              </button>
            )}
          </div>
        )}

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={tableHeadStyle}>
              <tr>
                <th style={tableHeaderStyle} width="40px">
                  <input
                    type="checkbox"
                    checked={
                      selectedVolunteers.length === filteredVolunteers.length
                    }
                    onChange={selectAll}
                    style={checkboxStyle}
                  />
                </th>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Volunteer</th>
                <th style={tableHeaderStyle}>University</th>
                <th style={tableHeaderStyle}>Department</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>
                    <input
                      type="checkbox"
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={() => toggleVolunteerSelection(volunteer.id)}
                      style={checkboxStyle}
                    />
                  </td>
                  <td style={tableCellStyle}>
                    <strong>{volunteer.id}</strong>
                    <div style={tableSubTextStyle}>
                      {volunteer.application_number}
                    </div>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={tableUserStyle}>
                      <div style={tableAvatarStyle}>
                        {volunteer.user.first_name[0]}
                        {volunteer.user.last_name[0]}
                      </div>
                      <div>
                        <div style={tableNameStyle}>
                          {volunteer.user.first_name} {volunteer.user.last_name}
                        </div>
                        <div style={tableSubTextStyle}>
                          {volunteer.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={tableCellStyle}>{volunteer.university}</td>
                  <td style={tableCellStyle}>{volunteer.department}</td>
                  <td style={tableCellStyle}>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor:
                          getStatusColor(volunteer.status) + "20",
                        color: getStatusColor(volunteer.status),
                        borderColor: getStatusColor(volunteer.status),
                      }}
                    >
                      {volunteer.current_stage}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={actionButtonsStyle}>
                      <button
                        style={tableActionButtonStyle}
                        onClick={() => handleViewVolunteer(volunteer)}
                        title="View ID Card"
                      >
                        <IdcardOutlined />
                      </button>
                      <button
                        style={tableActionButtonStyle}
                        onClick={() => handleGeneratePDF(volunteer, "front")}
                        title="Download Front"
                      >
                        <FilePdfOutlined />
                      </button>
                      <button
                        style={certificateAntdButtonStyle}
                        onClick={handleCertificateClick}
                        title="Generate Certificate"
                      >
                        <TrophyOutlined style={certificateAntdIconStyle} />
                        <span style={certificateAntdTextStyle}>
                          Certificate
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredVolunteers.length === 0 && (
            <div style={emptyTableStyle}>
              <TeamOutlined style={emptyIconStyle} />
              <h3 style={emptyTitleStyle}>No volunteers found</h3>
              <p style={emptyTextStyle}>Try adjusting your search or filter</p>
            </div>
          )}
        </div>

        <div style={tableFooterStyle}>
          <span>
            Showing {filteredVolunteers.length} of {volunteers.length}{" "}
            volunteers
          </span>
        </div>
      </div>
    </div>
  );
}

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
  maxWidth: 1400,
  margin: "0 auto",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 30,
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

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 20,
  marginBottom: 24,
};

const statCardStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 16,
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: 16,
  border: `1px solid ${colors.softGray}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const statIconStyle: React.CSSProperties = {
  fontSize: 32,
  color: colors.richGold,
  background: colors.richGold + "10",
  padding: 10,
  borderRadius: 12,
};

const statInfoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
};

const statValueStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: colors.deepBlue,
  lineHeight: 1.2,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: colors.mediumGray,
};

const actionsBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  marginBottom: 20,
  flexWrap: "wrap" as const,
};

const searchBoxStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 300,
  display: "flex",
  alignItems: "center",
  background: colors.pureWhite,
  border: `1px solid ${colors.softGray}`,
  borderRadius: 40,
  padding: "8px 16px",
  gap: 8,
};

const searchIconStyle: React.CSSProperties = {
  color: colors.mediumGray,
  fontSize: 16,
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 14,
  background: "transparent",
};

const filterBoxStyle: React.CSSProperties = {
  minWidth: 200,
  display: "flex",
  alignItems: "center",
  background: colors.pureWhite,
  border: `1px solid ${colors.softGray}`,
  borderRadius: 40,
  padding: "8px 16px",
};

const filterSelectStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: 14,
  background: "transparent",
  cursor: "pointer",
};

const bulkButtonStyle: React.CSSProperties = {
  padding: "10px 24px",
  borderRadius: 40,
  border: "none",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  whiteSpace: "nowrap" as const,
};

const selectionBarStyle: React.CSSProperties = {
  background: colors.pureWhite,
  border: `1px solid ${colors.softGray}`,
  borderRadius: 40,
  padding: "10px 20px",
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const selectionInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const checkboxStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  cursor: "pointer",
  accentColor: colors.richGold,
};

const selectionTextStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.darkGray,
};

const generateSelectedStyle: React.CSSProperties = {
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

const tableContainerStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 20,
  border: `1px solid ${colors.softGray}`,
  overflow: "auto",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse" as const,
  minWidth: 1000,
};

const tableHeadStyle: React.CSSProperties = {
  background: colors.offWhite,
  borderBottom: `2px solid ${colors.softGray}`,
};

const tableHeaderStyle: React.CSSProperties = {
  padding: "16px",
  textAlign: "left" as const,
  fontSize: 13,
  fontWeight: 600,
  color: colors.deepBlue,
  whiteSpace: "nowrap" as const,
};

const tableRowStyle: React.CSSProperties = {
  borderBottom: `1px solid ${colors.softGray}`,
  transition: "all 0.2s ease",
};

const tableCellStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: 14,
  color: colors.darkGray,
};

const tableSubTextStyle: React.CSSProperties = {
  fontSize: 12,
  color: colors.mediumGray,
  marginTop: 4,
};

const tableUserStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const tableAvatarStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 14,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const tableNameStyle: React.CSSProperties = {
  fontWeight: 600,
  color: colors.deepBlue,
};

const statusBadgeStyle: React.CSSProperties = {
  padding: "4px 12px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 500,
  display: "inline-block",
  border: "1px solid",
};

const actionButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
};

const tableActionButtonStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: `1px solid ${colors.softGray}`,
  background: colors.pureWhite,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  color: colors.darkGray,
};

const emptyTableStyle: React.CSSProperties = {
  padding: "60px 20px",
  textAlign: "center" as const,
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
  margin: 0,
};

const tableFooterStyle: React.CSSProperties = {
  padding: "16px",
  textAlign: "right" as const,
  fontSize: 13,
  color: colors.mediumGray,
  borderTop: `1px solid ${colors.softGray}`,
};

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

const idPreviewModalStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 24,
  width: "90%",
  maxWidth: 600,
  maxHeight: "90vh",
  overflow: "hidden",
  boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
};

const bulkModalStyle: React.CSSProperties = {
  background: colors.pureWhite,
  borderRadius: 24,
  width: "90%",
  maxWidth: 500,
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

const modalHeaderActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: colors.deepBlue,
  margin: 0,
  display: "flex",
  alignItems: "center",
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

const sideToggleButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 30,
  border: `1px solid ${colors.richGold}`,
  background: "transparent",
  color: colors.richGold,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
};

// Add these styles after your existing styles
const certificateAntdButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "20px",
  border: "none",
  background: "linear-gradient(135deg, #faad14, #fadb14)", // Ant Design gold gradient
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 8px rgba(250, 173, 20, 0.3)",
  whiteSpace: "nowrap" as const,
};

const certificateAntdIconStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#ffffff",
};

const certificateAntdTextStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.3px",
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

const idPreviewContainerStyle: React.CSSProperties = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: colors.offWhite,
};

// ID Card Styles - All required styles defined here
const idCardFrontStyle: React.CSSProperties = {
  width: "350px",
  height: "500px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  background: colors.pureWhite,
  display: "flex",
  flexDirection: "column" as const,
};

const idCardBackStyle: React.CSSProperties = {
  width: "350px",
  height: "500px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  background: colors.pureWhite,
  display: "flex",
  flexDirection: "column" as const,
};

const idCardHeaderContainerStyle: React.CSSProperties = {
  height: "120px",
  width: "100%",
  overflow: "hidden",
  backgroundColor: colors.deepBlue,
};

const idCardHeaderImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const idCardHeaderFallbackStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: colors.deepBlue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const idCardHeaderFallbackText: React.CSSProperties = {
  color: colors.richGold,
  fontSize: "18px",
  fontWeight: 700,
};

const idCardFrontContentStyle: React.CSSProperties = {
  padding: "25px 20px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
};

const idCardPhotoWrapperStyle: React.CSSProperties = {
  marginBottom: "25px",
  display: "flex",
  justifyContent: "center",
};

const idCardPhotoStyle: React.CSSProperties = {
  width: "140px",
  height: "160px",
  objectFit: "cover" as const,
  borderRadius: "8px",
  border: "2px solid #ddd",
  backgroundColor: "#f5f5f5",
};

const idCardPhotoFallbackStyle: React.CSSProperties = {
  width: "140px",
  height: "160px",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  fontSize: "36px",
  fontWeight: 700,
  border: "2px solid #ddd",
};

const idCardNameSectionStyle: React.CSSProperties = {
  marginBottom: "0",
  textAlign: "center" as const,
};

const idCardNameStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "24px",
  margin: "0 0 8px",
  color: colors.deepBlue,
};

const idCardNameAmharicStyle: React.CSSProperties = {
  fontSize: "20px",
  margin: "0 0 12px",
  color: colors.darkGray,
  fontFamily: "'Noto Sans Ethiopic', 'Nyala', sans-serif",
};

const idCardRoleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "22px",
  margin: "0",
  color: colors.richGold,
};

const idCardFrontFooterStyle: React.CSSProperties = {
  background: "#b91c1c",
  color: "#ffffff",
  textAlign: "center" as const,
  padding: "16px 10px",
  fontWeight: 700,
  width: "100%",
  marginTop: "auto",
};

const idCardFooterTextStyle: React.CSSProperties = {
  fontSize: "20px",
  letterSpacing: "1px",
  marginBottom: "6px",
};

const idCardFooterAmharicStyle: React.CSSProperties = {
  fontSize: "18px",
  fontFamily: "'Noto Sans Ethiopic', 'Nyala', sans-serif",
  letterSpacing: "0.5px",
};

const idCardBackFooterBarStyle: React.CSSProperties = {
  background: "#b91c1c",
  color: "#ffffff",
  textAlign: "center" as const,
  padding: "16px 10px",
  fontWeight: 700,
  fontSize: "20px",
  letterSpacing: "1px",
  width: "100%",
  marginTop: "auto",
};

const idCardBackContentStyle: React.CSSProperties = {
  padding: "25px 20px",
  fontSize: "14px",
  display: "flex",
  flexDirection: "column" as const,
  flex: 1,
};

const idCardBackTextContentStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};

const idCardValidityStyle: React.CSSProperties = {
  padding: "20px",
  background: colors.offWhite,
  borderRadius: "8px",
  border: `1px solid ${colors.softGray}`,
};

const idCardAmharicValidityStyle: React.CSSProperties = {
  marginBottom: "15px",
};

const idCardAmharicTextStyle: React.CSSProperties = {
  fontFamily: "'Noto Sans Ethiopic', 'Nyala', sans-serif",
  fontSize: "16px",
  margin: "6px 0",
  color: colors.deepBlue,
  fontWeight: 500,
};

const idCardEnglishValidityStyle: React.CSSProperties = {
  borderTop: `1px dashed ${colors.mediumGray}`,
  paddingTop: "15px",
};

const idCardEnglishTextStyle: React.CSSProperties = {
  fontSize: "14px",
  margin: "6px 0",
  color: colors.darkGray,
};

const bulkInfoStyle: React.CSSProperties = {
  fontSize: 14,
  color: colors.darkGray,
  margin: "0 0 20px",
  padding: "12px",
  background: colors.offWhite,
  borderRadius: 8,
};

const bulkPreviewStyle: React.CSSProperties = {
  background: colors.offWhite,
  borderRadius: 12,
  padding: "20px",
  textAlign: "center" as const,
};

const bulkCardPreviewStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  marginBottom: 10,
};

const bulkCardFrontStyle: React.CSSProperties = {
  width: 80,
  height: 50,
  background: colors.deepBlue,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.pureWhite,
  fontSize: 11,
  fontWeight: 600,
};

const bulkCardBackStyle: React.CSSProperties = {
  width: 80,
  height: 50,
  background: colors.deepBlue,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.richGold,
  fontSize: 11,
  fontWeight: 600,
};

const bulkCardLabelStyle: React.CSSProperties = {
  fontSize: 12,
  color: colors.mediumGray,
  margin: 0,
};

const warningTextStyle: React.CSSProperties = {
  color: colors.errorRed,
  fontSize: 13,
  margin: "12px 0 0",
  textAlign: "center" as const,
};

const primaryButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 30,
  border: "none",
  background: `linear-gradient(135deg, ${colors.deepBlue}, ${colors.richGold})`,
  color: colors.pureWhite,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
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

const downloadButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.successGreen}`,
  background: "transparent",
  color: colors.successGreen,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.softGray}`,
  background: "transparent",
  color: colors.darkGray,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const modalCloseBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  borderRadius: 30,
  border: `1px solid ${colors.softGray}`,
  background: colors.pureWhite,
  color: colors.darkGray,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};
