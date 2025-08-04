import { Avatar, TextField, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import Colors from "../../utils/colors";
import { useSnackbar } from 'notistack'
import { customerAdd } from "../../services/customer.service";
import { showAlert } from "../../utils/customsFunctions";
import { bankAdd } from "../../services/bank.service";

const AddBank = (props) => {
    const {setRefreshData,refreshData,setAddBankModal} = props
    
    const [bankName, setBankName] = useState("")
    const [accountTitle, setAccountTitle] = useState("")
    const [accountNo, setAccountNo] = useState("")
    
    const [loading, setLoading] = useState(false)
    const email = sessionStorage.getItem("email")

    const bankAddData = async()=>{
        try{
            if(!bankName?.trim()) throw "Please Enter  Bank Name"
            if(!accountTitle?.trim()) throw "Please Enter Account title"
            if(!accountNo?.trim()) throw "Please Enter Account No"
           
    
            setLoading(true)
            const response =await bankAdd(email,bankName,accountTitle,accountNo)
    
            if(response?.data?.status == 200)
            {
                setLoading(false);
                setRefreshData(!refreshData)
                showAlert(response.data.message,"success")
                setAddBankModal(false)
    
    
            }else{
                setLoading(false);
            
                showAlert(response.data.message,"error");
            }
    
    
        }catch(err)
        {
            setLoading(false);
            
              if (err.response) {
                showAlert(err.response.data.message?.toString(),"error");
              } else if (err.message) {
                showAlert(err.message,"error");
              } else if (err) {
                showAlert(err,"error");
              }
    
        }
    }
    


    return (
    <div>
        
        <div className="grid grid-cols-1 mt-4">
            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Bank Name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>

            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Account Title"
                    value={accountTitle}
                    onChange={(e) => setAccountTitle(e.target.value)}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>

            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Account No"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>
            <div className="mb-3">
                <Button className="fw-bold"
                    onClick={()=>bankAddData()}
                    disabled={loading}
                    sx={{ backgroundColor: Colors.customer.buttonColor }} fullWidth variant="contained" >Submit</Button>

            </div>

        </div>
    </div>)

}

export default AddBank