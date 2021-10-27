import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import Image from 'material-ui-image';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import uploadToCloudinary from 'src/utils/uploadToCloudinary';

const DrinkBrandsEditForm = ({ data }) => {
  console.log(data);
  const [categoriesMenu, setCategoriesMenu] = useState(null);
  const updateMutation = useMutation((formData) =>
    updateDrinkBrandRequest(formData)
  );
  const addMutation = useMutation((formData) => addDrinkBrandRequest(formData));

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      brandName: initialData?.brand_name || '',
      brandTitle: initialData?.brand_title || '',
      brandCompanyName: initialData?.brand_company_name || '',
      brandDescripton: initialData?.brand_description || '',
      brandCategory: initialData?.brand_category || '',
      brandImage: initialData?.brand_image || '',
      brandStatus: initialData?.is_active || 1
    },
    onSubmit: (values) => {
      if (!params.brandId) {
        console.log(values);
        handleAddDrinkBrand(values);
        return;
      }

      handleUpdateDrinkBrand(values);
    }
  });

  const handleUpdateDrinkBrand = (values) => {
    return updateMutation.mutate({
      brand_id: params.brandId,
      brand_title: values.brandTitle,
      brand_name: values.brandName,
      brand_category: values.brandCategory,
      brand_description: values.brandDescripton,
      brand_image: values.brandImage,
      is_active: values.brandStatus,
      brand_company_name: values.brandCompanyName
    });
  };

  const handleAddDrinkBrand = (values) => {
    return addMutation.mutate({
      brand_title: values.brandTitle,
      brand_name: values.brandName,
      brand_category: values.brandCategory,
      brand_description: values.brandDescripton,
      brand_image: values.brandImage,
      is_active: values.brandStatus,
      brand_company_name: values.brandCompanyName
    });
  };

  const handleImage = async (image) => {
    if (!image) return;
    try {
      // const imgBase64 = await getBase64(image);
      const imgUrl = await uploadToCloudinary(image);
      console.log(imgUrl);
      formik.setFieldValue('brandImage', imgUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box>
        <Card>
          <CardContent>
            <Box
              style={{ width: '80%', margin: '0 auto', padding: '25px 0px' }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  md={3}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column'
                  }}
                >
                  <Image
                    src={formik.values.brandImage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'static'
                    }}
                    imageStyle={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'contain',
                      position: 'static',
                      border: '1px solid rgb(212 212 212)',
                      borderRadius: '10px',
                      padding: '12px'
                    }}
                    style={{ paddingTop: '0px' }}
                  />

                  <input
                    accept="image/*"
                    name="brandImage"
                    onChange={(event) => handleImage(event.target.files[0])}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label
                    style={{ display: 'block' }}
                    htmlFor="raised-button-file"
                  >
                    <Button
                      fullWidth
                      style={{
                        padding: '15px',
                        borderRadius: '6px',
                        display: 'block'
                      }}
                      variant="outlined"
                      component="span"
                    >
                      Update Image
                    </Button>
                  </label>
                </Grid>
                <Grid item md={9}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.brandTitle}
                          variant="outlined"
                          placeholder="Brand Title"
                          name="brandTitle"
                          label="Brand Title"
                          fullWidth
                          onChange={formik.handleChange}
                        />
                      </Grid>

                      <Grid item md={3}>
                        <FormControl fullWidth>
                          <InputLabel id="brandStatus-label">Status</InputLabel>
                          <Select
                            labelId="brandStatus-label"
                            id="brandStatus"
                            value={formik.values.brandStatus}
                            label="Status"
                            name="brandStatus"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Disable</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={3}>
                        {categoriesMenu && (
                          <>
                            <FormControl fullWidth>
                              <InputLabel id="brandCategory-label">
                                Category
                              </InputLabel>
                              <Select
                                labelId="brandCategory-label"
                                id="brandCategory"
                                defaultValue={formik.values.brandCategory}
                                value={formik.values.brandCategory}
                                label="Category"
                                name="brandCategory"
                                onChange={formik.handleChange}
                              >
                                {categoriesMenu.map((category) => {
                                  return (
                                    <MenuItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.drink_category_name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.brandName}
                          variant="outlined"
                          placeholder="Brand Name"
                          name="brandName"
                          label="Brand Name"
                          fullWidth
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.brandCompanyName}
                          variant="outlined"
                          placeholder="Brand Company Name"
                          name="brandCompanyName"
                          label="Brand Company Name"
                          fullWidth
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          value={formik.values.brandDescripton}
                          label="Brand Description"
                          multiline
                          rows={4}
                          value={formik.values.brandDescripton}
                          variant="outlined"
                          placeholder="Brand Description"
                          name="brandDescripton"
                          fullWidth
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Box style={{ marginTop: '20px', textAlign: 'right' }}>
                      <Button
                        type="submit"
                        style={{
                          padding: '15px',
                          borderRadius: '6px'
                        }}
                        variant="contained"
                      >
                        Update
                      </Button>
                    </Box>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DrinkBrandsEditForm;
