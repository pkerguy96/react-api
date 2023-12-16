//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Tooltip, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const stockTable = () => {
  const navigate = useNavigate();
  const columns = ["Category", "Brand", "Product name", "Quantity", "Action"];

  const data = [
    [
      "Dental Chairs",
      "Brand A",
      "ErgoComfort Dental Chair",
      10,
      "Edit / Delete",
    ],
    [
      "X-Ray Machines",
      "Brand B",
      "DentaView X-Ray Machine",
      5,
      "Edit / Delete",
    ],
    [
      "Dental Instruments",
      "Brand C",
      "PrecisionScaler Ultrasonic Scaler",
      20,
      "Edit / Delete",
    ],
    [
      "Sterilization Equipment",
      "Brand D",
      "SteamPro Autoclave",
      8,
      "Edit / Delete",
    ],
  ];

  const options = {
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un produit",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun produit n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouveau Produit">
        <IconButton
          onClick={() => {
            navigate(`/AddPatient`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  return (
    <Box className="relative">
      <MUIDataTable
        title={"Gestion Stock"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default stockTable;
