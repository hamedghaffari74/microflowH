import * as React from 'react';;
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField, MenuItem, InputLabel, FormControl } from "@mui/material";

interface SelectAutoWidthType {
  labelValue: string
  value?: string
}

const option = [
  { value: "newWest1", label: "newWest1" },
  { value: "newWest2", label: "newWest2" },
  { value: "newWest3", label: "newWest3" },
  { value: "newWest4", label: "newWest4" }
]
const SelectAutoWidth: React.FC<SelectAutoWidthType> = ({ labelValue }) => {

  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div >
      <FormControl sx={{ m: 1, minWidth: 211, minHeight: 56 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{labelValue}</InputLabel>
        <Select
          className='border-2 rounded-2xl'
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label={labelValue}
        >
          {option.map((item) =>
            <MenuItem value={item.value}>
              {item.label}
            </MenuItem>)
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default SelectAutoWidth