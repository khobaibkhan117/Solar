import {
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Avatar,
  Divider,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  TextField,
  DialogActions,
  Tooltip
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { PageHeadTitle, showAlert } from "../utils/customsFunctions";
import BGImage from "../images/productlistbg.png";
import MenuIcon from "@mui/icons-material/Menu";
import useStyles from "./Products/products-jss";
import { useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
import ExitToApp from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Colors from "../utils/colors";
import { updateUserBGImage, updateUserPassword } from "../services/auth.service";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ImageContext } from "./Context/ImageContext";

const LandingPage = () => {
  const { classes } = useStyles();
  const { setImageAddress, imageAddress } = useContext(ImageContext)
  const email = sessionStorage.getItem("email") || ""
  const theme = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordModal, setPasswordModal] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const bgImageRef = useRef(null);
  const path =
    window.location.href?.split("/")?.[
    window.location.href?.split("/")?.length - 1
    ];
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null,
  });
  const userPicture = sessionStorage.getItem("profile_picture");
  const userName = sessionStorage.getItem("name");

  const { anchorEl, openMenu } = menuState
  const handleMenu = (menu) => (event) => {
    const { openMenu } = menuState;

    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget,
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const handleCloseAndLogout = () => {
    sessionStorage.clear();
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const updatePassword = async () => {
    try {
      if (!password?.trim()) throw "Please Enter Old Password"
      else if (!newPassword?.trim()) throw "Please Enter New Password"
      else if (newPassword?.length < 8) throw "New Password must be contain 8 characters"
      else if (newPassword != confirmNewPassword) throw "New Password and Confirm password does not match"
      setLoading(true)
      const response = await updateUserPassword(email, password, newPassword)
      if (response.status == 200) {
        showAlert(response.data.message, "success")
        setPasswordModal(false)
        setLoading(false)
      } else {
        showAlert(response.data.message, "error")
        setLoading(false)

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

  const updateBGImage = async (imageData) => {
    try {

      const response = await updateUserBGImage(email, imageData)
      if (response.status == 200) {
        showAlert(response.data.message, "success")

      } else {
        showAlert(response.data.message, "error")

      }

    } catch (err) {

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
    <div
      className={" min-h-screen relative " + (path == "product" && classes.mainDiv)}
      style={{
        backgroundImage: `url(${imageAddress || BGImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundOrigin: "border-box"
      }}
    >

      <Dialog open={passwordModal}
        onClose={() => {
          if (!loading) {
            setPasswordModal(false)
          }



        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent className="pt-3">
          <div>
            <div className="mb-3">
              <TextField
                size="small"
                className="textField"
                label="Old Password"
                fullWidth
                placeholder="****"
                type={showOldPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="textField" sx={{ borderLeft: '1px solid #000' }}>
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowOldPassword((show) => !show)}
                        onMouseDown={(e) => e.preventDefault()}
                        size="small"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                size="small"
                className="textField"
                label="New Password"
                fullWidth
                placeholder="****"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="textField" sx={{ borderLeft: '1px solid #000' }}>
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowNewPassword((show) => !show)}
                        onMouseDown={(e) => e.preventDefault()}
                        size="small"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                size="small"
                className="textField"
                label="Confirm New Password"
                fullWidth
                placeholder="****"
                type={showConfirmNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="textField" sx={{ borderLeft: '1px solid #000' }}>
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowConfirmNewPassword((show) => !show)}
                        onMouseDown={(e) => e.preventDefault()}
                        size="small"
                      >
                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
          </div>

        </DialogContent>
        <DialogActions className=" justify-content-between">
          <Button disabled={loading} variant="contained" sx={{ backgroundColor: Colors.user.headColor }}
            onClick={() => {
              updatePassword()

            }}>
            Confirm
          </Button>

          <Button disabled={loading} onClick={() => setPasswordModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex justify-center pt-3 relative mb-6">
        <img
          src={require("../images/logo.png")}
          style={{
            width: "60px",
            left: "15px",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/app/home");
          }}
        />

        <Typography
          className={" text-center "}
          sx={{ fontSize: "2rem", color: "#000D6B" }}
          fontWeight={theme.typography.fontWeightBold}
        >
          {PageHeadTitle[path]}
        </Typography>


        <Button onClick={handleMenu("user-setting")} sx={{ position: "absolute", right: "5px" }}>
          <Avatar src={userPicture}>
            {!userPicture
              ? userName?.includes(" ")
                ? userName?.split(" ")?.[0]?.charAt(0)?.toUpperCase() +
                userName?.split(" ")?.[1]?.charAt(0)?.toUpperCase()
                : userName?.slice(0, 2)?.toUpperCase()
              : ""}
          </Avatar>
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openMenu === "user-setting"}
          onClose={handleClose}
        >
          <MenuItem>
            <ListItemIcon>{email}</ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {
            setPasswordModal(true)
            setPassword("")
            setConfirmNewPassword("")
            setNewPassword("")
            handleClose()
          }}>
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={handleCloseAndLogout} component={Link} to="/login">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      </div>
      <div className=" absolute top-12 right-1 md:bottom-11 md:left-7 md:top-auto md:right-auto">
        <Tooltip title="Update Background Image" >
          <IconButton onClick={() => bgImageRef?.current?.click()}>
            <AddPhotoAlternateIcon sx={{ fontSize: "32px" }} />

          </IconButton>

        </Tooltip>
        <input
          type="file"
          style={{ display: "none" }}
          ref={bgImageRef}
          accept="image/png, image/jpeg"
          onChange={(event) => {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(event.target.files[0]);
              reader.onloadend = () => {
                updateBGImage(reader.result)
                setImageAddress(reader.result);
                sessionStorage.setItem("bgImage", reader.result)
              };

              event.target.value = null;
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </div>

      <Outlet />
    </div>
  );
};

export default LandingPage;
