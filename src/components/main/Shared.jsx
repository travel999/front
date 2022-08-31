import { faTransgender } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PostCards from "../detail/PostCards";
import { searchText } from "../../redux/modules/MainSlice";

const Shared = () => {
  const [search, setSearch] = useState(false); //검색창 보이기 안보이기
  const Search_ref = useRef();
  const dispatch = useDispatch();

  // 검색하기
  const tosearch = (value) => {
    dispatch(searchText(value));
  };

  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true); // preventRef는 특정 환경에서 옵저버 핸들러가 2~3번까지 중복으로 실행되는 경우 방지
  const obsRef = useRef(null);

  //page를 받아서 getDog실행
  useEffect(() => {
    loadpost();
  }, [page]);

  // obsRef가 50% 이상 보이면 불러오기
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // IntersectionObserver에 들어갈 실행시킬 callback함수
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const loadpost = useCallback(async () => {
    //글 불러오기
    console.log("불러오기");
    setLoad(true); //로딩 시작
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 수정필요
    // 검색어가 있을때 이부분 수정 필요.
    // dispatch로 slice에 추가해야할듯.
    const res = await axios({
      method: "GET",
      url: `/api/`,
    });
    if (res.data) {
      // setList((prev) => [...prev, { ...res.data[0] }]); //리스트 추가
      // preventRef.current = true; // 돌아왔을때 실행 필요
    } else {
      console.log(res); //에러
    }
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    setLoad(false); //로딩 종료
  }, [page]);

  return (
    <SharedBox>
      <RecommendBox>
        다양한 일정들
        <ShowSearchBtn
          onClick={() => {
            setSearch(!search);
          }}
        >
          🔍
        </ShowSearchBtn>
        {search ? (
          <>
            <input ref={Search_ref} />
            <SearchBtn
              onClick={() => {
                tosearch(Search_ref.current.value);
              }}
            >
              검색
            </SearchBtn>
          </>
        ) : null}
      </RecommendBox>
      <PostCardBox>
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
      </PostCardBox>
      <span ref={obsRef}>
        {setLoad ? null : <SpinnerImg>로딩중</SpinnerImg>}
      </span>
    </SharedBox>
  );
};

const SharedBox = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const RecommendBox = styled.div`
  display: flex;
  margin: 10px 0px 0px 10px;
`;

const ShowSearchBtn = styled.div`
  margin: 0px 10px;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  cursor: pointer;
  margin-left: 5px;
`;

const PostCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
`;

const SpinnerImg = styled.span`
  background-color: yellow;
`;

export default Shared;
