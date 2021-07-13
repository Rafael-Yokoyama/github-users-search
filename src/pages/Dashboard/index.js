import React from "react";

import { GithubContext } from "../../context";
import Search from "../../components/Search";
import Info from "../../components/Info";
import User from "../../components/User";

const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Search />

        <img
          src="https://media1.giphy.com/media/512XDI4IIcHIMiYzSi/giphy.gif?cid=ecf05e476nnog923qanna3nxyi2npentubc1ukuh6x97rlcw&rid=giphy.gif&ct=s"
          className="loading-img"
          alt="loading"
        ></img>
      </main>
    );
  }
  return (
    <main>
      <Search />
      <Info />
      <User />
    </main>
  );
};

export default Dashboard;
