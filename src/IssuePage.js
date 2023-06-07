import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const IssuePage = ({ username }) => {
  const { user , repo} = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  console.log()
  useEffect(() => {
    if(user && repo) fetchIssue();
  }, [user,repo]);

  const fetchIssue = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user}/${repo}/issues`
      );
     

      console.log("response is", response);
      setIssue(response.data);
    } catch (error) {
      console.error("Error fetching issue:", error);
    }
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div><button onClick={() => navigate("/")} style={{padding:"10px", border:"2px solid blue"}}>Back</button></div>
      {issue.map((repo) => (
        <li key={repo.id}>
          <h2><span style={{color:"red"}}>Issue name:</span>{repo.title}</h2>
          <p><span style={{color:"red"}}>Date:</span>{repo.created_at}</p>
          {/* <p><span style={{color:"red"}}>repo_open issue:</span>{repo.open_issues}</p> */}
        </li>
      ))}

      {/* Display any other relevant information about the issue */}
    </div>
  );
};

export default IssuePage
;
