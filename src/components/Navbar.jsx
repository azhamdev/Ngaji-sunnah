import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import LogoBaru from "../assets/logo.png"
import { SearchBar } from "../components"

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: "#000",
      top: 0,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={LogoBaru} alt="Logo" height={45} />
      <Typography variant="h6" ml={2} fontWeight="bold" color="#B3E8E5">
        Ngaji Sunnah
      </Typography>
    </Link>
    <SearchBar />
  </Stack>
)

export default Navbar
