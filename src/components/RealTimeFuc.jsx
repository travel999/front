import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase";
import { getDatabase, onValue, ref, set, query } from "firebase/database";

// firebase 미사용

const RealTimeFuc = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const db = getDatabase();

    if (text !== "") {
      // 보내는 부분
      const refvalue = query(ref(db, `user/value`));
      set(ref(db, `user/value`), {
        input: text,
      });
      // 받는 부분
      onValue(refvalue, (value) => {
        const data = value.val().input;
        setText(data);
      });
    }
  }, [text]);

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} />
      <div>{text}</div>
    </div>
  );
};

export default RealTimeFuc;
