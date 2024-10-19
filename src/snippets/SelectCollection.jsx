// import * as React from 'react';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// export default function CheckboxesTags({onChangeCollections}) {
//   const [selectedCollections, setSelectedCollections] = React.useState(() => {
//     const savedCollections = localStorage.getItem("collections");
//     return savedCollections
//       ? savedCollections.split(',').map(title => ({ title: title.replace(/"/g, '') }))
//       : [];
//   });
  
//   const handleCollectionChange = (event, value) => {
//     const collectionTitles = value.map(collection => collection.title).join(',');
//     setSelectedCollections(value);
//     onChangeCollections(collectionTitles);
//   };
//   return (
//     <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={top100Films}
//       onChange={handleCollectionChange}
//       value={selectedCollections}
//       disableCloseOnSelect
//       getOptionLabel={(option) => option.title}
//       renderOption={(props, option, { selected }) => {
//         const { key, ...optionProps } = props;
//         return (
//           <li key={key} {...optionProps}>
//             <Checkbox
//               icon={icon}
//               checkedIcon={checkedIcon}
//               style={{ marginRight: 8 }}
//               checked={selected}
//             />
//             {option.title}
//           </li>
//         );
//       }}
//       style={{ width: '100%' }}
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: 'transparent', // Remove focus border color
//           },
//         },
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label=""
//           placeholder="Favorites"
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: 'transparent', // Remove focus border color
//               },
//             },
//           }}
//         />
//       )}
//     />
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'Pulp Fiction', year: 1994 },
//   {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   },
//   { title: 'The Good, the Bad and the Ugly', year: 1966 },
//   { title: 'Fight Club', year: 1999 },
//   {
//     title: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: 2001,
//   },
 
// ];
