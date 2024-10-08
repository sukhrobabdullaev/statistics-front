import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import { decodedToken } from "../helpers";

const Navbar = () => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("template_id");
    navigate("/", { replace: true });
  };

  // mui configs
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="border-b bg-gray-100">
      <div className="p-2 max-w-[1400px]  mx-auto flex justify-between items-center">
        {decodedToken && !decodedToken.is_superuser ? (
          <Link
            to={
              decodedToken && decodedToken.is_staff
                ? "/staff-dashboard"
                : "/boss-dashboard"
            }
          >
            <img
              src="/imgs/panel_hsat_logo.png"
              alt="hsat logo"
              className="w-28"
            />
          </Link>
        ) : (
          <Link to={decodedToken && decodedToken.is_superuser && "/superuser"}>
            <img
              src="/imgs/panel_hsat_logo.png"
              alt="hsat logo"
              className="w-28"
            />
          </Link>
        )}
        <div className="flex items-center gap-2 pr-4">
          <Link>
            <Tooltip title="Mening hisobim">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <AiOutlineUser
                  size={25}
                  className="text-blue-600 hover:text-black transition-all"
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              itemHoverBg="red"
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> {decodedToken && decodedToken.username}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
