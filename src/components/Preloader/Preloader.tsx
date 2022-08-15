import React from "react";
import ContentLoader from "react-content-loader";

const Preloader = () => (
  <ContentLoader
    speed={2}
    width={780}
    height={1200}
    viewBox="0 0 780 1200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="780" height="450" />
    <rect x="0" y="470" rx="0" ry="0" width="590" height="20" />
    <rect x="0" y="505" rx="0" ry="0" width="590" height="20" />
    <rect x="0" y="555" rx="0" ry="0" width="260" height="20" />
    <rect x="0" y="597" rx="0" ry="0" width="700" height="100" />
    <rect x="0" y="723" rx="0" ry="0" width="700" height="100" />
    <rect x="0" y="850" rx="0" ry="0" width="700" height="100" />
    <rect x="0" y="985" rx="0" ry="0" width="260" height="20" />
    <rect x="0" y="1023" rx="7" ry="7" width="700" height="100" />
    <rect x="420" y="1155" rx="7" ry="7" width="125" height="45" />
    <rect x="560" y="1155" rx="7" ry="7" width="125" height="45" />
  </ContentLoader>
);

export default Preloader;
