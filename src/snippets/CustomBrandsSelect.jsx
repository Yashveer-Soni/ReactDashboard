// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP, // Show only 10 items at a time
//       width: 250,
//     },
//   },
// };

// const CustomBrandsSelect = ({ selectedBrandId, onSelectBrand }) => {
//   const selected=localStorage.getItem("selectedBrand") || null
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token=localStorage.getItem('access_token');

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/brands/",{
//           headers: {
//             'Authorization': `Bearer ${token}`
//         }
//         });
//         setBrands(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//         setBrands([]); // Set to empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBrands();
//   }, []);

//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     console.log('Selected Value:', selectedValue);
//     onSelectBrand(selectedValue);  // Pass selected option to the parent component
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 120 }}>
//       <Select
//         value={selectedBrandId?selectedBrandId:selected}
//         onChange={handleChange}
//         displayEmpty
//         inputProps={{ 'aria-label': 'Select Brand' }}
//         MenuProps={MenuProps}
//         renderValue={(selected) => {
//           if (!selected) {
//             return 'Select Brand';
//           }
//           const selectedBrand = brands.find(brand => brand.id.toString() === selected.toString());
//           return selectedBrand ? selectedBrand.brand_name : 'Select Brand';
//         }}
//       >
//         {loading ? (
//           <MenuItem disabled>
//             <CircularProgress size={24} />
//           </MenuItem>
//         ) : (
//           brands.map(brand => (
//             <MenuItem
//               key={brand.id}
//               value={brand.id}
//             >
//               {brand.brand_name}
//             </MenuItem>
//           ))
//         )}
//       </Select>
//     </FormControl>
//   );
// };

// export default CustomBrandsSelect;
