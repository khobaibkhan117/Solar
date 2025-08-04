import { makeStyles } from "tss-react/mui";
import { lighten, darken, alpha } from "@mui/material/styles";

const useStyles = makeStyles()((theme, _params, classes) => ({

   
    modalBG:{
        backgroundImage: `url(${require("../../images/addproductbg.png")})`, 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
    },
    hover: {
        "& tbody tr:hover": {
          background:
           lighten("#000000", 0.97),
        },
      },
    


}))

export default useStyles;