import React from "react";
import "./Rate.css";
import { Typography } from "@mui/material";

type DataItem = {
  name: string;
  [key: string]: any; // additional data properties
};

type DashboardProps = {
  title: string;
  data: DataItem[];
  valueKey: string;
};

const Dashboard: React.FC<DashboardProps> = ({ title, data, valueKey }) => {
  // 데이터를 기준으로 정렬
  const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);

  return (
    <div className="leaderboard">
      <h1>
        <svg className="ico-cup" />
        <text
          style={{ fontFamily: "Poor Story, sans-serif", fontSize: "27px" }}
        >
          {title}
        </text>
      </h1>
      <Typography
        style={{ fontFamily: "Poor Story, sans-serif" }}
        fontWeight={"bold"}
      >
        {sortedData.slice(0, 5).map((item, index) => (
          <li key={index}>
            <mark>{item.name}</mark>
            <small>{item[valueKey]} 달란트</small>
          </li>
        ))}
      </Typography>
    </div>
  );
};

export default Dashboard;
