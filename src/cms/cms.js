import CMS from "netlify-cms";

import ProfilePagePreview from "./preview-templates/ProfilePagePreview";
import HomePagePreview from "./preview-templates/HomePagePreview";
import FooterPreview from "./preview-templates/FooterPreview";
import NavbarPreview from "./preview-templates/NavbarPreview";

CMS.registerPreviewTemplate("footer", FooterPreview);
CMS.registerPreviewTemplate("navbar", NavbarPreview);
CMS.registerPreviewTemplate("profile", ProfilePagePreview);
CMS.registerPreviewTemplate("home", HomePagePreview);