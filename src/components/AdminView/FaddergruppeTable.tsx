import React, { useState } from 'react';
import styled from 'styled-components';
import ReactTable, { Column } from 'react-table';
import { Input, Modal } from '@material-ui/core';
import 'react-table/react-table.css';

import axios from '../../utils/axios';
import { Faddergruppe } from '../../store/reducers/admin';

interface FaddergruppeProps {
  faddergrupper: Faddergruppe[];
}

const NyFaddergruppeContainer = styled.div`
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

const NyFaddergruppeModal = ({
  onModalClose,
}: {
  onModalClose: () => void;
}) => {
  const initialState = '';
  const [name, setName] = useState(initialState);

  return (
    <NyFaddergruppeContainer>
      <h1>Ny faddergruppe</h1>
      <label>Navn</label>
      <Input value={name} onChange={e => setName(e.target.value)} />
      <button
        onClick={() => {
          addFaddergruppe(name);
          setName(initialState);
          onModalClose();
        }}
      >
        Lagre
      </button>
    </NyFaddergruppeContainer>
  );
};

// const UpdateFaddergruppeModal = (props: {
//   forening: Forening;
//   onModalClose: () => void;
// }) => {
//   const [forening, setForening] = useState(props.forening);
//   return (
//     <NyFaddergruppeContainer>
//       <h1>Oppdattert forening</h1>

//       <label>Navn</label>
//       <Input
//         value={forening.name}
//         onChange={e => setForening({ ...forening, name: e.target.value })}
//       />

//       <label>Rolle</label>
//       <RoleSelect
//         value={forening.role}
//         onChange={e => setForening({ ...forening, role: e.target.value })}
//       />

//       <label>Passord</label>
//       <Input
//         value={forening.password}
//         onChange={e => setForening({ ...forening, password: e.target.value })}
//       />

//       <button
//         onClick={() => {
//           updateFaddergruppe(forening);
//           props.onModalClose();
//         }}
//       >
//         Lagre
//       </button>
//     </NyFaddergruppeContainer>
//   );
// };

const updateFaddergruppe = (faddergruppe: Faddergruppe) =>
  axios.put('/api/admin/faddergruppe', faddergruppe);
const addFaddergruppe = (name: string) =>
  axios.post('/api/admin/faddergruppe', { name });

const FaddergruppeTable = ({ faddergrupper }: FaddergruppeProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  //   const [foreningUpdate, setForeningUpdate] = useState<number | null>(null);
  const columns: Column<Faddergruppe>[] = [
    { Header: 'Id', accessor: d => d.id, id: 'id' },
    { Header: 'Name', accessor: d => d.name, id: 'name' },
    // {
    //   id: 'edit-button',
    //   accessor: d => d.id,
    //   Cell: ({ value }) => (
    //     <>
    //       {/* <button onClick={() => setForeningUpdate(value)}>Edit</button> */}
    //       {/* <button onClick={() => deleteForening(value)}>Slett</button> */}
    //     </>
    //   ),
    // },
  ];
  return (
    <>
      <h2>Faddergrupper</h2>
      <ReactTable<Faddergruppe>
        columns={columns}
        data={faddergrupper}
        className="-striped"
        showPagination={false}
        pageSize={faddergrupper.length}
        defaultSorted={[{ id: 'id', desc: false }]}
      />

      <button onClick={() => setShowAddModal(true)}>
        Legg til faddergruppe
      </button>
      <Modal open={showAddModal}>
        <NyFaddergruppeModal onModalClose={() => setShowAddModal(false)} />
      </Modal>

      {/* <Modal open={foreningUpdate !== null}>
        <UpdateFaddergruppeModal
          forening={foreninger.find(el => el.id === foreningUpdate)!}
          onModalClose={() => setForeningUpdate(null)}
        />
      </Modal> */}
    </>
  );
};

export default FaddergruppeTable;
