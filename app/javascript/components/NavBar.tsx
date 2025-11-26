import * as React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Tabs,
    Tab,
    Container,
    Box,
    Button,
    Menu,
    MenuItem,
    IconButton
} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AccountCircle} from '@mui/icons-material';
import {useAuth} from '~/contexts/AuthContext';


// Define route configuration
const ROUTES = [
    {label: "Properties", path: "/properties"},
    {label: "Landlords", path: "/landlords"},
    {label: "Addresses", path: "/addresses"},
    {label: "Map", path: "/map"},
    {label: "Keywords", path: "/keywords"},
    {label: "Transactions", path: "/transactions"}
] as const;

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // Define valid tab values
    const validTabValues = [
        "/properties",
        "/landlords",
        "/addresses",
        "/map",
        "/keywords",
        "/transactions"
    ];

    // Only set value if it matches a valid tab, otherwise use false
    const currentTab = validTabValues.includes(location.pathname) ? location.pathname : false;
    const [value, setValue] = React.useState(currentTab);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            mr: 4,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Rails-PG-App
                    </Typography>
                    <Box sx={{flexGrow: 1}}>
                        {user && (
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="navigation tabs"
                            >
                                {ROUTES.map((route) => (
                                    <Tab
                                        key={route.path}
                                        label={route.label}
                                        value={route.path}
                                        component={Link}
                                        to={route.path}
                                    />
                                ))}
                            </Tabs>
                        )}
                    </Box>
                    {user ? (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{display: 'flex', gap: 1}}>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button variant="outlined" component={Link} to="/register">
                                Register
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
