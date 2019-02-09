import React from "react";
import "./styles.scss";

export const FooterTemplate = ({ data }) => {
  const { menuItems } = data;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom container">
          <div className="footer-bottom-container">
          {menuItems.length > 0 && (
            <ul className="footer-menu-items">
              {menuItems.map(menuItem => (
                <li key={menuItem.label} className="footer-socialMenuItem">
                  <a
                    className="footer-menu-item"
                    href={menuItem.linkURL}
                  >
                    {menuItem.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <FooterTemplate data={data} />;
};

export { Footer };
