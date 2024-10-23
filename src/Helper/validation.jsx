import * as Yup from 'yup';

const validation = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  productId: Yup.number().required('Product ID is required'),
  MRP: Yup.number().required('MRP is required'),
  quantity: Yup.number().required('Quantity is required'),
  costPerItem: Yup.number().required('Cost per item is required'),
  profit: Yup.number().required('Profit is required'),
  margin: Yup.number().required('Margin is required'),
  weightType: Yup.string().required('Weight type is required'),
  selectedCategory: Yup.string().required('Category is required'),
  selectedSubCategory: Yup.string().required('Subcategory is required'),
  selectedBrand: Yup.string().required('Brand is required'),
  expiryDate: Yup.date().required('Expiry date is required'),
  purchaseRate: Yup.number().required('Purchase rate is required'),
  weight: Yup.number().required('Weight is required'),
  packagingDate: Yup.date().required('Packaging date is required'),
  editorContent: Yup.string().required('Content is required'),
});

export default validation;
