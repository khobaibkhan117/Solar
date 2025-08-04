import { Avatar, TextField, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import Colors from "../../utils/colors";
import { useSnackbar } from 'notistack'
import { customerAdd } from "../../services/customer.service";


const ViewCustomer = (props) => {
    
    const { data } = props;
    const [profilePicture, setProfilePicture] = useState(data.profile_picture || "")
    const [name, setName] = useState(data.name || "")
    const [cnic, setCNIC] = useState(data.cnic || "")
    const [conactNo, setContactNo] = useState(data.contact_no || "")
  
   

    return (<div>
        <div className=" flex justify-center">
            <Avatar sx={{ width: '120px', height: '120px' }} src={profilePicture}  />
            

        </div>
        <div className="grid grid-cols-1 mt-4">
            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{readOnly : true}}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>

            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="CNIC"
                    value={cnic}
                    onChange={(e) => setCNIC(e.target.value)}
                    inputProps={{readOnly : true}}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>

            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Contact No"
                    value={conactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    inputProps={{readOnly : true}}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>
           

        </div>
    </div>)

}

export default ViewCustomer