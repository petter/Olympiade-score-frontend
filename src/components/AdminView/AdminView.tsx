import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';

import withLogin from '../../hoc/withLogin/withLogin';
import { RouteComponentProps } from 'react-router';
import toast from '../../utils/toast/toast';
import io from '../../utils/socket/socket';
import axios from '../../utils/axios';
import { Input, Modal } from '@material-ui/core';
import { Forening, Faddergruppe } from '../../store/reducers/admin';
import { connect } from 'react-redux';
import { State } from '../../store/reducers';
import { Dispatch } from 'redux';
import {
  setForeninger,
  updateForening,
  addForening,
} from '../../store/actions/admin';
import ForeningTable from './ForeningTable';
import FaddergruppeTable from './FaddergruppeTable';

const socket = io('/admin');

const AdminView = ({
  foreninger,
  faddergrupper,
  updateForening,
  setForeninger,
  addForening,
}: AdminViewProps) => {
  useEffect(() => {
    socket.emit('forening_request', setForeninger);
    socket.on('forening_update', updateForening);
    socket.on('forening_new', addForening);
  }, []);

  return (
    <div>
      <h1>Configs</h1>
      <ForeningTable foreninger={foreninger} />
      <FaddergruppeTable faddergrupper={faddergrupper} />
    </div>
  );
};

interface StateProps {
  foreninger: Forening[];
  faddergrupper: Faddergruppe[];
}

interface DispatchProps {
  setForeninger: (foreninger: Forening[]) => void;
  updateForening: (forening: Forening) => void;
  addForening: (forening: Forening) => void;
}

interface OwnProps {}

type AdminViewProps = StateProps &
  DispatchProps &
  OwnProps &
  RouteComponentProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    foreninger: state.admin.foreninger,
    faddergrupper: state.groups.map(({ name, id }) => ({
      id: parseInt(id),
      name,
    })),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setForeninger: foreninger => dispatch(setForeninger(foreninger)),
    updateForening: forening => dispatch(updateForening(forening)),
    addForening: forening => dispatch(addForening(forening)),
  };
};

export default withLogin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminView),
  ['admin']
);
