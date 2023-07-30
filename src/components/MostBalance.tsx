import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

import * as API from "../api";

type DataType = {
  _id: string;
  name: string;
  talent: number;
  id: number;
  team: number;
};

interface UserDataType {
  name: string;
  balance: number;
}

const MostBalance: React.FC = () => {
  const [userData, setUserData] = useState<Array<UserDataType>>([]);
  useEffect(() => {
    // console.log("useEffect has been called");
    const refresher = async () => {
      const data = await API.get("user/maxfive");
      const extractedData = data?.data?.data;
      setUserData(
        extractedData.map((v: DataType) => {
          const newData = {
            name: v.name,
            balance: v.talent,
          };
          return newData;
        })
      );
    };

    setInterval(() => {
      refresher();
    }, 1000);
    // refresher();
  }, []);

  return (
    <Dashboard
      title="남은 달란트가 가장 많은 사람은?"
      data={userData}
      valueKey="balance"
    />
  );
};

export default MostBalance;

/*
const MostBalance: React.FC = () => {
  const [userBalanceData, setUserBalanceData] = useState([]);

  useEffect(() => {
    // API 호출하여 데이터 받아오는 로직
    const fetchData = async () => {
      try {
        const response = await fetch("API_URL");
        const data = await response.json();
        setUserBalanceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
   return (
    <Dashboard title="남은 달란트가 가장 많은 사람은 누구인가요?" data={userBalanceData} valueKey="balance" />
  );
};
*/
