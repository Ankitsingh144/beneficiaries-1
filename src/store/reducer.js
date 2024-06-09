import types from "./types";

const initialState = {
  beneficiary: [],

};

const UserBenefiary = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.ADD_BENEFICIARY:
      console.log('action.payload', action.payload)
      return {
        ...state,
        beneficiary: action.payload, // Assuming you want to update userList with the payload
      };

    default:
      return state;
  }
};

export default UserBenefiary;
