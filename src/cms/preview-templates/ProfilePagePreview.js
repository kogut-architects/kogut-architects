import React from "react";
import PropTypes from "prop-types";
import { ProfilePageTemplate } from "../../templates/profile-page";

const ProfilePagePreview = ({ entry, widgetFor }) => (
  <ProfilePageTemplate
    page={{
      frontmatter: entry.getIn(["data"]).toJS(),
      html: entry.getIn(["data", "body"]),
      bodyIsMarkdown: true,
    }}
  />
);

ProfilePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ProfilePagePreview;
