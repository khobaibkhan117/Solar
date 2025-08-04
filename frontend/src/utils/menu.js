
import PaymentsIcon from '@mui/icons-material/Payments';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
export default [
    {

        name: "Invoice",
        route: "/app/sale",
        icon: <PaymentsIcon />,

    },
    {
        name: "Products",
        route: "/app/product",
        icon: <SolarPowerIcon />,

    },
    {
        name: "Customers",
        route: "/app/customer",
        icon: <PersonOutlineIcon />,

    },
    {
        name: "Site Management",
        route: "/app/site",
        icon: <AddHomeWorkIcon />,

    },
    {
        name: "Recovery",
        route: "/app/recovery",
        icon: <PaymentIcon />,

    },
    {

        name: "Inventory",
        route: "/app/inventory",
        icon: <InventoryIcon />
    },
    {

        name: "Other Companies",
        route: "/app/othercompanies",
        icon: <PersonAddAltIcon />
    },
    {

        name: "User",
        route: "/app/user",
        icon: <PersonIcon />
    },

    {

        name: "Bank Account",
        route: "/app/bank",
        icon: <AccountBalanceIcon />
    },

]