import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Container,
  Typography,
} from "@mui/material";
import Recents from "../../UI/Recents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewRoomsDialog({
  openViewRoomsDialog,
  setOpenViewRoomsDialog,
}) {
  return (
    <>
      <Dialog
        open={openViewRoomsDialog}
        TransitionComponent={Slide}
        fullScreen
        sx={{ margin: "50px" }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Container>
            <Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2f3a8f",
                    textAlign: "left",
                    margin: "10px",
                  }}
                >
                  Viewing Room - Room 332
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    width: "700px",
                    height: "250px",
                    border: "1px solid black",
                  }}
                >
                  <img
                    src="src/assets/logo.png"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

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
                    Room Type Here
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae velit numquam vel unde recusandae dicta cupiditate enim molestias quibusdam, provident id delectus atque itaque nisi laboriosam, eligendi mollitia repellat, corrupti in. Maiores molestias sed voluptatibus saepe, officia dicta sapiente fugiat ipsum id? Aliquam, accusantium doloremque facere illum blanditiis molestias vero.
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                    <Recents />
                </Box>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button sx={{position: "absolute", right: "20px", top: "10px"}} onClick={() => setOpenViewRoomsDialog(false)} variant="outlined">X</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
