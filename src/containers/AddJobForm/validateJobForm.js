import validator from "validator";
import isEmpty from "lodash/isEmpty";

export function ValidateInput(data) {
  let errors = {};

  console.log("Email", data);
  if (data.car_name !== undefined && validator.isEmpty(data.car_name)) {
    errors.car_name = "Car Name is required";
  }

  if (data.car_type !== undefined && validator.isEmpty(data.car_type)) {
    errors.car_type = "Car type is required";
  }
  if (data.origin !== undefined && isEmpty(data.origin)) {
    errors.origin = "Origin is required";
  }

  if (data.destination !== undefined && isEmpty(data.destination)) {
    errors.destination = "Destination is required";
  }
  return { errors, isValid: isEmpty(errors) };
}
