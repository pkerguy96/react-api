//@ts-nocheck
import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";
import rasszb from "/MRBRAIN.DCM?url";

const app = new dwv.App();
const tools = {
  WindowLevel: {},
  ZoomAndPan: {},
  Opacity: {},
  Scroll: {},
  Livewire: {},
  Floodfill: {},
  Draw: {
    options: [
      "Arrow",
      "Ruler",
      "Protractor",
      "Rectangle",
      "Roi",
      "Ellipse",
      "Circle",
      "FreeHand",
    ],
  },
};
window.a = app;
const actions = {
  WindowLevel: () => {
    app.setTool("WindowLevel");
  },
  ZoomAndPan: () => {
    app.setTool("ZoomAndPan");
  },
  Opacity: () => {
    app.setTool("Opacity");
  },
  Scroll: () => {
    app.setTool("Scroll");
  },
  Livewire: () => {
    app.setTool("Livewire");
  },
  Floodfill: () => {
    app.setTool("Floodfill");
  },
  Undo: () => {
    app.undo();
  },
  Redo: () => {
    app.redo();
  },
  Reset: () => {
    app.resetDisplay();
  },
  Draw: (shape, color) => {
    app.setTool("Draw");
    app.setToolFeatures({
      shapeName: shape,
      shapeColour: color,
    });
  },
};

const DicomPageViewer = () => {
  useEffect(() => {
    const wrap = document.querySelector("#Dicom");
    if (!wrap.dataset.t) {
      wrap.dataset.t = "true";
      app.init({
        dataViewConfigs: {
          "*": [
            {
              divId: "Dicom",
            },
          ],
        },
        tools: tools,
      });

      app.loadURLs([rasszb]);

      window.addEventListener("resize", () => {
        app.onResize();
      });
    }

    return window.removeEventListener("resize", () => {
      app.onResize();
    });
  }, []);

  return (
    <Paper>
      <Box className="flex">
        <Button variant="outlined" onClick={() => actions["WindowLevel"]()}>
          WindowLevel
        </Button>
        <Button variant="outlined" onClick={() => actions["ZoomAndPan"]()}>
          ZoomAndPan
        </Button>
        <Button variant="outlined" onClick={() => actions["Opacity"]()}>
          Opacity
        </Button>
        <Button variant="outlined" onClick={() => actions["Scroll"]()}>
          Scroll
        </Button>
        <Button variant="outlined" onClick={() => actions["Livewire"]()}>
          Livewire
        </Button>
        <Button variant="outlined" onClick={() => actions["Floodfill"]()}>
          Floodfill
        </Button>
        <Button variant="outlined" onClick={() => actions["Undo"]()}>
          Undo
        </Button>
        <Button variant="outlined" onClick={() => actions["Redo"]()}>
          Redo
        </Button>
        <Button variant="outlined" onClick={() => actions["Reset"]()}>
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={() => actions["Draw"]("Ellipse", "red")}
        >
          rsm
        </Button>
      </Box>
      <Box>
        <Box id="Dicom" className="relative w-full aspect-[16/7]"></Box>
      </Box>
    </Paper>
  );
};
export default DicomPageViewer;
