import React from "react";
import { useParams } from "react-router-dom";
import MyLikePage from "./MyLikePage";
import MyPostPage from "./MyPostPage";

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
