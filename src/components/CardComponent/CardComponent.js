import React from "react";
import { Card, Col, Button, Tag } from "antd";
import Geocode from "react-geocode";
import { GEO_CODE_API_KEY } from "../../constants/common";
Geocode.setApiKey(GEO_CODE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");
const { Meta } = Card;
// import { Link } from "react-router-dom";
export default class CardComponent extends React.Component {
  getAddressFromLatLong = (lat, lang) => {};

  render() {
    let { origin, destination } = this.props.job;
    let props = this.props;
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
    return (
      <Col style={{ marginTop: 10, cursor: "pointer" }} span={8}>
        <Card
          title={props.job.car_name}
          bordered={false}
          actions={[
            <Button
              onClick={() => props.history.push(`/job-detail/${props.job._id}`)}
            >
              View Job
            </Button>,
          ]}
          style={{ width: 300 }}
        >
          <Meta
            style={{ marginTop: 10 }}
            title="Car Type"
            description={`${props.job.car_type}`}
          />
          <Meta
            style={{ marginTop: 10 }}
            title="Status"
            description={`${props.job.status}`}
          />
        </Card>
      </Col>
    );
  }
}
