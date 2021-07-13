import React, { useState, useEffect } from "react";
import axios from "axios";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepo";
import mockFollowers from "./mockData.js/mockFollowers";


const baseUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [repos, setRepos] = useState(mockRepos);

  //request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${baseUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      sessionStorage.setItem("user", login);

      await Promise.allSettled([
        axios(`${baseUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };
  //check rate
  const checkRequests = () => {
    axios(`${baseUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, "sorry you exceeded the hourly limit");
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  //error
  const fetchUser = async (user) => {
    setIsLoading(true);
    await Promise.allSettled([
      axios(`${baseUrl}/users/${user}/repos?per_page=100`),
      axios(`https://api.github.com/users/${user}/followers?per_page=100`),
      axios(`${baseUrl}/users/${user}`),
    ])
      .then((results) => {
        const [repos, followers, user] = results;
        const status = "fulfilled";
        if (repos.status === status) {
          setRepos(repos.value.data);
        }
        if (followers.status === status) {
          setFollowers(followers.value.data);
        }
        if (user.status === status) {
          setGithubUser(user.value.data);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const defaultUser = () => {
    const defaultUsername = "Rafael-Yokoyama";
    const username = sessionStorage.getItem("user");
    if (username) {
      fetchUser(username);
    } else {
      fetchUser(defaultUsername);
    }
  };
  useEffect(() => {
    checkRequests();
    defaultUser();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
