import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicantsByJob, setApplicantsByJob] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // GET JOBS
        const jobsRes = await axios.get("https://devhire-backend-xe8h.onrender.com/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(jobsRes.data);

        // GET MY APPLICATIONS
        const appsRes = await axios.get(
          "https://devhire-backend-xe8h.onrender.com/api/applications/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobIds = appsRes.data.map((app) => app.job._id);
        setAppliedJobs(jobIds);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // APPLY TO JOB
  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://devhire-backend-xe8h.onrender.com/api/applications",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update UI instantly
      setAppliedJobs((prev) => [...prev, jobId]);

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Error");
    }
  };

  // FETCH APPLICANTS (EMPLOYER VIEW)
  const fetchApplicants = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://devhire-backend-xe8h.onrender.com/api/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicantsByJob((prev) => ({
        ...prev,
        [jobId]: res.data,
      }));

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "20px" }}>Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            textAlign: "left"
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            {job.company}
          </p>

          {/* APPLY BUTTON */}
          {appliedJobs.includes(job._id) ? (
            <button
              disabled
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "6px",
                background: "gray",
                border: "none"
              }}
            >
              Applied ✅
            </button>
          ) : (
            <button
              onClick={() => applyJob(job._id)}
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "6px",
                background: "#22c55e",
                border: "none",
                cursor: "pointer"
              }}
            >
              Apply
            </button>
          )}

          {/* VIEW APPLICANTS BUTTON */}
          <button
            onClick={() => fetchApplicants(job._id)}
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "6px",
              background: "#3b82f6",
              border: "none",
              color: "white",
              cursor: "pointer"
            }}
          >
            View Applicants
          </button>

          {/* APPLICANTS LIST */}
          {applicantsByJob[job._id]?.map((app) => (
            <div
              key={app._id}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#0f172a",
                borderRadius: "6px"
              }}
            >
              <p>{app.user.name}</p>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {app.user.email}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Jobs;