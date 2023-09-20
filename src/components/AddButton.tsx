import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
interface Props {
  link: string;
  PlaceHolder: string;
}
const AddButton = ({ link, PlaceHolder }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end" // Align items to the right
      marginBottom={2} // Add some padding to the right of the page
    >
      <Link to={link} className="no-underline">
        <Box className="flex w-max gap-2 items-center text-white bg-[#1976d2] hover:bg-blue-500 focus:bg-blue-500 py-2 px-3 rounded-sm">
          <AddIcon />
          <span>{PlaceHolder}</span>
        </Box>
      </Link>
    </Box>
  );
};

export default AddButton;
