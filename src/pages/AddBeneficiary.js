import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ConfirmUpdateModal from "../component/confirmUpdateModal";
import { useDispatch, useSelector } from 'react-redux';
import { AddBeneficiaryAction } from "../store/actions";

const AddBeneficiary = () => {
    const selector = useSelector(state => state);
    console.log('selector', selector.beneficiary)

    const dispatch = useDispatch();
    const params = useParams();
    const existingAccountId = params?.accountId;
    const navigate = useNavigate();
    const [confirmModal, setConfirmModal] = useState({});
    const countries = ["USA", "Canada", "UK", "Australia", "India"];

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        defaultValues: {
            id: '',
            fullName: '',
            address: '',
            country: '',
            pincode: '',
        }
    });

    useEffect(() => {
        if (existingAccountId) {
            const previousData = localStorage.getItem("accounts");
            const allAccountsArr = previousData ? JSON.parse(previousData) : [];
            const filteredAccount = allAccountsArr.find((acc) => acc?.id == existingAccountId);
            if (filteredAccount) {
                reset(filteredAccount);
            }
        }
    }, [existingAccountId, reset]);

    const handleAddBeneficiary = (data) => {
        const previousData = localStorage.getItem("accounts");
        const previousDataArr = previousData ? JSON.parse(previousData) : [];
        let updatedAccounts = [];

        if (existingAccountId) {
            updatedAccounts = previousDataArr.map((acc) => acc?.id == existingAccountId ? data : acc);
        } else {
            updatedAccounts = [...previousDataArr, data];
        }
        dispatch(AddBeneficiaryAction(updatedAccounts));

        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    };

    const onSubmit = (data) => {
        if (existingAccountId) {
            handleAddBeneficiary(data);
        } else {
            data.id = new Date().getTime();
            handleAddBeneficiary(data);
        }
        reset({ id: '', fullName: '', address: '', country: '', pincode: '' });
        navigate("/");
    };

    return (
        <Fragment>
            <div className="col-md-6 offset-md-3 text-left mt-5">
                <div className="card p-5">
                    <h5 className="text-left alert alert-info">
                        {existingAccountId ? "Update" : "Add"} Beneficiary
                    </h5>

                    <form onSubmit={handleSubmit(() => setConfirmModal({ isModalOpen: true }))}>
                        <div className="mt-4">
                            <label>Full Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("fullName", { required: "Full name is required" })}
                            />
                            {errors.fullName && <p className="text-danger mb-0">{errors.fullName.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label>Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className="text-danger mb-0">{errors.address.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label>Country:</label>
                            <select
                                className="form-control"
                                {...register("country", { required: "Country is required" })}
                            >
                                <option value="">Select a country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            {errors.country && <p className="text-danger mb-0">{errors.country.message}</p>}
                        </div>

                        <div className="mt-4">
                            <label>Pincode:</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("pincode", { required: "Pincode is required" })}
                            />
                            {errors.pincode && <p className="text-danger mb-0">{errors.pincode.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-block btn-primary mt-4">
                            {existingAccountId ? "Update" : "Add"} Beneficiary
                        </button>
                    </form>
                </div>
            </div>

            <ConfirmUpdateModal
                confirmBtnName={`${existingAccountId ? "Update" : "Add"}`}
                title={`Are you sure you want to ${existingAccountId ? "Update" : "Add"}`}
                show={confirmModal.isModalOpen}
                onClose={() => setConfirmModal({})}
                beneficiary={confirmModal}
                onConfirm={handleSubmit(onSubmit)}
            />
        </Fragment>
    );
};

export default AddBeneficiary;
