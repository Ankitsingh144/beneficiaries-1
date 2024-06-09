import { Fragment, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ViewBeneficiary = () => {
    const navigate = useNavigate()
    const params = useParams()
    const existingAccountId = params?.accountId;

    const [data, setData] = useState([])

    useEffect(() => {
        if (!!existingAccountId) {
            const previousData = localStorage.getItem("accounts")
            const allAccountsArr = !!previousData ? JSON.parse(previousData) : [];
            let filteredAccount = allAccountsArr?.find((acc) => acc?.id == existingAccountId)
            setData(filteredAccount)
        }
    }, [existingAccountId])
    return (
        <Fragment>
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="card">
                    <h5 className="alert alert-info">
                        View Beneficiary
                    </h5>
                    <div className="grid2">
                        <div className="fieldName">Name</div>
                        <div className="fieldValue">{data?.fullName}</div>
                    </div>
                    <div className="grid2">
                        <div className="fieldName">address</div>
                        <div className="fieldValue">{data?.address}</div>
                    </div>
                    <div className="grid2">
                        <div className="fieldName">Country</div>
                        <div className="fieldValue">{data?.country}</div>
                    </div>
                    <div className="grid2">
                        <div className="fieldName">Pin Code</div>
                        <div className="fieldValue">{data?.pincode}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewBeneficiary