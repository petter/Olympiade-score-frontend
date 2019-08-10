import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

import withLogin from '../../hoc/withLogin/withLogin';
import DefaultLoader from '../UI/DefaultLoader/DefaultLoader';
import styles from './AdminView.module.css';
import { RouteComponentProps } from 'react-router';
import toast from '../../utils/toast/toast';
import io from '../../utils/socket/socket';
import axios from '../../utils/axios';
import { Input, Modal } from '@material-ui/core';
import Select from 'react-select/lib/Select';

const socket = io('/admin');

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const TableRow = styled.div`
  width: 100%;
  min-height: 3em;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 1fr 4em;
  grid-column-gap: 1em;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

interface Forening {
  id: number;
  name: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ForeningProps {
  foreninger: Forening[];
  onSubmit: (value: Forening) => void;
  addForening: (data: Pick<Forening, 'name' | 'role'>) => void;
}

const roleOptions = ['admin', 'forening'];
const foreningHeader = ['Id', 'Navn', 'Rolle', 'Passord'];

const RoleSelect = ({
  onChange,
  value,
}: Pick<
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >,
  'onChange' | 'value'
>) => (
  <select value={value} onChange={onChange}>
    {roleOptions.map(val => (
      <option key={val}>{val}</option>
    ))}
  </select>
);

const ForeningTableRow = ({
  forening,
  onSubmit,
}: {
  forening: Forening;
  onSubmit: (value: Forening) => void;
}) => {
  const [values, setValues] = useState({
    name: forening.name,
    role: forening.role,
    password: forening.password,
  });
  const { name, role, password } = values;
  return (
    <TableRow>
      <span>{forening.id}</span>
      <Input
        value={name}
        onChange={e => setValues({ ...values, name: e.target.value })}
      />
      <RoleSelect
        onChange={e => setValues({ ...values, role: e.target.value })}
        value={role}
      />
      <Input
        value={password}
        onChange={e => setValues({ ...values, password: e.target.value })}
      />
      <button
        disabled={
          name === forening.name &&
          role === forening.role &&
          password === forening.password
        }
        onClick={() => onSubmit({ ...forening, ...values })}
      >
        Lagre
      </button>
    </TableRow>
  );
};

const NyForeningContainer = styled.div`
  width: 80%;
  height: 60%;
  margin: auto;
  margin-top: 2em;
  background-color: #eee;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 2em;
  border-radius: 3px;
`;

const NyForeningModal = ({
  onSubmit,
}: {
  onSubmit: (value: Pick<Forening, 'name' | 'role'>) => void;
}) => {
  const [formValues, setFormValues] = useState({ name: '', role: 'forening' });
  return (
    <NyForeningContainer>
      <h1>Dab</h1>
      <span>Navn</span>
      <Input
        value={formValues.name}
        onChange={e => setFormValues({ ...formValues, name: e.target.value })}
      />
      <span>Rolle</span>
      <RoleSelect
        onChange={e => setFormValues({ ...formValues, role: e.target.value })}
        value={formValues.role}
      />
      <button onClick={() => onSubmit(formValues)}>Lagre</button>
    </NyForeningContainer>
  );
};

const ForeningTable = ({
  foreninger,
  onSubmit,
  addForening,
}: ForeningProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <TableContainer>
      <TableRow>
        {foreningHeader.map(val => (
          <span key={val}>
            <strong>{val}</strong>
          </span>
        ))}
      </TableRow>
      {foreninger.map(forening => (
        <ForeningTableRow forening={forening} onSubmit={onSubmit} />
      ))}

      <button onClick={() => setShowModal(true)}>Legg til forening</button>
      <Modal open={showModal}>
        <NyForeningModal
          onSubmit={value => {
            setShowModal(false);
            addForening(value);
          }}
        />
      </Modal>
    </TableContainer>
  );
};

const AdminView = (props: AdminViewProps) => {
  const [foreninger, setForeninger] = useState<Forening[]>([]);

  useEffect(() => {
    axios
      .get('/api/admin/foreninger')
      .then(res => {
        setForeninger(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Configs</h1>
      <ForeningTable
        foreninger={foreninger}
        onSubmit={forening => {
          axios
            .put('/api/admin/forening', forening)
            .then(res => {
              if (!res.data.message) {
                const i = foreninger.findIndex(({ id }) => id === res.data.id);
                const nyForeninger = [...foreninger];
                nyForeninger[i] = res.data;
                if (i !== -1) setForeninger(nyForeninger);
              }
            })
            .catch(err => {
              console.error(err);
            });
        }}
        addForening={(data: { name: string; role: string }) => {
          axios.post('/api/admin/forening', data).then(res => {
            if (res.data.message) return;
            setForeninger([...foreninger, res.data]);
          });
        }}
      />
    </div>
  );
};

// class AdminView extends Component<AdminViewProps> {
//   state: AdminViewState = {
//     loading: false,
//     configs: null,
//   };

//   componentDidMount = () => {
//     // socket.emit('get_configs', (configs: IConfig<any>[]) => {
//     //   this.setState({ configs: configs });
//     // });
//     // socket.on(
//     //   'updated_config',
//     //   ({ config, value }: { config: string; value: any }) => {
//     //     this.setState((state: AdminViewState) => {
//     //       if (state.configs === null) return {};
//     //       const updatedConfigs = state.configs.map(el =>
//     //         el.id === config ? { ...el, value: value } : el
//     //       );
//     //       return { configs: updatedConfigs };
//     //     });
//     //   }
//     // );
//   };

//   updateConfig = (index: number, value: any) => {
//     // this.setState((state: AdminViewState) => {
//     //   if (state.configs === null) return { configs: state.configs };
//     //   const updatedConfigs = [...state.configs];
//     //   updatedConfigs[index] = { ...updatedConfigs[index], value };
//     //   this.props.socket.emit('change_config', {
//     //     config: updatedConfigs[index].id,
//     //     value: value,
//     //   });
//     //   return { configs: updatedConfigs };
//     // });
//   };

//   getControl = (config: IConfig<any>, index: number) => {
//     switch (config.control) {
//       case 'switch':
//         return (
//           <Switch
//             checked={config.value}
//             onChange={(_, checked) => this.updateConfig(index, checked)}
//           />
//         );
//     }
//   };

//   render() {
//     let configContent: JSX.Element | JSX.Element[] = <DefaultLoader />;
//     if (this.state.configs !== null) {
//       configContent = this.state.configs.map((el, i) => {
//         const control = this.getControl(el, i);
//         return (
//           <div className={styles.Row} key={el.id}>
//             <div className={styles.ConfigInfo}>
//               <h3>{el.name}</h3>
//               <p>{el.description}</p>
//             </div>
//             <div className={styles.ConfigControl}>{control}</div>
//           </div>
//         );
//       });
//     }

//     return (
//       <div>
//         <h1>Configs</h1>
//       </div>
//     );
//   }
// }

interface AdminViewProps extends RouteComponentProps {}

interface AdminViewState {}

interface IConfig<T> {
  name: string;
  id: string;
  description: string;
  control: 'switch';
  value: T;
}

export default withLogin(AdminView, ['admin']);
