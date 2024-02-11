import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MedicationLiquidOutlinedIcon from "@mui/icons-material/MedicationLiquidOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";

import PeopleIcon from "@mui/icons-material/People";

import { Link } from "react-router-dom";
/* newly added  */
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";

import BadgeIcon from "@mui/icons-material/Badge";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Divider } from "@mui/material";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Accueille" />
      </ListItemButton>
    </Link>
    <Link to="/Appointments" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <DateRangeSharpIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Rendez-vous" />
      </ListItemButton>
    </Link>
    <Link to="/Patients" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItemButton>
    </Link>
    <Link to="/Ordonnance" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <MedicationLiquidOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Ordonnance" />
      </ListItemButton>
    </Link>
    <Link to="/Reglement" className="no-underline">
      <ListItemButton>
        <ListItemIcon>
          <RequestQuoteOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Règlement" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
interface Props {
  toggle: boolean;
  isSideBarOpen: boolean;
  handleClick: () => void;
}
export function SecondaryListItems({}: Props) {
  return (
    <React.Fragment>
      <Link to="/Nurses" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <BadgeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Gérer les infirmières" />
        </ListItemButton>
      </Link>

      <Divider />

      <Link to="/Files" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <ContentPasteSearchOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Documents" />
        </ListItemButton>
      </Link>
      <Link to="/Stock" className="no-underline">
        <ListItemButton>
          <ListItemIcon>
            <Inventory2OutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}
