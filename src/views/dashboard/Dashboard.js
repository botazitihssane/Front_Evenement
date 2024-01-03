import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  MenuItem,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterState, setFilterState] = useState("");

  const fetchData = () => {
    fetch("https://mocki.io/v1/e4f5e453-0a6e-45df-87e3-d798147575cf")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const getStatusIcon = (etat) => {
    switch (etat.toLowerCase()) {
      case "pending":
        return (
          <HourglassEmptyIcon
            style={{
              color: "#FFA500",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          />
        );
      case "accepted":
        return (
          <CheckCircleOutlineIcon
            style={{
              color: "#00FF00",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          />
        );
      case "rejected":
        return (
          <ErrorOutlineIcon
            style={{
              color: "#FF0000",
              verticalAlign: "middle",
              marginRight: "5px",
            }}
          />
        );
      default:
        return null;
    }
  };

  const getRowColor = (etat) => {
    switch (etat.toLowerCase()) {
      case "pending":
        return "#FFF3E0";
      case "accepted":
        return "#E8F5E9";
      case "rejected":
        return "#FFEBEE";
      default:
        return "#FFFFFF";
    }
  };

  const handleAccept = (taskId) => {
    console.log(`Task ${taskId} accepted`);
  };

  const handleReject = (taskId) => {
    console.log(`Task ${taskId} rejected`);
  };

  const filteredData = data.filter(
    (item) =>
      filterState === "" ||
      item.etat.toLowerCase() === filterState.toLowerCase()
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Task Dashboard</h1>
      <FormControl style={{ marginBottom: "16px", minWidth: "200px" }}>
        <InputLabel id="filter-state-label">Filter by State</InputLabel>
        <Select
          labelId="filter-state-label"
          id="filter-state"
          value={filterState}
          onChange={handleStateChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date Debut</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Etat</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                style={{ backgroundColor: getRowColor(item.etat) }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.titre}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.dateDebut}</TableCell>
                <TableCell>{item.dateFin}</TableCell>
                <TableCell>{item.budget}</TableCell>
                <TableCell>
                  {getStatusIcon(item.etat)}
                  {item.etat}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => handleAccept(item.id)}
                      disabled={
                        item.etat.toLowerCase() === "accepted" ||
                        item.etat.toLowerCase() === "rejected"
                      }
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleReject(item.id)}
                      disabled={
                        item.etat.toLowerCase() === "accepted" ||
                        item.etat.toLowerCase() === "rejected"
                      }
                    >
                      <ErrorOutlineIcon />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
