import { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Main() {
  // const tempGroupMember = {
  //   groupMember: [
  //     {
  //       group_id: "10",
  //       group_name: "가족",
  //       member: [
  //         { id: "11", name: "아빠", imageFile: "thumb11.jpg" },
  //         { id: "12", name: "엄마", imageFile: "thumb12.jpg" },
  //       ],
  //     },
  //     {
  //       group_id: "11",
  //       group_name: "친구",
  //       member: [
  //         { id: "13", name: "친구1", imageFile: "thumb13.jpg" },
  //         { id: "14", name: "친구2", imageFile: "thumb14.jpg" },
  //         { id: "15", name: "친구3", imageFile: "thumb15.jpg" },
  //       ],
  //     },
  //     {
  //       group_id: "12",
  //       group_name: "직장동료",
  //       member: [
  //         { id: "16", name: "직장동료1", imageFile: "thumb16.jpg" },
  //         { id: "17", name: "직장동료2", imageFile: "thumb17.jpg" },
  //         { id: "18", name: "직장동료3", imageFile: "thumb18.jpg" },
  //       ],
  //     },
  //   ],
  // };

  const [groupRes, setGroupRes] = useState();

  const getInitGroupRes = () => {
    axios
      .get(
        `https://c3403033-655b-4658-8740-86803973bd06.mock.pstmn.io/dcx/3/groupMember`
      )
      .then((res) => {
        // console.log(res?.data?.groupMember);
        setGroupRes(res?.data.groupMember);
      });
  };

  useEffect(() => {
    getInitGroupRes();
  }, []);

  const [expandedGroups, setExpandedGroups] = useState([]);

  const toggleGroup = (groupId) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter((id) => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  return (
    <div>
      <div className="talk-header">
        <h2>DCX Talk</h2>
      </div>
      <hr />
      {groupRes != undefined &&
        groupRes.map((group) => (
          <div key={group.group_id}>
            <h2 onClick={() => toggleGroup(group.group_id)}>
              {group.group_name}{" "}
              {expandedGroups.includes(group.group_id) ? "△" : "▽"}
            </h2>
            {expandedGroups.includes(group.group_id) && (
              <ul>
                {group.member.map((member) => (
                  <Link
                    to={`/members/${member.id}`}
                    key={member.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="member-card" key={member.id}>
                      <img
                        className="adImage"
                        src={`/images/${member.imageFile}`}
                      />
                      <div>{member.name}</div>
                    </div>
                  </Link>
                ))}
              </ul>
            )}
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Main;
