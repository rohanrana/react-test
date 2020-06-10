import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainApp from "../App";

import NotFound from "../containers/404/404";
import { authCheckState } from "../redux/actions";
import { connect } from "react-redux";
import Job from "../containers/Job/Job";
import JobDetail from "../containers/JobDetail/JobDetail";
import MapView from "../containers/MapView/MapView";
import AddJobForm from "../containers/AddJobForm/AddJobForm";
class Root extends Component {
  componentDidMount() {
    this.props.OnAutoSignIn();
  }

  render() {
    const RestrictedRoutes = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          !this.props.isAuthenticated ? (
            <Component />
          ) : (
            // <Component {...props} />
            <Redirect to={"/"} />
          )
        }
      />
    );
    const MustAuthenticatedRoutes = ({
      component: Component,
      parent: Parent,
      ...rest
    }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.isAuthenticated ? (
            Parent ? (
              <Parent>
                <Component {...props} {...rest} />
              </Parent>
            ) : (
              <Component {...props} />
            )
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    );
    return (
      <Router>
        <MainApp>
          <Switch>
            <Route exact path="/" component={Job} />
            <Route exact path="/job-detail/:_id" component={JobDetail} />
            <Route exact path="/add-job" component={AddJobForm} />

            <Route exact path="/mapview/:_id" component={MapView} />

            <Route path="*" component={NotFound} />
          </Switch>
        </MainApp>
      </Router>
    );
  }
}
const mapStateToProps = ({ auth, commonData }) => {
  return {
    isAuthenticated: auth.userData != null || false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    OnAutoSignIn: () => dispatch(authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
