import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";

import withLogin from "../../hoc/withLogin/withLogin";
import DefaultLoader from "../UI/DefaultLoader/DefaultLoader";
import styles from "./AdminView.module.css";
import { RouteComponentProps } from "react-router";
import toast from "../../utils/toast/toast";

class AdminView extends Component<AdminViewProps> {
  state: AdminViewState = {
    loading: false,
    configs: null
  };

  componentDidMount = () => {
    const { socket } = this.props;
    socket.emit("get_configs", (configs: IConfig<any>[]) => {
      this.setState({ configs: configs });
    });

    socket.on(
      "updated_config",
      ({ config, value }: { config: string; value: any }) => {
        this.setState((state: AdminViewState) => {
          if (state.configs === null) return {};
          const updatedConfigs = state.configs.map(el =>
            el.id === config ? { ...el, value: value } : el
          );
          return { configs: updatedConfigs };
        });
      }
    );
  };

  updateConfig = (index: number, value: any) => {
    this.setState((state: AdminViewState) => {
      if (state.configs === null) return { configs: state.configs };

      const updatedConfigs = [...state.configs];
      updatedConfigs[index] = { ...updatedConfigs[index], value };

      this.props.socket.emit("change_config", {
        config: updatedConfigs[index].id,
        value: value
      });
      return { configs: updatedConfigs };
    });
  };

  getControl = (config: IConfig<any>, index: number) => {
    switch (config.control) {
      case "switch":
        return (
          <Switch
            checked={config.value}
            onChange={(_, checked) => this.updateConfig(index, checked)}
          />
        );
    }
  };

  render() {
    let configContent: JSX.Element | JSX.Element[] = <DefaultLoader />;
    if (this.state.configs !== null) {
      configContent = this.state.configs.map((el, i) => {
        const control = this.getControl(el, i);
        return (
          <div className={styles.Row} key={el.id}>
            <div className={styles.ConfigInfo}>
              <h3>{el.name}</h3>
              <p>{el.description}</p>
            </div>
            <div className={styles.ConfigControl}>{control}</div>
          </div>
        );
      });
    }

    return (
      <div>
        <h1>Configs</h1>
        {configContent}
      </div>
    );
  }
}

interface AdminViewProps extends RouteComponentProps {
  socket: SocketIOClient.Socket;
}

interface AdminViewState {
  loading: boolean;
  configs: IConfig<any>[] | null;
}

interface IConfig<T> {
  name: string;
  id: string;
  description: string;
  control: "switch";
  value: T;
}

export default withLogin(AdminView, ["admin"]);
