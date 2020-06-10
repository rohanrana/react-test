import React, { Component } from "react";

import { Link } from "react-router-dom";
import TextInput from "../../components/InputComponent/TextInput";
import { ValidateInput } from "./validateJobForm";
import ValidationErrorComponent from "../../components/ValidationErrorComponent/ValidationErrorComponent";
import { withRouter } from "react-router-dom";
import OpenNotification from "../../components/OpenNotification";
import { Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Geocoder from "react-mapbox-gl-geocoder";
import { uuid } from "uuidv4";
const { Option } = Select;
const mapAccess = {
  mapboxApiAccessToken:
    "pk.eyJ1Ijoicm9oYW4xNjEwNyIsImEiOiJja2I5Y3U5N3owY3ZuMnpyeHVwM3luZHRnIn0.L6smXi7PF_bsHumMEBT1Iw",
};

const mapStyle = {
  width: "100%",
  height: 600,
};

const queryParams = {
  country: "in",
};
class AddJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_name: "",
      viewport: {},
      car_type: "",
      origin: "",
      destination: "",
      instructions: "",
    };
  }
  handleChange = (e) => {
    let errors = null;

    this.setState(
      { [e.target.name]: e.target.value, errors: errors },
      () => {}
    );
  };
  onSelectedOrigin = (viewport, item) => {
    let { latitude, longitude } = viewport;
    this.setState({
      origin: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };
  onSelectedDestination = (viewport, item) => {
    let { latitude, longitude } = viewport;
    this.setState({ viewport });
    this.setState({
      destination: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };
  handleDropdown = (value) => {
    this.setState({ car_type: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      car_name: this.state.car_name,
      car_type: this.state.car_type,
      origin: this.state.origin,
      destination: this.state.destination,
    };

    const errors = ValidateInput(data);
    if (!errors.isValid) {
      this.setState({ errors: errors.errors, adding: false });
    } else {
      let data = {
        car_name: this.state.car_name,
        car_type: this.state.car_type,
        origin: this.state.origin,
        destination: this.state.destination,
        instructions: this.state.instructions,
        files: [],
        _id: uuid(),
        status: "pending",
      };

      let JobsData = JSON.parse(localStorage.getItem("job-list"));
      if (JobsData) {
        JobsData.push(data);
        localStorage.setItem("job-list", JSON.stringify(JobsData));
        OpenNotification({ title: "Added Job Successfully", type: "success" });
        this.props.history.push("/");
      } else {
        let jobData = [data];
        localStorage.setItem("job-list", JSON.stringify(jobData));
        OpenNotification({ title: "Added Job Successfully", type: "success" });
        this.props.history.push("/");
      }
    }
  };

  render() {
    let {
      errors,
      instructions,
      car_name,
      car_type,
      origin,
      destination,
      loading,
      viewport,
    } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-wrapper">
          <div>
            {/* --- INPUTS USED HERE ARE REUSABLE COMPONENT--- */}
            <TextInput
              placeholder="Car Name"
              name={"car_name"}
              value={car_name}
              className="lgn-input-field"
              handleChange={this.handleChange}
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.car_name}
                className="validation-error"
              />
            )}
            <Select
              showSearch
              //   style={{ width: 200 }}
              style={{
                width: "100%",
                marginTop: 21,
              }}
              onChange={this.handleDropdown}
              placeholder="Select a Car Type"
              className="lgn-input-field"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="small">small</Option>
              <Option value="medium">medium</Option>
              <Option value="large">large</Option>
            </Select>

            {errors && (
              <ValidationErrorComponent
                message={errors.car_type}
                className="validation-error"
              />
            )}
            <TextArea
              placeholder="Instructions"
              name={"instructions"}
              style={{ marginTop: 21 }}
              value={instructions}
              className="lgn-input-field"
              onChange={this.handleChange}
            />

            <br />
            <lable>Origin</lable>
            <Geocoder
              {...mapAccess}
              onSelected={this.onSelectedOrigin}
              hideOnSelect={true}
              placeholder="Select Origin"
              queryParams={queryParams}
              className="geocoder"
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.origin}
                className="validation-error"
              />
            )}
            <br />
            <lable>Destination</lable>
            <Geocoder
              {...mapAccess}
              onSelected={this.onSelectedDestination}
              placeholder="Select Destnation"
              viewport={viewport}
              hideOnSelect={true}
              queryParams={queryParams}
              className="geocoder"
            />
            {errors && (
              <ValidationErrorComponent
                message={errors.destination}
                className="validation-error"
              />
            )}
          </div>
          <div className="login-btn-wrapper">
            <button
              //   style={{ background: "white", color: "black" }}
              disabled={loading}
              className="btn-login"
              onClick={this.handleSubmit}
            >
              {loading ? "Loading..." : "Add Job"}
            </button>
            <Link to="/">Go to All Jobs</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddJobForm);
