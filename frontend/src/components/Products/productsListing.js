import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Hidden, IconButton, ListItemText, Pagination, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import "../../styles/product.css";
import useStyles from "./products-jss";

import CloseIcon from "@mui/icons-material/Close";
import AddProduct from "./AddProduct";
import Colors from '../../utils/colors'
import EditProduct from "./EditProduct";
import BGImage from '../../images/productlistbg.png'
import { useSnackbar } from 'notistack'
import { deleteProduct, getAllProductPaginate } from "../../services/product.service";
import Loading from "../Loading";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import { showAlert } from "../../utils/customsFunctions";

const ProductsListing = () => {
  const theme = useTheme();
  const {classes} = useStyles()
  const { enqueueSnackbar } = useSnackbar();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [addProductModal, setAddProductModal] = useState(false)
  const [editProductModal, setEditProductModal] = useState(false)
  const [deleteProductModal, setDeleteProductModal] = useState(false)
  const [refreshData,setRefreshData] = useState(false)
  const [loading,setLoading] = useState(false)
  const [pageNumber,setPageNumber] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  const email = sessionStorage.getItem("email")
  const [selectedProduct,setSelectedProduct] = useState({})
  const [deleteLoading,setDeleteLoading] = useState(false)
  const [searchName,setSearchName] = useState("")



  const [data,setData] = useState([])
  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
        <Hidden mdDown>
          <img className="position-absolute" src={require("../../images/logo.png")} style={{ width: '50px', height: "50px", backgroundSize: 'cover' }} />

        </Hidden>
        <Typography textAlign="center" fontWeight={theme.typography.fontWeightBold} sx={{ color: Colors.products.headColor, fontSize: "2.5rem" }}>  {children} </Typography>


        <IconButton
          onClick={() => {
            if (addProductModal) {
              setAddProductModal(false)
            } else if (editProductModal) {
              setEditProductModal(false)
            } else if (deleteProductModal) {
              setDeleteProductModal(false)
            }

          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}

          disabled={deleteLoading}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };
  useEffect(()=>{
   
    getProductData(1)
    
  },[refreshData])

  const getProductData=async(page_number)=>{
    try{
      setLoading(true)
      const response = await getAllProductPaginate(email,"10", page_number, searchName)
      if(response?.data?.status == 200)
      {
        setPageNumber(page_number)
        setData(response.data.data)
        setTotalPages(response.data.totalPages);
        setLoading(false)
      }else{
        setData([])
        showAlert(response.data.message,"error")
        setLoading(false)
      }

    }catch(err)
    {
      setLoading(false);
        setData([])
          if (err.response) {
            showAlert(err.response.data.message?.toString(),"error");
          } else if (err.message) {
            showAlert(err.message,"error");
          } else if (err) {
            showAlert(err,"error");
          }

    }
  }

  const productDelete = async()=>{
    try{
      setDeleteLoading(true)
      const response = await deleteProduct(email,selectedProduct?._id)
      if(response?.data?.status == 200)
      {
        showAlert(response.data.message,"success")
       setRefreshData(!refreshData)
       setDeleteProductModal(false)
       setDeleteLoading(false)
      }else{
        setDeleteLoading(false)
        showAlert(response.data.message,"error")
       
      }

    }catch(err)
    {
      setDeleteLoading(false)
      if (err.response) {
        showAlert(err.response.data.message?.toString(),"error");
      } else if (err.message) {
        showAlert(err.message,"error");
      } else if (err) {
        showAlert(err,"error");
      }


    }
  }

  
  const handlePaginationChange = async (event, page) => {
    await getProductData(page);
  };


  return (
    <div  >

      {/* Add Product  */}
      <Dialog
        open={addProductModal}
        maxWidth="lg"
        fullWidth
        fullScreen
        onClose={() => setAddProductModal(false)}
        classes={{paper:classes.addCardBG}}
      >
        <BootstrapDialogTitle>Add Product</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddProduct setAddProductModal={setAddProductModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* Edit Product */}
      <Dialog
        open={editProductModal}
        maxWidth="lg"
        fullWidth
        fullScreen
        classes={{paper:classes.addCardBG}}
        onClose={() => setEditProductModal(false)}
      >
        <BootstrapDialogTitle>Edit Product</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditProduct setEditProductModal={setEditProductModal} 
          refreshData={refreshData} setRefreshData={setRefreshData} 
          selectedProduct={selectedProduct} />

        </DialogContent>
      </Dialog>

      {/* Delete Product */}
      <Dialog
        open={deleteProductModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          if(!deleteLoading)
          {
            setDeleteProductModal(false)
          }
        }}
      >
        <BootstrapDialogTitle>Delete Product</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this Product?

        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" disabled={deleteLoading} size="small" sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }} onClick={()=>productDelete()} >Yes</Button>
          <Button variant="outlined"  disabled={deleteLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={()=>{
            setSelectedProduct({})
            setDeleteProductModal(false)

          }} >No</Button>

        </DialogActions>
      </Dialog>




      

      <div className="grid grid-cols-8  lg:ps-40   pl-6 pr-8 gap-x-2 mb-5">
      <div className=" col-span-4 md:col-span-6">
        <TextField 
          placeholder="Search"
          fullWidth
          value={searchName}
          onChange={(e)=>setSearchName(e.target.value)}
          size="small"
          sx={{ color: Colors.products.textFieldCOlor, borderColor: Colors.products.borderColor, backgroundColor:"#D6F0FE" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2  flex gap-x-2" >
      <Button 
        variant="outlined" 
        size="small"
        sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={()=>{
            getProductData(1)
          }}
         
        >
          Filter <FilterAltOutlinedIcon sx={{fontSize:'20px'}} />
        </Button>
        <Button variant="outlined" size="small"
          sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={() => setAddProductModal(true)}
        >
          Add <AddIcon  sx={{fontSize:'20px'}} />
        </Button>
      </div>
      

      </div>

     {loading ? <Loading /> 
     :
       <div className={"grid sm:grid-cols-1 md:grid-cols-2  gap-x-5 lg:px-28 px-8 " + classes.productCard}>
        {data?.map((item, index) => {
          return (
            <div className=" mb-4  shadow-lg  rounded-xl" key={index}>
              <div className="flex productListingCard pt-4 pr-2 pl-4 pb-2 ">
                <div>
                <div style={{
                      
                      width: "160px",
                      
                      height: "120px",
                     
                    }}>
                  <img
                    // src={require("../../images/cardImg.png")}
                    src={item.picture}
                    style={{
                      maxWidth: "160px",
                      width: "auto",
                      maxHeight: "120px",
                      height: "auto",
                      backgroundSize: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  </div>
                  <Typography className="mt-2 text-center ">
                    {item.code  }
                  </Typography>
                </div>
                <div className="ps-2 w-full">
                  <div className="grid  grid-cols-4">
                  <div className=" col-span-3">
                    <Typography
                      fontWeight={theme.typography.fontWeightBold}
                      sx={{ color: "#515151", fontSize: "2rem", lineHeight: 1 }}
                    >
                      {item.name}
                    </Typography>
                    </div>
                    <div  onClick={()=>setSelectedProduct(item)}>

                      <i className="ion-ios-create-outline productListingButton px-2 me-1  text-lg cursor-pointer" onClick={() => setEditProductModal(true)} />
                      <i className="ion-ios-trash-outline productListingButton px-2 ms-1  text-lg cursor-pointer" onClick={() => setDeleteProductModal(true)} />
                    </div>
                  </div>
                  <Typography className="mb-2" sx={{ fontSize: "9px" }}>
                    {item.company_name}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", wordBreak: "normal" }}>
                    {item.description}
                  </Typography>
                  <div className="flex justify-between">
                    {/* <ListItemText
                      primary="Stock"
                      secondary="11"
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    /> */}
                    <ListItemText
                      primary="Watt"
                      secondary={item.watt || ""}
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    />
                    {/* <ListItemText
                      primary="Sold"
                      secondary="22"
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    /> */}
                    {/* <ListItemText
                      primary="Price"
                      secondary={`Rs${item.price}`}
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    /> */}
                    <ListItemText
                      primary="Cost"
                      secondary={`Rs${item.cost}`}
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    />
                    {/* <ListItemText
                      primary="Alert"
                      secondary={item.alert}
                      className=" text-textColor"
                      primaryTypographyProps={{ fontSize: "12px" }}
                      secondaryTypographyProps={{ fontSize: "11px" }}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>}

     {!loading &&  <div className="d-flex justify-content-center p-2">
        <Pagination
          count={totalPages}
          page={pageNumber}
          variant="outlined"
          color="primary"
        onChange={handlePaginationChange}
        />
      </div>}

    </div>
  );
};

export default ProductsListing;
