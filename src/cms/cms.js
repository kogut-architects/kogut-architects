import CMS from "decap-cms-app";
import uploadcare from "decap-cms-media-library-uploadcare";

import PortfolioPagePreview from "./preview-templates/PortfolioPagePreview";
import ProfilePagePreview from "./preview-templates/ProfilePagePreview";
import HomePagePreview from "./preview-templates/HomePagePreview";
import FooterPreview from "./preview-templates/FooterPreview";
import NavbarPreview from "./preview-templates/NavbarPreview";
import ContactPagePreview from "./preview-templates/ContactPagePreview";

// CMS.init();
CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate("footer", FooterPreview);
CMS.registerPreviewTemplate("navbar", NavbarPreview);
CMS.registerPreviewTemplate("portfolio", PortfolioPagePreview);
CMS.registerPreviewTemplate("profile", ProfilePagePreview);
CMS.registerPreviewTemplate("home", HomePagePreview);
CMS.registerPreviewTemplate("contact", ContactPagePreview);
