import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.jsx";
import { useEffect, useState } from "react";

import React, { use } from "react";

function Leaderboard() {
  //DEFINING STATES
  const [board, setBoard] = useState([]);
  const [info, setInfo] = useState([]);

  //Defining collection reference
  const refScores = collection(db, "scores");
  const refUsers = collection(db, "users");

  //Defining button function

  const getScores = async () => {
    try {
      const data = await getDocs(refScores);
      const scores = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBoard(scores);
      // console.log(scores);
    } catch (error) {
      console.error("Error fetching scores: ", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const data = await getDocs(refUsers);
      const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInfo(users);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const combined = board.map((score) => ({
    ...score,
    user: info.find((u) => u.id === score.userId),
  }));

  combined.sort((a, b) => a.timeTaken - b.timeTaken);

  console.log(combined);

  useEffect(() => {
    getScores();
    getUserInfo();
  }, []);

  return (
    <>
      <div>
        <table>
          <tr>
            <th>userId</th>
            <th>timeTaken</th>
            <th>penalty</th>
            <th>name</th>
          </tr>

          {combined.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.userId}</td>
              <td>{entry.timeTaken}</td>
              <td>{entry.penalty}</td>
              <td>{entry.user?.name}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default Leaderboard;
