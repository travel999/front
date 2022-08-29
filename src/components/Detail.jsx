import React from "react";
import { useParams } from "react-router-dom";
import MyLikePage from "./detail/MyLikePage";
import MyPostPage from "./detail/MyPostPage";

const Detail = () => {
  const { word } = useParams();

  return (
    <>
      {word == "mypost" ? <MyPostPage /> : null}
      {word == "mylike" ? <MyLikePage /> : null}
    </>
  );
};

export default Detail;
