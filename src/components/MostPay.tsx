import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

import * as API from "../api";

const MostPay: React.FC = () => {
  // 사용자별 사용 금액 데이터
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // console.log("useEffect has been called");
    const refresher = async () => {
      console.log("tyring...");
      const data = await API.get("log/maxfive");
      const extractedData = data?.data;
      console.log(extractedData);
      if (extractedData?.length > 0) {
        setUserData(
          extractedData?.map(async (v: string[]) => {
            const name = await API.post("user/find", { id: v[0] });
            const amount = v[1];

            return { name, amount };
          })
        );
      }
    };

    setInterval(() => {
      refresher();
    }, 1000);
  }, []);

  return (
    <Dashboard
      title="달란트를 가장 많이 사용한 사람은?"
      data={userData}
      valueKey="amount"
    />
  );
};

export default MostPay;

/*const MostPay: React.FC = () => {
  const [userPayData, setUserPayData] = useState([]);

  useEffect(() => {
    // API 호출하여 데이터 받아오는 로직
    const fetchData = async () => {
      try {
        const response = await fetch("API_URL");
        const data = await response.json();
        setUserPayData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dashboard title="누가 가장 많이 사용했나요?" data={userPayData} valueKey="amount" />
  );
};
*/
