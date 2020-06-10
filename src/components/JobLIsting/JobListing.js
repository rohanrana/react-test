import React from "react";
import { Row } from "antd";
import CardComponent from "../CardComponent/CardComponent";

export default function JobListing(props) {
  let { jobs } = props;
  return (
    <Row>
      {jobs.map((job, index) => {
        return (
          <CardComponent
            key={jobs._id}
            OnAddToCart={props.OnAddToCart}
            job={job}
            {...props}
          ></CardComponent>
        );
      })}
    </Row>
  );
}
