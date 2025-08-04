

import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/colors";
import { showAlert } from "../../utils/customsFunctions";
import { addSite } from "../../services/site.service";
import { getAllUsers } from "../../services/auth.service";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const AddSite = (props) => {
    const { setModalFlag, modalFlag, refreshData, setRefreshData } = props
    const email = sessionStorage.getItem("email")
    const [addSiteFields, setAddSiteFields] = useState({
        name: "",
        description: "",
        contact_number: "",
        address: "",
        budget: 0,
        assignee: [],
        expense: [],
        status: true
    })
    const [allUsers, setAllusers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            const response = await getAllUsers(email)
            if (response.data.status == 200) {
                setAllusers(response.data.data)
            }
        } catch (error) {
        }
    }

    const siteAddData = async () => {
        try {

            setLoading(true)
            const response = await addSite(email, addSiteFields.name, addSiteFields.description, addSiteFields.contact_number, parseInt(addSiteFields.budget || "0"), addSiteFields.address, addSiteFields.assignee?.map((item) => item._id))

            if (response?.data?.status == 200) {
                setLoading(false);
                setRefreshData(!refreshData)
                showAlert(response.data.message, "success")
                setModalFlag({ ...modalFlag, add: false })


            } else {
                setLoading(false);

                showAlert(response.data.message, "error");
            }


        } catch (err) {
            setLoading(false);

            if (err.response) {
                showAlert(err.response.data.message?.toString(), "error");
            } else if (err.message) {
                showAlert(err.message, "error");
            } else if (err) {
                showAlert(err, "error");
            }

        }
    }
    return (
        <div>
            <div className="mb-3">
                <TextField
                    label="Name"
                    margin="none"
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: Colors.inventory.borderColor,
                        input: {
                            "&::placeholder": {
                                color: Colors.inventory.placeHolderColor,
                            },
                        },
                    }}
                    onChange={(e) => {
                        setAddSiteFields({ ...addSiteFields, name: e.target.value });
                    }}
                    value={addSiteFields.name}
                />
            </div>
            <div className="mb-3">
                <TextField
                    label="Contact Number"
                    margin="none"
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: Colors.inventory.borderColor,
                        input: {
                            "&::placeholder": {
                                color: Colors.inventory.placeHolderColor,
                            },
                        },
                    }}
                    onChange={(e) => {
                        setAddSiteFields({ ...addSiteFields, contact_number: e.target.value });
                    }}
                    value={addSiteFields.contact_number}
                />
            </div>
            <div className="mb-3">
                <TextField
                    label="Address"
                    multiline
                    margin="none"
                    rows={3}
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: Colors.inventory.borderColor,
                        input: {
                            "&::placeholder": {
                                color: Colors.inventory.placeHolderColor,
                            },
                        },
                    }}
                    onChange={(e) => {
                        setAddSiteFields({ ...addSiteFields, address: e.target.value });
                    }}
                    value={addSiteFields.address}
                />
            </div>
            <div className="mb-3">
                <TextField
                    label="Budget"
                    margin="none"
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: Colors.inventory.borderColor,
                        input: {
                            "&::placeholder": {
                                color: Colors.inventory.placeHolderColor,
                            },
                        },
                    }}
                    onChange={(e) => {
                        setAddSiteFields({ ...addSiteFields, budget: e.target.value?.replace(/[^0-9]/gi, "") });
                    }}
                    value={addSiteFields.budget || ""}
                />
            </div>
            <div className="mb-3">

                <TextField
                    label="Description"
                    multiline
                    margin="none"
                    fullWidth
                    size="small"
                    rows={3}
                    variant="outlined"
                    sx={{
                        borderColor: Colors.inventory.borderColor,
                        input: {
                            "&::placeholder": {
                                color: Colors.inventory.placeHolderColor,
                            },
                        },
                    }}
                    onChange={(e) => {
                        setAddSiteFields({ ...addSiteFields, description: e.target.value });
                    }}
                    value={addSiteFields.description}
                />


            </div>
            <div className="mb-3">
                <Autocomplete
                    disableClearable={!addSiteFields.assignee}
                    size="small"
                    filterSelectedOptions
                    sx={{
                        width: "100%",
                    }}
                    options={
                        !allUsers
                            ? [{ name: "Loading...", id: 0 }]
                            : allUsers
                    }
                    multiple
                    getOptionLabel={(option) => `${option?.name} (${option?.email})` || ""}

                    value={addSiteFields.assignee || []}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Name"
                            margin="none"
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderColor: Colors.sales.borderColor,
                                input: {
                                    "&::placeholder": {
                                        color: Colors.sales.placeHolderColor
                                    }
                                }
                            }}

                        />
                    )}
                    onChange={(e, value) => {
                        setAddSiteFields({ ...addSiteFields, assignee: value });

                    }}
                    renderOption={(props, option, { inputValue }) => {
                        const matches = match(`${option?.name} (${option?.email})`, inputValue, {
                            insideWords: true,
                        });
                        const parts = parse(`${option?.name} (${option?.email})`, matches);
                        return (
                            <li {...props} key={option?._id}>
                                <div>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        );
                    }}
                />
            </div>

            <div className="mb-3">
                <Button className="fw-bold"
                    onClick={() => siteAddData()}
                    disabled={loading}
                    sx={{ backgroundColor: Colors.inventory.buttonColor }} fullWidth variant="contained" >Submit</Button>

            </div>
        </div>
    )
}

export default AddSite