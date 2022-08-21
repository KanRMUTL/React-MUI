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
} from "@mui/material";
import { Stack, SxProps } from "@mui/system";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
    buttons: {marginTop: 2}
  };

  const ShowForm = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<any>) => {
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
        <Stack direction="row" spacing={2} sx={classes.buttons}>
          <Button
            onClick={() => navigate('/register')}
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
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ minWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
                setTimeout(() => setSubmitting(false), 1000);
              }}
              initialValues={{ username: "", password: "" }}
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
