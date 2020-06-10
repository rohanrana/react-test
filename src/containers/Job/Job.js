import React, { Component } from "react";
import { Row, Button } from "antd";
import { uuid } from "uuidv4";
import { withRouter } from "react-router-dom";
import JobListing from "../../components/JobLIsting/JobListing";

class Job extends Component {
  state = {
    jobs: [
      {
        _id: uuid(),
        car_name: "Scoda",
        car_type: "sedan",
        origin: {
          latitude: 12.12,
          longitude: 76.68,
        },
        status: "pending",
        desitination: {
          latitude: 24.879999,
          longitude: 74.629997,
        },
        Instructions: "Please call me before you reach",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "Audi 7",
        car_type: "sedan",
        status: "pending",

        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        desitination: {
          latitude: "24.879999",
          longitude: "74.629997",
        },
        Instructions: "Please message me before you reach",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "Kia",
        car_type: "SUV",
        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        status: "pending",

        desitination: {
          latitude: "13.879999",
          longitude: "80.629997",
        },
        Instructions: "Please stop your car at tower i will be there",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "MG Hector",
        car_type: "SUV",
        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        status: "pending",

        desitination: {
          latitude: "24.879999",
          longitude: "74.629997",
        },
        Instructions: "Please call me before you reach ",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "Ferrari",
        car_type: "Sport",
        status: "pending",

        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        desitination: {
          latitude: "24.879999",
          longitude: "74.629997",
        },
        Instructions:
          "Dont call me just reach at the location i will be available ",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "Toyota",
        car_type: "Mini SUV",
        status: "pending",

        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        desitination: {
          latitude: "24.879999",
          longitude: "74.629997",
        },
        Instructions: "",
        files: [],
      },
      {
        _id: uuid(),

        car_name: "Kwid",
        car_type: "Mini SUV",
        status: "pending",

        origin: {
          latitude: "12.120000",
          longitude: "76.680000",
        },
        desitination: {
          latitude: "24.879999",
          longitude: "74.629997",
        },
        Instructions: "Call me  before you reach",
        files: [],
      },
    ],
  };

  componentDidMount() {
    let jobList = JSON.parse(localStorage.getItem("job-list"));
    if (jobList === null) {
      localStorage.setItem("job-list", JSON.stringify(this.state.jobs));
      this.setState({ jobs: this.state.jobs });
    } else {
      this.setState({ jobs: jobList });
    }
  }

  render() {
    let { jobs } = this.state;
    return (
      <div className="site-card-border-less-wrapper">
        <Button onClick={() => this.props.history.push("/add-job")}>
          Add Job
        </Button>
        <Row>
          <Row>
            <JobListing
              {...this.props}
              jobs={jobs}
              OnAddToCart={this.OnAddToCart}
            />
          </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(Job);
