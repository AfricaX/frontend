import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import CreateSubjectDialog from "./Tools CRUD/CreateSubjectDialog";
import CreateRoomTypeDialog from "./Tools CRUD/CreateRoomTypeDialog";
import { getSubjects } from "../../api/subject";
import { useCookies } from "react-cookie";
import { retrieveRoomTypes } from "../../api/roomtype";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ToolsListDialog({
  openToolsListDialog,
  setOpenToolsListDialog,
}) {

    const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
    const [subjects, setSubjects] = useState([]);
    const [ roomtypes, setRoomTypes ] = useState([]);
/**
 * retrieve
 */

const retrieve = () => {
  getSubjects(cookies.AUTH_TOKEN).then((response) => {
    if (response?.ok) {
      setSubjects(response.data);
    }
  })

  retrieveRoomTypes(cookies.AUTH_TOKEN).then((response) => {
    if (response?.ok) {
      setRoomTypes(response.data);
    }
  })
};

  /**
   * Create Subject Dialog
   */

  const [openCreateSubjectDialog, setOpenCreateSubjectDialog] = useState(false);

  const handleOpenCreateSubjectDialog = () => {
    setOpenCreateSubjectDialog(true);
  };

  /**
   * Create Room Type Dialog
   */

  const [ openCreateRoomTypeDialog, setOpenCreateRoomTypeDialog ] = useState(false);

  const handleOpenCreateRoomTypeDialog = () => {
    setOpenCreateRoomTypeDialog(true);
  }

  useEffect(() => {
    retrieve();
  }, []);

  return (
    <>
      <Dialog open={!!openToolsListDialog} TransitionComponent={Transition}>
        <DialogContent>
          <Box sx={{ width: "200px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2f3a8f",
                    textAlign: "left",
                    margin: "10px",
                  }}
                >
                  Tools
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenToolsListDialog(null)}
                >
                  {" "}
                  X{" "}
                </Button>
              </Box>
            </Box>
            <Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenCreateSubjectDialog}
                >
                  {" "}
                  Create Subjects
                </Button>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenCreateRoomTypeDialog}
                >
                  {" "}
                  Create Room Type
                </Button>
              </Box>
            </Box>
          </Box>

          <CreateSubjectDialog
            retrieve={retrieve}
            openCreateSubjectDialog={openCreateSubjectDialog}
            setOpenCreateSubjectDialog={setOpenCreateSubjectDialog}
          />
          <CreateRoomTypeDialog
            retrieve={retrieve}
            openCreateRoomTypeDialog={openCreateRoomTypeDialog}
            setOpenCreateRoomTypeDialog={setOpenCreateRoomTypeDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
