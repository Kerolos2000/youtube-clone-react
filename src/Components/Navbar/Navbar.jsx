import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import { Logout, Mic, Search, VideoCallOutlined } from "@mui/icons-material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import WifiTetheringOutlinedIcon from "@mui/icons-material/WifiTetheringOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Avatar, Button, Divider, ListItemIcon } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { search } from "../../Context/search";
import { userDataContext } from "../../Context/userDataContext";
import logo from "../../img/YouTube_Logo_2017.svg.webp";
import avatar from "../../img/unnamed.jpg";
import style from "./Navbar.module.css";

export default function NavbarComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentYear = new Date().getFullYear();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const inputRef = useRef(null);
  const searchX = useContext(search);
  const dataX = useContext(userDataContext);

  const navigate = useNavigate();
  function x() {
    if (inputRef.current.value !== "") {
      navigate(`/search/${inputRef.current.value}`);
    }
  }

  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
    dataX.setData(null);
  }

  let { id } = useParams();
  useEffect(() => {
    if (id !== "") {
      searchX.callApi(id);
    }
  }, [id]);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid className={style.containerFluid}>
          <div className={style.left}>
            {dataX.data && (
              <Button
                color="error"
                className={style.MenuIcon}
                onClick={handleShow}
              >
                <MenuIcon />
              </Button>
            )}

            <Navbar.Brand className={style.navbarBrand}>
              <Link className="h3" to={"/"}>
                <img src={logo} alt="youtube" className={style.logo} />
              </Link>
            </Navbar.Brand>
          </div>

          {dataX.data && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchX.callApi(inputRef.current.value);
                x();
              }}
              className={style.med}
            >
              <input
                ref={inputRef}
                className={`form-control ${style.mainSearch}`}
                placeholder="search"
                type="search"
              />
              <Button color="error" type="submit" className={style.mainBtn}>
                <Search />
              </Button>
              <Button color="error" className={style.mic}>
                <Mic />
              </Button>
            </form>
          )}

          {dataX.data ? (
            <div className={style.right}>
              <Button color="error" className={style.MenuIcon}>
                <VideoCallOutlined />
              </Button>
              <Button color="error" className={style.MenuIcon}>
                <NotificationsOutlinedIcon />
              </Button>
              <Button
                color="error"
                onClick={handleClick}
                className={style.MenuIcon}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                </Avatar>
              </Button>
            </div>
          ) : (
            <Nav>
              <Nav.Item className="nav-item">
                <NavLink
                  className={`${style.navLink} nav-link`}
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <NavLink
                  className={`${style.navLink} nav-link`}
                  to="/register"
                >
                  Register
                </NavLink>
              </Nav.Item>
            </Nav>
          )}
        </Container>
      </Navbar>

      {dataX.data && (
        <Offcanvas className={style.offcanvas} show={show} onHide={handleClose}>
          <Offcanvas.Header className={style.header}>
            <Button
              color="error"
              className={style.MenuIcon}
              onClick={handleClose}
            >
              <MenuIcon />
            </Button>
            <Navbar.Brand className={style.navbarBrand}>
              <Link className="h3" to={"/"}>
                <img src={logo} alt="youtube" className={style.logo} />
              </Link>
            </Navbar.Brand>
          </Offcanvas.Header>
          <Offcanvas.Body className={style.body}>
            <div className={style.part1}>
              <Button color="inherit">
                <Link>
                  <HomeOutlinedIcon /> Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <AutoAwesomeOutlinedIcon /> Shorts
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <SubscriptionsOutlinedIcon /> subscriptions
                </Link>
              </Button>
            </div>
            <NavDropdown.Divider className={style.dropdownDivider} />

            <div className={style.part2}>
              <Button color="error">
                <Link>
                  <VideoLibraryOutlinedIcon /> Library
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <HistoryIcon /> History
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <WatchLaterOutlinedIcon /> Watch Later
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <ThumbUpOutlinedIcon /> Liked Videos
                </Link>
              </Button>
            </div>
            <NavDropdown.Divider className={style.dropdownDivider} />

            <div className={style.part3}>
              <p className="h6 py-2">Subscriptions</p>
              <Button color="inherit">
                <Link>
                  <img
                    className={`${style.avatar} me-2`}
                    src={avatar}
                    alt="avatar"
                  />
                  Kerolos Magdy
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <img
                    className={`${style.avatar} me-2`}
                    src={avatar}
                    alt="avatar"
                  />
                  Kerolos Magdy
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <img
                    className={`${style.avatar} me-2`}
                    src={avatar}
                    alt="avatar"
                  />
                  Kerolos Magdy
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <img
                    className={`${style.avatar} me-2`}
                    src={avatar}
                    alt="avatar"
                  />
                  Kerolos Magdy
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <img
                    className={`${style.avatar} me-2`}
                    src={avatar}
                    alt="avatar"
                  />
                  Kerolos Magdy
                </Link>
              </Button>
            </div>
            <NavDropdown.Divider className={style.dropdownDivider} />

            <div className={style.part4}>
              <p className="redColor h6 py-2">Explore</p>
              <Button color="error">
                <Link>
                  <WhatshotOutlinedIcon /> Trending
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <MusicNoteOutlinedIcon /> Music
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <WifiTetheringOutlinedIcon /> Live
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <SportsEsportsOutlinedIcon /> Gaming
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <EmojiEventsOutlinedIcon /> Sports
                </Link>
              </Button>
            </div>
            <NavDropdown.Divider className={style.dropdownDivider} />

            <div className={style.part5}>
              <p className="h6 py-2">More from YouTube</p>
              <Button color="inherit">
                <Link>
                  <YouTubeIcon /> YouTube Premium
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <YouTubeIcon /> YouTube Music
                </Link>
              </Button>
              <Button color="inherit">
                <Link>
                  <YouTubeIcon /> YouTube Kids
                </Link>
              </Button>
            </div>
            <NavDropdown.Divider className={style.dropdownDivider} />

            <div className={style.part6}>
              <Button color="error">
                <Link>
                  <SettingsOutlinedIcon /> Settings
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <OutlinedFlagIcon /> Report history
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <HelpOutlineOutlinedIcon /> Help
                </Link>
              </Button>
              <Button color="error">
                <Link>
                  <FeedbackOutlinedIcon /> Send feedback
                </Link>
              </Button>
            </div>

            <div className={style.part7}>
              <Link>About</Link>
              <Link>Press</Link>
              <Link>Copyright</Link>
              <Link>Contact us</Link>
              <Link>Creators</Link>
              <Link>Advertise</Link>
              <Link>Developers</Link>
            </div>

            <div className={style.part8}>
              <Link>Terms</Link>
              <Link>Privacy</Link>
              <Link>Policy &amp; Safety</Link>
              <Link>How YouTube works</Link>
              <Link>Test new features</Link>
            </div>

            <p className="my-2 small text-muted">© {currentYear} Google LLC</p>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      <>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseProfile}
          onClick={handleCloseProfile}
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
        >
          <MenuItem onClick={handleClose}>
            <Link className="d-flex align-items-center">
              <Avatar sx={{ width: 32, height: 32 }} />
              {dataX?.data?.name}
            </Link>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    </>
  );
}
