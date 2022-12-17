import * as React from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { Product } from "../../../types/product.type";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { TextField } from "formik-material-ui";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import * as stockActions from "../../../actions/stock.action";
import { useDispatch } from "react-redux";

const StockCreatePage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showPreviewImage = (values: any) => {
    return (
      values.file_obj && <img src={values.file_obj} style={{ height: 100 }} />
    );
  };

  const ShowForm = ({
    values,
    setFieldValue,
    isSubmitting,
  }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent>
            <Typography>Create Stock</Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Stock"
            />
            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>
              <input
                type="file"
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="fiels"
                style={{ padding: " 20px 0 0 20px" }}
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]);
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              />
            </div>
          </CardContent>

          <CardActions>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Create
            </Button>
            <Button fullWidth component={Link} to="/stock" variant="outlined">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const initialValues: Product = {
    name: "",
    stock: 2000,
    price: 3000,
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", String(values.price));
          formData.append("stock", String(values.stock));
          formData.append("image", values.file);
          dispatch(stockActions.addProduct(formData));
          setSubmitting(false);
        }}
      >
        {(props: any) => ShowForm(props)}
      </Formik>
    </Box>
  );
};

export default StockCreatePage;
