import { useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./MemeberConversation.css";
import axios from "axios";

function MemeberConversation(ppppp) {
  const { id } = useParams();

  const [coverEntityList, setConverEntityList] = useState([]);
  const [myConver, setMyConver] = useState("");

  const handleConverChange = (e) => {
    // console.log(e.target.value);
    setMyConver(e.target.value);
  };

  const handleAddConversationList = () => {
    const object = {
      text: myConver,
      // time: moment().format("YYYY-MM-DD HH:mm:ss"),
      time: moment().locale("ko").format("a hh:mm"),
      my: true,
    };
    setConverEntityList((prevList) => [...prevList, object]);
    console.log(coverEntityList);
    getRes(myConver);
    setMyConver("");
  };

  const getRes = (text) => {
    axios
      .get(
        `https://c3403033-655b-4658-8740-86803973bd06.mock.pstmn.io/dcx/3/conversation/${text}`
      )
      .then((res) => {
        // console.log(res?.data?.groupMember);
        console.log(res.data.conversation);
        const object2 = {
          text: res?.data.conversation.response,
          // time: moment().format("YYYY-MM-DD HH:mm:ss"),
          time: moment().locale("ko").format("a hh:mm"),
          my: false,
        };
        setConverEntityList((prevList) => [...prevList, object2]);
        console.log(coverEntityList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <h2>
      <h1 className="header">id {id} 와의 대화 </h1>
      <div className="conver-list">
        {coverEntityList.map((data) => (
          <div className="my-conver-list">
            <div className={data.my ? "conver" : "conver2"}>{data.text}</div>
            <div className="conver-time">{data.time}</div>
          </div>
        ))}
      </div>
      <input type="text" onChange={handleConverChange} value={myConver} />
      <button onClick={handleAddConversationList}>보내기</button>
    </h2>
  );
}

export default MemeberConversation;
