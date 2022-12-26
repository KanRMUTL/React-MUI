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
import { Link, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as stockEditAction from "../../../actions/stock.edit.action";
import { RootReducers } from "../../../reducers";
import { imageUrl } from "../../../Constants";
import { useNavigate } from "react-router-dom";

const StockEdit: React.FC<any> = () => {
  const dispatch = useDispatch();
  const stockEditReducer = useSelector(
    (state: RootReducers) => state.stockEditReducer
  );

  const navigate = useNavigate();

  const match = useMatch("/stock/edit/:id");
  React.useEffect(() => {
    let id = match?.params.id;
    dispatch(stockEditAction.getProductById(id));
  }, []);

  const showPreviewImage = (values: any) => {
    console.log(values);

    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      );
    }
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
            <Typography>Edit Product</Typography>

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
              name="stock"
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
              Edit
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
        enableReinitialize
        initialValues={
          stockEditReducer.result ? stockEditReducer.result : initialValues
        }
        validate={(value) => {
          let error: any = {};
          if (!value.name) error.name = "Please Enter Product Name";
          if (value.price < 10) error.price = "Price is not lower than 10";
          if (value.stock < 10) error.stock = "Stock is not lower than 10";
          return error;
        }}
        onSubmit={(values, { setSubmitting }) => {
          let formData = new FormData();
          formData.append("id", String(values.id));
          formData.append("name", values.name);
          formData.append("price", String(values.price));
          formData.append("stock", String(values.stock));
          if (values.file) {
            formData.append("image", values.file);
          }
          dispatch(stockEditAction.updateProduct(formData, navigate));
          setSubmitting(false);
        }}
      >
        {(props: any) => ShowForm(props)}
      </Formik>
    </Box>
  );
};

export default StockEdit;
