import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTable, { Column } from 'react-table';
import 'react-table/react-table.css';
import { Input, Modal } from '@material-ui/core';

import axios from '../../utils/axios';
import { Forening } from '../../store/reducers/admin';

interface ForeningProps {
  foreninger: Forening[];
}

const roleOptions = ['admin', 'forening'];

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

const NyForeningContainer = styled.div`
  width: 80%;
  height: 60%;
  margin: auto;
  margin-top: 2em;
  background-color: #eee;
  display: flex;
  flex-flow: column;
  padding: 2em;
  border-radius: 3px;
`;

const NyForeningModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const initialState = { name: '', role: 'forening' };
  const [formValues, setFormValues] = useState(initialState);

  return (
    <NyForeningContainer>
      <h1>Ny forening</h1>
      <label>Navn</label>
      <Input
        value={formValues.name}
        onChange={e => setFormValues({ ...formValues, name: e.target.value })}
      />
      <label>Rolle</label>
      <RoleSelect
        onChange={e => setFormValues({ ...formValues, role: e.target.value })}
        value={formValues.role}
      />
      <button
        onClick={() => {
          addForening(formValues);
          setFormValues(initialState);
          onModalClose();
        }}
      >
        Lagre
      </button>
    </NyForeningContainer>
  );
};

const UpdateForeningModal = (props: {
  forening: Forening;
  onModalClose: () => void;
}) => {
  const [forening, setForening] = useState(props.forening);
  return (
    <NyForeningContainer>
      <h1>Oppdattert forening</h1>

      <label>Navn</label>
      <Input
        value={forening.name}
        onChange={e => setForening({ ...forening, name: e.target.value })}
      />

      <label>Rolle</label>
      <RoleSelect
        value={forening.role}
        onChange={e => setForening({ ...forening, role: e.target.value })}
      />

      <label>Passord</label>
      <Input
        value={forening.password}
        onChange={e => setForening({ ...forening, password: e.target.value })}
      />

      <button
        onClick={() => {
          updateForening(forening);
          props.onModalClose();
        }}
      >
        Lagre
      </button>
    </NyForeningContainer>
  );
};

const updateForening = (forening: Forening) =>
  axios.put('/api/admin/forening', forening);
const addForening = (forening: Pick<Forening, 'name' | 'role'>) =>
  axios.post('/api/admin/forening', forening);
const deleteForening = (id: number) => axios.delete('/api/admin/forening');

const ForeningTable = ({ foreninger }: ForeningProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [foreningUpdate, setForeningUpdate] = useState<number | null>(null);
  const columns: Column<Forening>[] = [
    { Header: 'Id', accessor: d => d.id, id: 'id' },
    { Header: 'Name', accessor: d => d.name, id: 'name' },
    { Header: 'Rolle', accessor: d => d.role, id: 'rolle' },
    { Header: 'Passord', accessor: d => d.password, id: 'passord' },
    {
      id: 'edit-button',
      accessor: d => d.id,
      Cell: ({ value }) => (
        <>
          <button onClick={() => setForeningUpdate(value)}>Edit</button>
          <button onClick={() => deleteForening(value)}>Slett</button>
        </>
      ),
    },
  ];
  return (
    <>
      <h2>Foreninger</h2>
      <ReactTable<Forening>
        columns={columns}
        data={foreninger}
        className="-striped"
        showPagination={false}
        pageSize={foreninger.length}
        defaultSorted={[{ id: 'id', desc: false }]}
      />

      <button onClick={() => setShowAddModal(true)}>Legg til forening</button>
      <Modal open={showAddModal}>
        <NyForeningModal onModalClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal open={foreningUpdate !== null}>
        <UpdateForeningModal
          forening={foreninger.find(el => el.id === foreningUpdate)!}
          onModalClose={() => setForeningUpdate(null)}
        />
      </Modal>
    </>
  );
};

export default ForeningTable;
