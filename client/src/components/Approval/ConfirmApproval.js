import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import "./ConfirmApproval.css"
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from "@material-ui/icons/Public";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';import { Country, State } from "country-state-city";
import MetaData from "../../component/layout/Metadata"
import { saveApprovalInfo } from '../../actions/approvalAction';
import ConfirmApprovalSteps from './ConfirmApprovalSteps.js'



const ConfirmApproval = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { approvalInfo } = useSelector((state) => state.approval);

    const [outSourcer, setoutSourcer] = useState(approvalInfo.outSourcer);
    const [department, setDepartment] = useState(approvalInfo.department);
    const [state, setState] = useState(approvalInfo.state);
    const [country, setCountry] = useState(approvalInfo.country);

    const ApprovalSubmit =()=>{
        dispatch(saveApprovalInfo({outSourcer ,department ,country , state}));
          history.push("/approval/confirm");
    }

  return (
    <Fragment>
        <MetaData title="Tester Details" />
        <ConfirmApprovalSteps activeStep={0} />


        <div className="confirmApprovalContainer">
        <div className="confirmApprovalBox">
            <h2 className="confirmApprovalHeading">Tester Details</h2>

            <form
            className="confirmApprovalForm"
            encType="multipart/form-data"
            onSubmit={ApprovalSubmit}
            >
            <div>
                <BusinessIcon />
                <input
                type="text"
                placeholder="Out Sourcing Testing Company"
                required
                value={outSourcer}
                onChange={(e) => setoutSourcer(e.target.value)}
                />
            </div>

            <div>
                <BadgeIcon />
                <input
                type="text"
                placeholder="Department"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <AddLocationAltIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            

            <input
                type="submit"
                value="Continue"
                className="confirmApprovalBtn"
                disabled={false}
            />
            </form>
        </div>
        </div>
  </Fragment>
  )
}

export default ConfirmApproval