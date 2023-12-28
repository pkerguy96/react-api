import { Box, Typography } from "@mui/material";
import maledoc from "/maldoc.svg";
const DashboardKpiPage = () => {
  // return (
  //   <Box className="parent w-full flex flex-col gap-2">
  //     <Box className="grid grid-cols-4  items-start  grid-rows-1 gap-4">
  //       <Box className="bg-gradient-to-br from-sky-100 to-sky-200  rounded-lg flex col-span-2">
  //         <img src={maledoc} width="100" height="100" alt="Maledoc SVG" />
  //         <Box className="flex flex-initial flex-col gap-2 p-4 ">
  //           <Typography
  //             variant="h5"
  //             className="text-center text-white !font-medium"
  //           >
  //             Good Evening , <p className="inline-block">Aymen Elkor</p>
  //           </Typography>
  //           <p className="text-white ">
  //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur,
  //             eligendi itaque. Assumenda laudantium cupiditate hic nemo ipsam
  //           </p>
  //         </Box>
  //       </Box>
  //       <Box className="bg-gradient-to-br from-innovation-100 to-innovation-300 rounded-lg flex flex-col gap-2 p-4 ">
  //         <Typography variant="h5">Total Appointment</Typography>
  //         <p className="inline-block">300</p>
  //       </Box>
  //       <Box>3</Box>
  //     </Box>
  //   </Box>
  // );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <Box className="w-full items-center shadow-md p-6 lg:col-span-6 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 text-gray-950 flex flex-wrap gap-4">
          <img src={maledoc} width="100" alt="Maledoc SVG" />
          <div className="flex flex-col flex-1 gap-1">
            <h1 className="text-xl font-semibold">
              Good Evening, <span className="text-pink-600">Aymen Elkor</span>
            </h1>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              iste cum iusto ipsam dolor illum quos doloremque tempore incidunt
              velit!
            </p>
          </div>
        </Box>
        <Box className="w-full shadow-md text-white bg-blue-500 lg:col-span-3">
          <div className="p-6 pb-2 flex flex-col flex-1 gap-1">
            <h1 className="text-base font-medium">Total Appointment</h1>
            <p className="text-4xl font-semibold">16,549</p>
          </div>
        </Box>
        <Box className="w-full shadow-md bg-white text-gray-950 lg:col-span-3">
          <div className="p-6 pb-2 flex flex-col flex-1 gap-1">
            <h1 className="text-base font-medium">Appointment Canceled</h1>
            <p className="text-4xl font-semibold text-pink-600">200</p>
          </div>
        </Box>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-9">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Hospital Survey</h1>
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Appointment Activity</h1>
          </Box>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">
              Average Patient Visits
            </h1>
          </Box>
          <Box className="w-full shadow-md bg-white text-gray-950 flex flex-col">
            <h1 className="text-xl font-semibold p-6">Employees</h1>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DashboardKpiPage;
