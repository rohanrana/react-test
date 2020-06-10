import React, { Component } from "react";
import ReactMapboxGl, { Layer, Marker } from "react-mapbox-gl";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoicm9oYW4xNjEwNyIsImEiOiJja2I5Y3U5N3owY3ZuMnpyeHVwM3luZHRnIn0.L6smXi7PF_bsHumMEBT1Iw",
});
class MapView extends Component {
  state = {
    job_detail: null,
    allJobs: [],
    job_id: null,
  };
  componentDidMount() {
    let JobsData = JSON.parse(localStorage.getItem("job-list"));
    let id = this.props.match.params._id;

    console.log("ID", id, JobsData);
    this.setState({ allJobs: JobsData, job_id: id });
    if (id) {
      let job_detail = JobsData.find((d) => d._id === id);
      this.setState({ job_detail });
    }
  }
  render() {
    let { job_detail } = this.state;
    // if (job_detail) {
    //   console.log(
    //     "CORDINATS",
    //     job_detail.desitination.latitude,
    //     job_detail.desitination.longitude
    //   );
    // }
    return (
      <div>
        {job_detail && (
          <Map
            style={"mapbox://styles/mapbox/streets-v9"}
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
            zoom={[7]}
            center={[job_detail.origin.longitude, job_detail.origin.latitude]}
          >
            <Marker
              coordinates={[
                job_detail.origin.longitude,
                job_detail.origin.latitude,
              ]}
              anchor="bottom"
            >
              <img
                style={{ height: 65 }}
                src={
                  "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                }
                alt=""
              />
            </Marker>
          </Map>
        )}
        ;
      </div>
    );
  }
}
export default withRouter(MapView);
