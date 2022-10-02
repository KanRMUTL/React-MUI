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
  Alert,
} from "@mui/material";
import { Stack, SxProps } from "@mui/system";
import { User } from "../../../types/user.type";
import * as registerActions from "../../../actions/register.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";

type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );
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

        {registerReducer.isError && (
          <Alert severity="error">Register failed.</Alert>
        )}

        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate("/login")}
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Create
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
              Register
            </Typography>
            <Formik
              onSubmit={async (values, { setSubmitting }) => {
                dispatch(registerActions.register(values, navigate));
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

export default RegisterPage;
