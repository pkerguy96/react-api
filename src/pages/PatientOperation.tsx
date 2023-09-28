import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../styles.css";

const PatientOperation = () => {
  const [polygonColors, setPolygonColors] = useState(
    Array(19).fill("transparent")
  );
  const [formClass, setFormClass] = useState("hidden");

  const toggleStrokeColor = (index: number) => {
    const updatedColors = [...polygonColors];
    updatedColors[index] =
      updatedColors[index] === "blue" ? "transparent" : "blue";
    setPolygonColors(updatedColors);
    setFormClass("animated-element");
  };

  useEffect(() => {
    const allTransparent = polygonColors.every(
      (color) => color === "transparent"
    );
    setFormClass(allTransparent ? "hidden" : "animated-element");
  }, [polygonColors]);
  return (
    <Paper>
      <Box className="flex justify-center ">
        <Typography className="text-xl font-bold  text-[#1976d2]" variant="h6">
          Veuillez sélectionner les dents que vous souhaitez opérer
        </Typography>
      </Box>
      <Box className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-4 p-4">
        <Box className="mx-auto my-auto w-[500px] max-w-full relative">
          <img
            src="/testmouth.png"
            alt="patient"
            className="block select-none"
            style={{
              height: "auto", // Set height to auto to maintain aspect ratio
              width: "100%", // Set the desired width
            }}
          />
          <svg
            className="absolute inset-0 select-none"
            width="100%"
            height="100%"
            viewBox="0 0 400 518"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              className="cursor-pointer"
              points="165.3,34.3 162.8,35.8 159.6,38.5 157.7,40.4 154.5,45.1 151.8,50.5 149.9,56.3 148.7,62.2 148.4,67.7 149,72.5 150.5,76.3 151.7,77.6 153.1,78.6 157.1,80.5 164.8,82.7 170,83.3 172.9,83.3 179.9,82.1 186.9,79.9 192.5,77.1 194.3,75.7 195.3,74.4 196.8,70.9 197.5,66.7 197.3,62 195.8,54.6 192.7,47.3 189.8,42.9 188.1,40.9 185.8,38.7 180.2,35.4 174.1,33.6 168.1,33.6 165.3,34.3 165.3,34.3"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[0]}
              onClick={() => toggleStrokeColor(0)}
            />

            <polygon
              className="cursor-pointer"
              points="221.2,35.1 217.8,36.9 212.4,42 209.7,45.7 207.2,50.8 204,60.4 202.8,66.3 202.7,68.7 203.1,71.1 205.9,75.4 211,78.8 217.6,81.4 225.2,82.8 233.1,83.1 240.6,82 247.1,79.4 249.7,77.6 250.8,76.2 251.9,71 252,66.7 251.8,62.4 250.5,54.4 248.1,47.5 244.6,41.8 240.3,37.4 235.4,34.5 229.9,33.3 224.2,34 221.2,35.1 221.2,35.1"
              strokeWidth={3}
              stroke={polygonColors[1]}
              onClick={() => toggleStrokeColor(1)}
              fill="transparent"
            />

            <polygon
              className="cursor-pointer"
              points="114.7,56.1 113.3,57.9 111.1,62.5 109.9,68.1 109.4,74.5 109.8,80.9 111,87.1 113,92.6 115.6,96.8 117.2,98.3 119.2,99.3 124.8,99.8 131.5,98.7 137.9,96 140.7,94.1 142,92.9 143.9,89.6 144.9,85.4 145,80.7 144.3,75.6 142.7,70.4 140.4,65.2 137.4,60.4 135.6,58.1 133.2,55.5 128.4,53.1 124.9,52.8 121.4,52.7 116.9,54.1 114.7,56.1 114.7,56.1"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[2]}
              onClick={() => toggleStrokeColor(2)}
            />

            <polygon
              className="cursor-pointer"
              points="269.5,54.3 267.2,55.8 262.7,61 260.4,64.7 258.1,69.1 256.2,76.6 256,81.5 256.1,86 257.5,91.2 259.1,92.9 260.7,94.3 264.9,96.8 269.7,98.7 274.3,99.8 276.3,100 279.3,99.8 284,97.7 287.3,93.1 289.8,85.2 290.8,79.9 291.6,74.3 291.3,67.1 290.1,63.6 289.1,61.2 286.7,56.9 285.6,55.6 284,54.4 280.2,53 275.8,52.6 271.5,53.4 269.5,54.3 269.5,54.3"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[3]}
              onClick={() => toggleStrokeColor(3)}
            />

            <polygon
              className="cursor-pointer"
              points="84,83.3 81.8,84.3 78.4,86.8 76.5,90.5 75.7,95.7 75.6,99.1 75.9,105.7 76.4,110 76.9,112.2 77.2,113.6 78.5,115.7 81.5,119.3 83.4,121.2 87.4,124.1 91.7,125.7 96,126 100.1,125.2 103.9,123.2 107.1,120 109.6,115.8 110.5,113.3 111.1,109.9 110.4,102 107.8,93.9 103.7,87.4 101.3,85.2 99.5,84.1 95.3,82.6 90.7,82.1 86.2,82.7 84,83.3 84,83.3"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[4]}
              onClick={() => toggleStrokeColor(4)}
            />

            <polygon
              className="cursor-pointer"
              points="304.7,82.3 302.9,82.9 299.6,85 296.6,88.2 294,92.2 291.2,99.2 290,106.4 290.3,111 290.8,113.1 291.7,115.6 294.2,119.9 297.2,123.1 300.7,125.2 304.5,126.1 308.6,125.8 312.8,124.3 316.9,121.6 318.9,119.7 320.9,117.6 323.3,114.4 323.5,113.7 323.3,113.2 323.7,111.7 324.3,110.9 324.9,109.5 325.9,104.1 326,100.8 325.9,96.5 324.4,90.8 322.7,88.4 320.9,86.4 316.9,83.4 312.4,81.9 307.4,81.8 304.7,82.3 304.7,82.3"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[5]}
              onClick={() => toggleStrokeColor(5)}
            />

            <polygon
              className="cursor-pointer"
              points="57.7,114.9 56.5,115.8 54.1,118.4 53.3,119.9 51,124.6 47.3,131.3 44.9,135.7 43.1,141.9 43.3,145.1 43.7,147.6 45,152.3 46.9,156.2 49.3,159 50.5,159.9 52.5,160.7 58,161.8 64.5,162.3 70.7,161.9 73.3,161.3 76.2,160.3 81.7,157 86.2,152.5 89.3,147.4 90,144.8 90.3,142.3 89.5,137.2 87,131.7 82.6,125.8 79.6,122.7 76.4,119.6 70.7,115.3 65.5,113.4 60.4,113.9 57.7,114.9 57.7,114.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[6]}
              onClick={() => toggleStrokeColor(6)}
            />

            <polygon
              className="cursor-pointer"
              points="330,114.9 326.5,117.5 319.3,125 313.4,133.7 310.8,139.6 310.1,142.8 310.3,144 311,146.2 313.1,150.5 315.9,154.4 319.3,157.5 321.1,158.8 323.9,160.3 330.6,161.7 335.3,161.9 339.6,161.8 346.1,161.3 350.5,159.9 353.5,157.4 354.7,155.6 355.9,153.3 357.1,148.2 356.9,142.7 355.2,136.6 353.7,133.3 350.8,127.7 348.9,124.7 347.3,122.3 344.9,118.7 343.2,116.3 339.7,114 337.3,113.7 335.3,113.7 331.4,114.3 330,114.9 330,114.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[7]}
              onClick={() => toggleStrokeColor(7)}
            />

            <polygon
              className="cursor-pointer"
              points="39.2,164.1 36.9,164.8 32.9,166.7 31.7,167.7 30.1,170.6 26.8,180.2 25.7,185.2 25,188.2 24,190.8 23.4,192.4 22.6,196.8 22.6,201.8 23.3,206.2 23.9,207.7 25.1,209.5 28.7,212.4 34.2,214.3 42,215.4 46.9,215.7 54,216 60,215.4 62.6,214.3 63.9,213.5 66.6,210.9 71.4,203.6 72.9,199.3 73.9,193.9 74.2,180.1 73.5,175.7 72.7,174.4 69.5,171.3 65.1,168.3 61,166.3 59.3,166 58.1,165.7 56.7,165.1 53.5,164.1 43.8,163.5 39.2,164.1 39.2,164.1"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[8]}
              onClick={() => toggleStrokeColor(8)}
            />

            <polygon
              className="cursor-pointer"
              points="344.9,165.9 341.1,167.2 334.6,170.7 331.7,173.1 326.3,178.2 327.1,189.9 327.4,194.4 328.6,201.7 330.7,207.2 334,211.6 336.1,213.7 337.4,214.7 340,216.1 345.5,216.9 352,217 356.6,216.9 364,216.1 369.6,214.4 374,211.5 376,209.5 377.1,208.2 377.9,206.9 377.7,206.7 377.3,206.9 376.8,207.1 377,206.6 377.7,205.9 378.9,204.8 379.4,202.5 378.7,201 378.1,199.7 377.7,197.2 377.9,196.2 378.1,195.4 377.7,194.9 377.1,195.1 376.4,195.4 376.1,194.8 376.4,193.9 376.6,192.9 375.9,191.2 374.9,190.5 374.1,189.9 373.8,189.1 374.4,189 375,188.9 375.9,188.1 376,187.5 375.9,187.1 375.3,186.7 374.8,186.9 374.3,186.9 373.7,185.3 373.6,183.9 373.4,181.4 372,175.8 369.7,170.7 367.1,167.1 365.7,166.2 363.4,165.5 358.5,164.6 353.3,164.5 347.8,165.2 344.9,165.9 344.9,165.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[9]}
              onClick={() => toggleStrokeColor(9)}
            />

            <polygon
              className="cursor-pointer"
              points="38,306.8 35.6,307.5 30.8,309.9 28.9,311.2 26.9,313.1 25.1,317.9 24.9,322.1 25.1,329.1 26.2,337.4 27.4,340.5 28,341.1 28.5,341.4 29.2,342.5 29.3,343.2 29.7,344.1 31.9,347.1 33.5,348.8 34.8,350 37.1,351.6 42,352.6 47.7,352.7 53.3,352.5 61,350.7 64.9,348.8 68.2,346.7 72.9,341.5 75.3,335.2 75.2,328.1 74.1,324.4 73,320.3 72.8,318.3 71.7,316.2 68.3,312 66.6,310.1 64,307.7 59.1,306.2 53.3,305.9 49,305.8 40.9,306.3 38,306.8 38,306.8"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[10]}
              onClick={() => toggleStrokeColor(10)}
            />

            <polygon
              className="cursor-pointer"
              points="338.7,307.7 336.3,309.2 332.3,313.6 329.4,319.5 327.8,326.9 327.5,331.1 327.3,336.3 328.2,340.8 330.1,343.1 331.5,344.5 333.1,346 337.1,348.6 343.9,351.4 353.7,353.2 360.6,352.8 364.5,351.7 366.1,350.8 367.8,349.5 370.9,346 373.2,341.8 374.1,338.3 373.9,337.1 373.6,336.6 373.8,336.2 374.3,336.4 374.9,336.6 376.1,336 376.5,335.3 376.7,334.5 375.9,333.5 374.9,333.3 373.8,333.2 373.8,332.6 374.8,332 375.8,331 376.9,326.8 377.1,323.3 376.9,319.4 375.4,314.4 373.6,312.1 372.3,310.9 368.8,308.9 362.3,306.6 352.2,305.3 344.8,305.8 340.5,306.9 338.7,307.7 338.7,307.7"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[11]}
              onClick={() => toggleStrokeColor(11)}
            />

            <polygon
              className="cursor-pointer"
              points="60,355.2 57.1,356.2 52.9,358.7 50.3,362.5 48.7,368.9 48,373.3 47.7,376.3 47.6,381.7 48.3,386.4 49.9,390.4 52.2,393.8 55.3,396.4 59.2,398.3 63.8,399.4 66.4,399.7 70.8,399.9 76.4,398.1 79.7,395.3 81.9,393.3 84.9,389.7 85.3,388.5 85.4,387.8 86.1,386.8 86.5,386.7 87.1,386.3 88.6,384.2 89.3,382.7 90.8,379.8 92,378.7 92.6,378.2 92.9,375.3 92.3,370.8 90.9,366.4 90,364.7 87.3,361.2 80.8,356.2 73.1,353.7 64.5,354 60,355.2 60,355.2"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[12]}
              onClick={() => toggleStrokeColor(12)}
            />

            <polygon
              className="cursor-pointer"
              points="323.3,354.9 321.3,355.8 317.5,358.1 314.3,361.3 311.7,365.4 310.5,367.7 309.2,371.1 309.2,375.5 310.7,378.4 313,383.1 315.2,387.5 317.4,390.8 324,397.4 326.4,398.8 330.8,399.4 338.8,399.2 345.4,397.1 350.2,393.3 351.9,390.8 352.9,388 354.1,380.8 353.9,372.7 352.4,365.2 351.2,362.1 349.7,359.3 345.6,356.2 342,355.1 336.5,353.9 327.4,353.9 323.3,354.9 323.3,354.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[13]}
              onClick={() => toggleStrokeColor(13)}
            />

            <polygon
              className="cursor-pointer"
              points="95.1,392.9 93.5,393.5 89.7,396 85.8,399.7 82.6,403.8 81.6,405.7 80.5,409.3 80.1,417.7 81.5,426.5 83.6,432 85.5,434.7 86.5,435.6 87.9,436.3 92.7,437.2 95.6,437.3 99.4,437.2 104.4,435.3 107.1,432.9 109.4,430.3 113.1,423.5 115.1,415.7 115.3,407.8 114.5,404 112.7,401.2 109.1,397.1 107.4,395.4 104.5,393.2 101.5,392.3 97.6,392.5 95.1,392.9 95.1,392.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[14]}
              onClick={() => toggleStrokeColor(14)}
            />

            <polygon
              className="cursor-pointer"
              points="296,393.7 294.5,394.8 291.1,398.5 289.6,400.7 288.1,403.7 287,409.4 287.2,413.3 288,419.2 289.9,426.4 291.8,430.1 294.2,433 297.2,435.2 300.6,436.6 304.7,437.2 306.9,437.3 310.4,437 314.7,435.4 316.9,433.6 319.5,429.6 321.2,422 321.5,417.2 321.3,413.1 319.9,406 317.1,400.3 312.9,396.1 310.4,394.7 308.1,393.7 304.1,392.4 300.8,392.2 297.6,393 296,393.7 296,393.7"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[15]}
              onClick={() => toggleStrokeColor(15)}
            />

            <polygon
              className="cursor-pointer"
              points="120.4,427.9 119.6,431.3 118.9,438.8 119.3,446.4 120.7,453.1 121.9,455.7 122.8,457.4 125.2,460.2 129.5,463.2 134.4,464.7 137.7,464.7 140.9,464 144,462.5 145.3,461.5 147,459.6 150,454.6 152.3,448.2 153.6,441.1 153.9,437.5 153.8,433.5 152.1,429.1 150,427.3 148,426.1 143,423.8 133.9,421.4 127.9,420.8 122.5,420.7 120.4,427.9 120.4,427.9"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[16]}
              onClick={() => toggleStrokeColor(16)}
            />

            <polygon
              className="cursor-pointer"
              points="266,422.1 259.6,424.4 253.5,427.1 247.7,429.9 248.4,438 249.2,445.2 251.6,455.7 254.4,460.6 256.8,462.7 259.7,464 263.3,464.5 265.3,464.5 267.7,464.4 271.9,463.7 275.3,462.2 278,459.9 280.1,456.8 281.5,452.7 282.4,444.8 282.4,438.1 282.1,431.8 280.7,424.7 279.5,422.8 278.4,421.7 276.3,420.5 271.5,420.7 266,422.1 266,422.1"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[17]}
              onClick={() => toggleStrokeColor(17)}
            />

            <polygon
              className="cursor-pointer"
              points="164.8,439.3 163.9,440.5 162.7,443.5 162.4,445.1 162.2,448.8 161.9,452.7 161.8,456.5 163.2,463.9 166.1,470.4 170.4,475.4 172.9,477.1 174.4,477.6 178.2,478.1 182.5,477.6 186.7,476.4 188.4,475.5 189.6,474.5 192,471.7 194.9,465.8 197.5,456.6 198.1,449.9 197.7,446 197.2,444.4 196.4,442.9 193.2,440.4 188.1,438.7 181.2,437.7 177.1,437.5 172.1,437.5 166.3,438.3 164.8,439.3 164.8,439.3"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[18]}
              onClick={() => toggleStrokeColor(18)}
            />

            <polygon
              className="cursor-pointer"
              points="209.2,440.4 204.7,443.3 205.1,453.3 205.4,457.5 207,464.9 209.7,470.7 213.6,474.8 215.9,476.1 217.3,476.9 219.1,478.4 219.2,478.9 219.2,479.2 220.5,479.2 221.7,478.8 224.3,478.1 225.7,478.3 226.5,478.4 229.3,477 232.7,474.1 235.9,470.6 236.9,468.9 237.9,466.3 239.1,458.2 239.3,448.9 238.5,441.6 237.6,439.7 236.2,438.7 230.2,437.7 224.8,437.6 219,437.7 211.9,439 209.2,440.4 209.2,440.4"
              strokeWidth={3}
              fill="transparent"
              stroke={polygonColors[19]}
              onClick={() => toggleStrokeColor(19)}
            />
          </svg>
        </Box>
        <Box
          component="form"
          boxShadow={5}
          className={`  rounded-2xl w-full h-full flex flex-col gap-2 border-2 md:w-[600px] ${formClass}`}
        >
          <Box className=" border-2 py-2    bg-[#4b9cec] overflow-hidden rounded-2xl"></Box>
          <Typography
            className="text-2xl font-bold text-center text-[#1976d2]"
            variant="h5"
          >
            Formulaire d'opération.
          </Typography>
          <Box className=" sm:mt-4 sm:ml-4 w-full flex flex-col gap-2 md:flex-row md:flex-wrap items-center  justify-center">
            <label
              htmlFor="standard-basic"
              className="w-full md:w-[160px] content-center text-center md:text-left"
            >
              Teeth selected:
            </label>
            <TextField id="nom" label="Nom" size="small" />
          </Box>
          <Box className="w-full sm:ml-4  flex flex-col gap-2 md:flex-row md:flex-wrap items-center  justify-center">
            <label
              htmlFor="standard-basic"
              className="w-full md:w-[160px] content-center text-center md:text-left"
            >
              Teeth selected:
            </label>
            <TextField id="nom" label="Nom" size="small" />
          </Box>
          <Box className="w-full sm:ml-4 flex flex-col gap-2 md:flex-row md:flex-wrap  justify-center items-center">
            <label
              htmlFor="standard-basic"
              className="w-full md:w-[160px] content-center text-center md:text-left"
            >
              Teeth selected:
            </label>
            <TextField id="nom" label="Nom" size="small" />
          </Box>
          <Box className="mt-2 mb-4 flex justify-center">
            <Button type="submit" variant="contained" sx={{ borderRadius: 16 }}>
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientOperation;
