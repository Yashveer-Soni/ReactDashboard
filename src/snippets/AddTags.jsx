// import * as React from 'react';
// import Chip from '@mui/material/Chip';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';

// export default function AddTags({onChangeTags}) {
//   const [tags, setTags] = React.useState(JSON.parse(localStorage.getItem("tags")) || []);

//   const handleTagsChange = (event, newValue) => {
//     setTags(newValue); 
//     onChangeTags(newValue);
//   };
//   return (
//     <Stack spacing={3} sx={{ width: 500 }}>
//       <Autocomplete
//         multiple
//         id="tags-filled"
//         options={top100Films.map((option) => option.title)}
//         // defaultValue={[top100Films[13].title]}
//         value={tags} // Bind the value to the state
//         onChange={handleTagsChange} // Handle change in tags
//         freeSolo
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => {
//             const { key, ...tagProps } = getTagProps({ index });
//             return (
//               <Chip variant="outlined" label={option} key={key} {...tagProps} />
//             );
//           })
//         }
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="filled"
//             label=""
//             placeholder="Favorites"
//           />
//         )}
//       />
//     </Stack>
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
// ];