import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ConfirmUpdateModal from './confirmUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { AddBeneficiaryAction } from "../store/actions";

function AddBeneficiaryModal({ modalShow, setModalShow }) {
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

    console.log('show', modalShow?.modalShow)
    const handleClose = () => {
        setModalShow(false)
    }

    return (
        <>
            <div className={`fixed ${modalShow?.modalShow ? 'show' : 'show'}`}>
                <div className="tripsOtpFormN otpModal">
                    <Fragment>
                        <div className="containerModal">
                            <div className='titleCross'>
                                <h5 className="title">
                                    {existingAccountId ? "Update" : "Add"} Beneficiary
                                </h5>
                                <button
                                    className="close2"
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    X
                                </button>
                            </div>


                            <form onSubmit={handleSubmit(() => setConfirmModal({ isModalOpen: true }))}>
                                <div className="form-group">
                                    <label>Full Name:</label>
                                    <input
                                        type="text"
                                        {...register("fullName", { required: "Full name is required" })}
                                    />
                                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Address:</label>
                                    <input
                                        type="text"
                                        {...register("address", { required: "Address is required" })}
                                    />
                                    {errors.address && <p className="error">{errors.address.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Country:</label>
                                    <select
                                        {...register("country", { required: "Country is required" })}
                                    >
                                        <option value="">Select a country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country && <p className="error">{errors.country.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label>Pincode:</label>
                                    <input
                                        type="text"
                                        {...register("pincode", { required: "Pincode is required" })}
                                    />
                                    {errors.pincode && <p className="error">{errors.pincode.message}</p>}
                                </div>

                                <button type="submit">
                                    {existingAccountId ? "Update" : "Add"} Beneficiary
                                </button>
                            </form>
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

                </div>
            </div>
        </>
    )
}

export default AddBeneficiaryModal