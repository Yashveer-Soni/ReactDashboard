// import React from 'react';
// import axios from 'axios'; // Import axios for HTTP requests
// import { toast } from 'react-toastify'; // Import Toastify for notifications

// const AddBrand = ({ open, onClose }) => {
//   const handleAdd = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const formJson = Object.fromEntries(formData.entries());
//     const brandName = formJson.brand;
//     const token=localStorage.getItem('access_token');


//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/addbrands/', { name: brandName },{
//         headers: {
//           'Authorization': `Bearer ${token}`
//       }
//       }); // Adjust the URL to your Django endpoint
//       toast.success('Brand added successfully!');
//       onClose(); // Close the dialog on successful submission
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error('Brand already exists.');
//       } else {
//         toast.error('An error occurred.');
//       }
//     }
//   };

//   return (
//     <Dialog
//       fullWidth
//       maxWidth='xs'
//       open={open}
//       onClose={onClose}
//     >
//       <DialogTitle>Add Brand</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleAdd}>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="brand"
//             label="Enter Brand Name"
//             type="text"
//             fullWidth
//             variant="standard"
//           />
//           <DialogActions>
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="submit">Add</Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddBrand;
