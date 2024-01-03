//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Tooltip, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_UploadInfo, CACHE_KEY_UploadUrl } from "../constants";
import {
  ClusterData,
  UploadServiceApiClient,
} from "../services/UploadsService";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ShowUploadsServiceApiClient from "../services/UploadsService";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import getGlobalById from "../hooks/getGlobalById";
import getUrls from "../hooks/getUrls";
const Uploadstable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = getGlobal(
    {} as ClusterData,
    [CACHE_KEY_UploadInfo[0]],
    ShowUploadsServiceApiClient,
    undefined
  );

  if (isLoading) return <LoadingSpinner />;

  const transformedData = Object.entries(data).map(
    ([cluster, clusterData]: any) => ({
      id: cluster,
      nom: clusterData.patientName[0].nom,
      type: clusterData.type,
      date: clusterData.dates[0],

      size: `${clusterData.totalSize.toFixed(2)} Mb`,
      action: clusterData.mimeType[0],
    })
  );

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },

    {
      name: "nom",
      label: "Nom du patient",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "size",
      label: "Taille des fichiers",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (data) => {
          console.log(data);

          return (
            <>
              <button
                className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Modifier"
              >
                <DeleteOutlineIcon
                  color="error"
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
              <button
                className="btn-ordonance-download text-gray-950 hover:text-blue-700 cursor-pointer"
                title="Modifier"
              >
                <DownloadForOfflineOutlinedIcon
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>

              {data === "application/dicom" ? (
                <button
                  className="btn-ordonance-see text-gray-950 hover:text-blue-700 cursor-pointer"
                  title="Modifier"
                >
                  <VisibilityOutlinedIcon
                    className="pointer-events-none"
                    fill="currentColor"
                  />
                </button>
              ) : null}
            </>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    selectableRowsHideCheckboxes: true,
    searchPlaceholder: "Rechercher un fichier",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun fichier n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouveau fichier">
        <IconButton
          onClick={() => {
            navigate(`/Addfile`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    onRowClick: async (s: any, m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-see") ||
        e.target.classList.contains("btn-ordonance-see")
      ) {
        console.log(s);
        if (s[1] === "application/dicom") {
          console.log(true);
        }
        /*   navigate(`/AddOrdonance/${s[1]}/${s[0]}`); */
      } else if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        // api
      } else if (
        e.target.querySelector(".btn-ordonance-download") ||
        e.target.classList.contains("btn-ordonance-download")
      ) {
        try {
          const response = await getUrls(s[0], UploadServiceApiClient); // Correctly invoke the async function
          console.log(response[0]);
          /* const link = response.data[0];

          // Create an anchor element
          const downloadLink = document.createElement("a");

          // Set the href attribute to the download link
          downloadLink.href = link;

          // Specify the suggested file name for the download
          downloadLink.download = "downloaded_file.png";

          // Append the anchor element to the document body
          document.body.appendChild(downloadLink);

          // Trigger a click event on the anchor element
          downloadLink.click();

          // Remove the anchor element from the document body
          document.body.removeChild(downloadLink); */
        } catch (error) {
          console.log(error);
        }
      }
    },
  };

  return (
    <Box className="relative">
      <MUIDataTable
        title={"Gestion de fichiers"}
        data={transformedData}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default Uploadstable;
