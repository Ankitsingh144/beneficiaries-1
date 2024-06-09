import TYPES from "./types";

export const AddBeneficiaryAction = (payload) => ({
  type: TYPES.ADD_BENEFICIARY,
  payload,
});


export const DeleteBeneficiaryAction = (payload) => ({
  type: TYPES.DELETE_BENEFICIARY,
  payload,
});