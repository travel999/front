import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const tokenValue = localStorage.getItem("jwtToken");

  const removeToken = async () => {
    localStorage.removeItem("provider");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("image");
    toast.success(
      "로그아웃이 완료되었습니다.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
      setTimeout(() => {
        navigate("/");
      }, 1000)
    );
  };

  const OntoHome = () => {
    if (!tokenValue) {
      navigate("/");
    } else {
      navigate("/main");
    }
  };

  return (
    <HeaderBox>
      <HomBtn
        onClick={() => {
          OntoHome();
        }}
      >
        HOME
      </HomBtn>
      <Topcontent>
        <ContentBtn
          onClick={() => {
            navigate("/main");
          }}
        >
          MAIN
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/write");
          }}
        >
          WRITE
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/liked");
          }}
        >
          LIKE
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/profile");
          }}
        >
          PROFILE
        </ContentBtn>
      </Topcontent>
      <div>
        {
          <LogOutBtn
            onClick={() => {
              removeToken();
            }}
          >
            LOGOUT
          </LogOutBtn>
        }
        <ToastContainer />
      </div>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  height: 3vh;
  padding: 2vh 2vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;

const HomBtn = styled.div`
  cursor: pointer;
  margin-left: 10px;
  margin-top: 3px;
  font-weight: 500;
  :hover {
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }
`;

const LogOutBtn = styled.div`
  cursor: pointer;
  margin-right: 10px;
  margin-top: 3px;
  font-weight: 500;
  :hover {
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }
`;

const Topcontent = styled.div`
  display: flex;
  margin: 0px 0vw 0px 35vw;
  z-index: 5;
  font-weight: 500;
  div {
    margin-left: 40px;
    margin-top: 3px;
    :hover {
      border-bottom: 1px solid black;
      margin-bottom: -1px;
    }
  }
`;

const ContentBtn = styled.div`
  cursor: pointer;
`;
export default Header;
