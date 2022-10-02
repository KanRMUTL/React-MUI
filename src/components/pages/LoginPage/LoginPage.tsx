import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Theme,
  Typography,
  Alert
} from "@mui/material";
import { Stack, SxProps } from "@mui/system";
import { User } from "../../../types/user.type";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as loginActions from '../../../actions/login.action'
type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: { marginTop: 2 },
  };

  const ShowForm = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<User>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />
        <br />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />
        <br />

        {loginReducer.isError && (
          <Alert severity="error">Login failed.</Alert>
        )}
        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate("/register")}
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            disabled={isSubmitting}
          >
            Register
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginReducer.isFetching}
          >
            Login
          </Button>
        </Stack>
      </form>
    );
  };

  const initialUser: User = { username: "", password: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ minWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <Formik
              onSubmit={(values) => {
                dispatch(loginActions.login(values, navigate))
              }}
              initialValues={initialUser}
            >
              {(props) => ShowForm(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
