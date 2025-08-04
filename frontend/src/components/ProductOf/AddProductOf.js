import { Avatar, TextField, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import Colors from "../../utils/colors";
import { useSnackbar } from 'notistack'

import { productOfAdd } from "../../services/productOf.service";
import { showAlert } from "../../utils/customsFunctions";

const AddProductOf = (props) => {
    const {setRefreshData,refreshData,setAddProductOfModal} = props
    const { enqueueSnackbar } = useSnackbar();
    const [profilePicture, setProfilePicture] = useState("")
    const [name, setName] = useState("")
    const [cnic, setCNIC] = useState("")
    const [contactNo, setContactNo] = useState("")
    const imageRef = useRef()
    const [loading, setLoading] = useState(false)
    const email = sessionStorage.getItem("email")

    const productOfAddData = async()=>{
        try{
            if(!name?.trim()) throw "Please Enter  Name"
            if(!cnic?.trim()) throw "Please Enter CNIC"
            if(!contactNo?.trim()) throw "Please Enter Contact No"
           
    
            setLoading(true)
            const response =await productOfAdd(email,name,cnic,profilePicture,contactNo)
    
            if(response?.data?.status == 200)
            {
                setLoading(false);
                setRefreshData(!refreshData)
                showAlert(response.data.message,"success")
                setAddProductOfModal(false)
    
    
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
    
 

    return (<div>
        <div className=" flex justify-center">
            <Avatar sx={{ width: '120px', height: '120px' }} src={profilePicture} className=" cursor-pointer" onClick={() => imageRef?.current?.click()} />
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(event) => {
                    try {
                        const reader = new FileReader()
                        reader.readAsDataURL(event.target.files[0])
                        reader.onloadend = () => {
                            setProfilePicture(reader.result)
                        }

                        event.target.value = null
                    } catch (err) {
                        console.log(err);
                    }
                }}
                ref={imageRef}
                style={{ display: "none" }}
            />

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
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>

            <div className="mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Contact No"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    sx={{ color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}
                />
            </div>
            <div className="mb-3">
                <Button className="fw-bold"
                    onClick={()=>productOfAddData()}
                    disabled={loading}
                    sx={{ backgroundColor: Colors.customer.buttonColor }} fullWidth variant="contained" >Submit</Button>

            </div>

        </div>
    </div>)

}

export default AddProductOf