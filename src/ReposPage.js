import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RepoPage = ({ username, setUsername }) => {
  const [repos, setRepos] = useState([]);

  const fetchIssues = async (user) => {
    localStorage.setItem('user',username);
    try {
      // const response = await axios.get('https://api.github.com/repos/{owner}/{repo}/issues');
      const response = await axios.get(
        `https://api.github.com/users/${username || user}/repos`
      );
      //  console.log(response.data)
      setRepos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const style = {
    display: "grid",
    gridTemplateColumns: "50% 30% 20%",
    margin:"10px 50px",
    border:"1px solid gray",
    padding: "10px"
  };
  useEffect(() => {
    const username = localStorage.getItem('user');
    if(username) fetchIssues(username);
  },[])
  return (
    <div className="repo-container">
      <input
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
      />
      <button onClick={() => fetchIssues()}>Search</button>
      <h1>Issues</h1>
        {repos.map((repo) => (
            repo.open_issues > 0 ? <Link to={`/${username}/${repo.name}`}>
              <div className="repo-row link" style={style}>
                <div>{repo.name}</div>
                <div>{repo.owner.login}</div>
                <div>{repo.open_issues}</div>
              </div>
            </Link> : <div className="repo-row no-link" style={style}>
                <div>{repo.name}</div>
                <div>{repo.owner.login}</div>
                <div>{repo.open_issues}</div>
              </div>
        ))}
    </div>
  );
};

export default RepoPage;
