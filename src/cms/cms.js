import CMS from "netlify-cms";

import PortfolioPagePreview from "./preview-templates/PortfolioPagePreview";
import ProfilePagePreview from "./preview-templates/ProfilePagePreview";
import HomePagePreview from "./preview-templates/HomePagePreview";
import FooterPreview from "./preview-templates/FooterPreview";
import NavbarPreview from "./preview-templates/NavbarPreview";

CMS.registerPreviewTemplate("footer", FooterPreview);
CMS.registerPreviewTemplate("navbar", NavbarPreview);
CMS.registerPreviewTemplate("portfolio", PortfolioPagePreview);
CMS.registerPreviewTemplate("profile", ProfilePagePreview);
CMS.registerPreviewTemplate("home", HomePagePreview);