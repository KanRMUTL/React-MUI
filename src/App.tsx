import * as React from "react";
import {
  ThemeProvider,
  styled,

  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockPage from "./components/pages/StockPage";
import StockEditPage from "./components/pages/StockEditPage";
import ReportPage from "./components/pages/ReportPage";
import AboutUs from "./components/pages/AboutUs";
import { blue } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "./reducers";
import * as loginActions from './actions/login.action'

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `url(${process.env.PUBLIC_URL}/images/background_menu.jpg)`,
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 700,
  },
  spacing: 5,
  palette: {
    primary: blue,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer)
  const dispatch = useDispatch()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(loginActions.restoreLogin())
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
       {loginReducer.result && <Header open={open} onDrawerOpen={handleDrawerOpen} />} 
        {loginReducer.result && <Menu open={open} onDrawerClose={handleDrawerClose} /> }
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/stock/create" element={<StockCreatePage />} />
            <Route path="/stock/edit/:id" element={<StockEditPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>404 Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);
