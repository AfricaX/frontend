import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { getSections } from "../../api/section";
import CreateSectionsDialog from "./Sections CRUD/CreateSectionsDialog";
import { TimeToLeaveTwoTone } from "@mui/icons-material";
import ViewSectionsDialog from "./Sections CRUD/ViewSectionsDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SectionListDialog({
  openSectionListDialog,
  setOpenSectionListDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);

  /**
   * Retrieve Sections
   */

  const retrieve = () => {
    getSections(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
    retrieve();
  }, []);

  /**
   * Create Section Dialog
   */

  const [openCreateSectionDialog, setOpenCreateSectionDialog] = useState(false);

  const handleOpenCreateSectionDialog = () => {
    setOpenCreateSectionDialog(true);
  };

  /**
   * View Section
   */

  const [openViewSectionsDialog, setOpenViewSectionsDialog] = useState(null);

  const handleOpenViewSectionsDialog = (rows) => {
    setOpenViewSectionsDialog(rows);
  };

  return (
    <>
      <Dialog
        open={!!openSectionListDialog}
        TransitionComponent={Transition}
        fullScreen
        sx={{ margin: "50px" }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", marginTop: "40px" }}>
            <Box sx={{ margin: "10px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2f3a8f",
                    textAlign: "left",
                    margin: "10px 0px 0px 10px",
                  }}
                >
                  List Of Sections
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ position: "absolute", right: "40px", top: "65px" }}
                  onClick={handleOpenCreateSectionDialog}
                >
                  Create Section
                </Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  overflow: "auto",
                  marginRight: "20px",
                  marginTop: "20px",
                  border: "1px solid black",
                }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ background: "lightgrey" }}>
                        <TableCell align="center">Section ID</TableCell>
                        <TableCell align="center"> Section Name </TableCell>
                        <TableCell align="center"> Section Type </TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">
                            {" "}
                            {row.section_name}{" "}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            {row.section_type}
                          </TableCell>
                          <TableCell align="center">
                            <Box display={"flex"}>
                              <VisibilityIcon
                                sx={{ flex: 1 }}
                                cursor={"pointer"}
                                onClick={() => handleOpenViewSectionsDialog(row)}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenSectionListDialog(false)}
            >
              X
            </Button>
          </Box>

          <CreateSectionsDialog
            retrieve={retrieve}
            openCreateSectionDialog={openCreateSectionDialog}
            setOpenCreateSectionDialog={setOpenCreateSectionDialog}
          />

          <ViewSectionsDialog
          openViewSectionsDialog={openViewSectionsDialog}
          setOpenViewSectionsDialog={setOpenViewSectionsDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
