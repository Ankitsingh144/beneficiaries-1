import { Fragment, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"
import ConfirmUpdateModal from "../component/confirmUpdateModal"
import { useDispatch, useSelector } from 'react-redux';
import { AddBeneficiaryAction } from "../store/actions";


const BeneficiaryList = () => {
    const selector = useSelector(state => state);
    console.log('selector ,m', selector.beneficiary)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [deleteModal, setDeleteModal] = useState({})
    const dispatch = useDispatch();


    const handleGoToBeneficiaryPage = () => {
        navigate("/add-beneficiary")
    }
    const handleEditBeneficiaryPage = (accountId) => {
        navigate("/edit-beneficiary/" + accountId)
    }
    const handleViewBeneficiaryPage = (accountId) => {
        navigate("/view-beneficiary/" + accountId)
    }

    const handleDeleteAccount = () => {
        let filteredResult = data?.filter((acc) => acc?.id != deleteModal?.id)
        setData(filteredResult)
        localStorage.setItem("accounts", JSON.stringify(filteredResult))
        setDeleteModal({})
        dispatch(AddBeneficiaryAction(filteredResult));
    }


    useEffect(() => {
        if (selector.beneficiary && selector.beneficiary.length > 0) {

            setData(selector.beneficiary)

        }
    }, [selector.beneficiary])


    useEffect(() => {
        let allAccounts = localStorage.getItem("accounts")
        let allAccountsArr = !!allAccounts ? JSON.parse(allAccounts) : []
        // setData(allAccountsArr)
        console.log(allAccountsArr)
        dispatch(AddBeneficiaryAction(allAccountsArr));

    }, [])


    console.log('')

    return (
        <Fragment>
            <div className="col-md-12 mt-5 mb-5">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={handleGoToBeneficiaryPage}>
                        Add Beneficiary
                    </button>
                </div>

                <table border="1">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Pincode</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!!data && data.length > 0 && data.map((beneficiary, index) => (
                            <tr key={index}>
                                <td>
                                    <button className="btn btn-sm btn-warning"
                                        onClick={() => handleEditBeneficiaryPage(beneficiary?.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger ml-2" onClick={() => setDeleteModal({ isModalOpen: true, ...beneficiary })}>
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-primary ml-2"
                                        onClick={() => handleViewBeneficiaryPage(beneficiary?.id)}>
                                        View
                                    </button>
                                </td>
                                <td>{beneficiary.fullName}</td>
                                <td>{beneficiary.address}</td>
                                <td>{beneficiary.country}</td>
                                <td>{beneficiary.pincode}</td>
                            </tr>
                        ))}
                        {!!data && data.length === 0 &&
                            <h5 className="text-center">
                                No data found
                            </h5>
                        }
                    </tbody>
                </table>
            </div>

            <ConfirmUpdateModal show={deleteModal?.isModalOpen}
                onClose={() => setDeleteModal({})}
                beneficiary={deleteModal}
                onConfirm={() => handleDeleteAccount()} />

        </Fragment>
    )
}

export default BeneficiaryList