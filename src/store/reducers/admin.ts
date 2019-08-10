import { AdminActions } from '../actions/admin';

export interface Forening {
  id: number;
  name: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminState {
  foreninger: Forening[];
}

const initialState: AdminState = {
  foreninger: [],
};

const updateForening = (state: AdminState, payload: Forening) => {
  return {
    ...state,
    foreninger: state.foreninger.map(forening =>
      forening.id === payload.id ? payload : forening
    ),
  };
};

const reducer = (state = initialState, action: AdminActions) => {
  switch (action.type) {
    case 'admin/setForeninger':
      return {
        ...state,
        foreninger: action.payload,
      };
    case 'admin/addForening':
      return {
        ...state,
        foreninger: [...state.foreninger, action.payload],
      };
    case 'admin/updateForening':
      return updateForening(state, action.payload);
  }
};

export default reducer;
