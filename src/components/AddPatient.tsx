import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Replace 'dayjs' with your preferred date library

const AddPatient = () => {
  const today = dayjs();
  return (
    <Box component="form" noValidate autoComplete="off">
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Nom:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField required id="outlined-required" label="Nom" size="small" />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Prenom:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-required"
            label="Prenom"
            size="small"
          />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Cin:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField required id="outlined-required" label="Cin" size="small" />
        </FormControl>
      </Box>
      <Box className="flex items-center ">
        <span className="w-24 mr-1 sm:mr-10">Date de naissance:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <DatePicker
                defaultValue={today}
                slotProps={{ textField: { size: "small" } }}
              />
            </FormControl>
          </LocalizationProvider>
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Adresse:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-required"
            label="Adresse"
            size="small"
          />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Telephone:</span>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-required"
            label="Telephone"
            size="small"
          />
        </FormControl>
      </Box>
      <Box className="flex items-center">
        <span className="w-24 mr-1 sm:mr-10">Mutuelle:</span>
        <FormControl fullWidth sx={{ m: 1 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Button variant="contained" sx={{ borderRadius: 16 }} fullWidth={true}>
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
};

export default AddPatient;
