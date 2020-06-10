import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import "./JobDetail.css";
import { Button } from "antd";
class JobDetail extends Component {
  state = {
    job_detail: null,
    allJobs: [],
    job_id: null,
  };
  componentDidMount() {
    let JobsData = JSON.parse(localStorage.getItem("job-list"));
    let id = this.props.match.params._id;

    this.setState({ allJobs: JobsData, job_id: id });
    if (id) {
      let job_detail = JobsData.find((d) => d._id === id);
      this.setState({ job_detail });
      console.log("ID", id, job_detail);
    }
  }
  gotoMapview = () => {
    this.props.history.push(`/mapview/${this.state.job_id}`);
  };

  changeStatus = (status) => {
    if (status === "accepted") {
      this.setState((state) => {
        let jobsData = state.allJobs;
        let foundjob = jobsData.find((d) => d._id === this.state.job_id);
        foundjob.status = "accepted";
        let jobDetail = state.job_detail;
        jobDetail.status = "accepted";
        localStorage.setItem("job-list", JSON.stringify(jobsData));

        return { job_detail: jobDetail };
      });
    } else {
      this.setState((state) => {
        let jobsData = state.allJobs;
        let foundjob = jobsData.find((d) => d._id === this.state.job_id);
        foundjob.status = "rejected";
        let jobDetail = state.job_detail;
        jobDetail.status = "rejected";
        localStorage.setItem("job-list", JSON.stringify(jobsData));
        return { job_detail: jobDetail };
      });
    }
  };
  render() {
    let { job_detail } = this.state;
    return (
      <div
        className="job-detail-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {job_detail && (
          <div className="job_detail_inner">
            <lable>Car Name :{job_detail.car_name} </lable>
            <lable>Car Type :{job_detail.car_type} </lable>
            <lable> Instruction :{job_detail.instructions || job_detail.Instructions} </lable>
          </div>
        )}
        <div className="btn-group">
          {job_detail && job_detail.status !== "rejected" && (
            <Fragment>
              {job_detail && job_detail.status !== "accepted" ? (
                <Button
                  onClick={() => this.changeStatus("accepted")}
                  type="primary"
                >
                  Accept
                </Button>
              ) : (
                <Button
                  onClick={() => this.gotoMapview("accepted")}
                  type="primary"
                  ghost
                >
                  Start your journey
                </Button>
              )}
            </Fragment>
          )}

          {job_detail && job_detail.status !== "rejected" ? (
            <Button
              onClick={() => this.changeStatus("rejected")}
              type="primary"
              danger
            >
              Reject
            </Button>
          ) : (
            <Button
              onClick={() => this.changeStatus("rejected")}
              type="primary"
              danger
              disabled
            >
              Rejected
            </Button>
          )}
        </div>
        <Link to="/">Go To Jobs</Link>
      </div>
    );
  }
}

export default withRouter(JobDetail);
