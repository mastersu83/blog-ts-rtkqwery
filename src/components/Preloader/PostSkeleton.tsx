import React from "react";
import ContentLoader from "react-content-loader";

const PostSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={950}
      height={700}
      viewBox="0 0 950 700"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="25" y="0" rx="7" ry="7" width="870" height="145" />
      <rect x="25" y="165" rx="7" ry="7" width="870" height="145" />
      <rect x="25" y="330" rx="7" ry="7" width="870" height="145" />
    </ContentLoader>
  );
};

export default PostSkeleton;
