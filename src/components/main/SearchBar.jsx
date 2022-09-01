import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchText } from "../../redux/modules/MainSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const input_ref = useRef();

  const tosearch = (value) => {
    dispatch(searchText(value));
  };

  return (
    <div>
      <input ref={input_ref} />
      <button
        onClick={() => {
          tosearch(input_ref.current.value);
        }}
      >
        입력
      </button>
    </div>
  );
};

export default SearchBar;
