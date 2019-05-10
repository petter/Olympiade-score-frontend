import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link, RouteComponentProps } from "react-router-dom";
import io from "../../utils/socket/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { State } from "../../store/reducers";
import * as groupActions from "../../store/actions/groups";
import DevTools from "../DevTools/DevTools";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import styles from "./Root.module.css";
import { GroupState } from "../../store/reducers/groups";

import RouteWithSubRoutes from "../../hoc/RouteWithSubRoutes/RouteWithSubRoutes";
import { IThemeStateItem } from "../../store/reducers/themes";

const ScoreSubmission = React.lazy(() =>
  import("../../components/ScoreSubmission/ScoreSubmission")
);
const GroupView = React.lazy(() =>
  import("../../components/GroupView/GroupView")
);
const AdminView = React.lazy(() =>
  import("../../components/AdminView/AdminView")
);

class Root extends Component<RootProps> {
  state = {
    socket: null
  };

  componentDidMount = () => {
    const socket = io();
    socket.on("connect", () => console.log("connected"));
    socket.on("disconnect", () => console.log("disconnected"));
    socket.on("group_set", (groups: GroupState[]) =>
      this.props.setGroups(groups)
    );
    socket.on(
      "group_score",
      ({ group, points }: { group: string; points: number }) =>
        this.props.addScore(group, points)
    );
    //socket.emit('groups', this.props.groups); // Used to provide backend with dummydata
    socket.emit("group_request", (groups: GroupState[]) =>
      this.props.setGroups(groups)
    );
    this.setState({ socket: socket });
  };

  render() {
    // Style body
    document.body.style.backgroundColor = this.props.theme.background;
    document.body.style.color = this.props.theme.backgroundText;

    const routes = [
      {
        path: "/submit",
        component: ScoreSubmission,
        async: true,
        exact: true
      },
      {
        path: "/admin",
        component: AdminView,
        async: true,
        exact: true
      },
      {
        path: "/group/:id",
        component: GroupView,
        async: true,
        exact: true
      },
      {
        path: "/",
        component: Leaderboard,
        exact: true
      }
    ];
    return (
      <>
        <div className={styles.Container}>
          <Switch>
            {routes.map((el, i) => {
              return <RouteWithSubRoutes key={i} {...el} />;
            })}
            >
          </Switch>
        </div>

        <ToastContainer
          closeOnClick={true}
          pauseOnFocusLoss={false}
          autoClose={5000}
          hideProgressBar
          position="top-right"
          closeButton={false}
        />
        <DevTools />
      </>
    );
  }
}

interface RootProps {
  setGroups(groups: GroupState[]): void;
  setScore(id: string, value: number): void;
  addScore(id: string, value: number): void;
  groups: GroupState[];
  theme: IThemeStateItem;
}

const mapStateToProps = (state: State) => {
  return {
    groups: state.groups,
    theme: state.themes.themes[state.themes.active]
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setGroups: (groups: GroupState[]) =>
      dispatch(groupActions.setGroups(groups)),
    setScore: (id: string, value: number) =>
      dispatch(groupActions.setScore({ id: id, value: value })),
    addScore: (id: string, value: number) =>
      dispatch(groupActions.addScore({ id: id, value: value }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
