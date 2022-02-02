import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Categories, categoryState, newCategory } from '../atoms';

function Category() {
  const categories = useRecoilValue(newCategory);
  const [category, setCategory] = useRecoilState(categoryState);
  const onChange = (event: SelectChangeEvent<Categories>) => {
    setCategory(event.target.value as Categories);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 110 }}>
      <InputLabel>Category</InputLabel>
      <Select value={category} onChange={onChange} autoWidth label='Category'>
        <MenuItem value={Categories.TO_DO}>TO_DO</MenuItem>
        <MenuItem value={Categories.DOING}>DOING</MenuItem>
        <MenuItem value={Categories.DONE}>DONE</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Category;
