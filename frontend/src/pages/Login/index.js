import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid"; 
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { versionSystem } from "../../../package.json";
import { i18n } from "../../translate/i18n";
import { nomeEmpresa } from "../../../package.json";
import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";
import {LanguageOutlined} from "@material-ui/icons";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import LanguageControl from "../../components/LanguageControl";


const Copyright = () => {
	return (
		<Typography variant="body2" color="primary" align="center">
			{"Copyright "}
 			<Link color="primary" href="#">
 				{ nomeEmpresa } - v { versionSystem }
 			</Link>{" "}
 			{new Date().getFullYear()}
 			{"."}
 		</Typography>
 	);
 };

const useStyles = makeStyles(theme => ({
	root: {
		width: "100vw",
		height: "100vh",
		background: theme.palette.type === 'light' ? 
			"linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
			"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
		backgroundAttachment: "fixed",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		position: "relative",
		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: theme.palette.type === 'light' ? 
				"radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)" :
				"radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
			animation: "$backgroundAnimation 15s ease-in-out infinite",
		}
	},
	"@keyframes backgroundAnimation": {
		"0%, 100%": {
			opacity: 1,
		},
		"50%": {
			opacity: 0.8,
		},
	},
	paper: {
		backgroundColor: theme.palette.type === 'light' ? 
			'rgba(255, 255, 255, 0.95)' : 
			'rgba(30, 41, 59, 0.95)',
		backdropFilter: "blur(20px)",
		border: theme.palette.type === 'light' ? 
			'1px solid rgba(255, 255, 255, 0.2)' : 
			'1px solid rgba(139, 92, 246, 0.2)',
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "60px 40px",
		borderRadius: "24px",
		boxShadow: theme.palette.type === 'light' ? 
			"0 25px 50px -12px rgba(0, 0, 0, 0.25)" :
			"0 25px 50px -12px rgba(0, 0, 0, 0.5)",
		position: "relative",
		zIndex: 1,
		minWidth: "400px",
		maxWidth: "500px",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		"&:hover": {
			transform: "translateY(-8px)",
			boxShadow: theme.palette.type === 'light' ? 
				"0 35px 60px -12px rgba(0, 0, 0, 0.3)" :
				"0 35px 60px -12px rgba(0, 0, 0, 0.6)",
		}
	},
	avatar: {
		margin: theme.spacing(1),  
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(2),
		"& .MuiTextField-root": {
			marginBottom: theme.spacing(2),
			"& .MuiOutlinedInput-root": {
				borderRadius: "12px",
				transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				backgroundColor: theme.palette.type === 'light' ? 
					'rgba(255, 255, 255, 0.8)' : 
					'rgba(51, 65, 85, 0.8)',
				"&:hover": {
					backgroundColor: theme.palette.type === 'light' ? 
						'rgba(255, 255, 255, 0.9)' : 
						'rgba(51, 65, 85, 0.9)',
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				},
				"&.Mui-focused": {
					backgroundColor: theme.palette.type === 'light' ? 
						'rgba(255, 255, 255, 1)' : 
						'rgba(51, 65, 85, 1)',
					boxShadow: theme.palette.type === 'light' ? 
						"0 0 0 3px rgba(103, 126, 234, 0.1)" :
						"0 0 0 3px rgba(139, 92, 246, 0.2)",
				}
			}
		}
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		padding: theme.spacing(1.5, 4),
		background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		borderRadius: "12px",
		fontSize: "16px",
		fontWeight: 600,
		textTransform: "none",
		boxShadow: "0 4px 15px 0 rgba(103, 126, 234, 0.4)",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		"&:hover": {
			background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
			transform: "translateY(-2px)",
			boxShadow: "0 8px 25px 0 rgba(103, 126, 234, 0.5)",
		},
		"&:active": {
			transform: "translateY(0px)",
		}
	},
	powered: {
		color: "white"
	},
	languageControl: {
		position: "absolute",
		top: 0,
		left: 0,
		paddingLeft: 15
	}
}));

const Login = () => {
	const classes = useStyles();

	const [user, setUser] = useState({ email: "", password: "" });

	// Languages
	const [anchorElLanguage, setAnchorElLanguage] = useState(null);
	const [menuLanguageOpen, setMenuLanguageOpen] = useState(false);

	const { handleLogin } = useContext(AuthContext);

	const handleChangeInput = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handlSubmit = e => {
		e.preventDefault();
		handleLogin(user);
	};

	const handlemenuLanguage = ( event ) => {
		setAnchorElLanguage(event.currentTarget);
		setMenuLanguageOpen( true );
	}

	const handleCloseMenuLanguage = (  ) => {
		setAnchorElLanguage(null);
		setMenuLanguageOpen(false);
	}
	
	return (
		<div className={classes.root}>
		<div className={classes.languageControl}>
			<IconButton edge="start">
				<LanguageOutlined
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handlemenuLanguage}
					variant="contained"
					style={{ color: "white",marginRight:10 }}
				/>
			</IconButton>
			<Menu
				id="menu-appbar-language"
				anchorEl={anchorElLanguage}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={menuLanguageOpen}
				onClose={handleCloseMenuLanguage}
			>
				<MenuItem>
					<LanguageControl />
				</MenuItem>
			</Menu>
		</div>
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<div>
					<img style={{ margin: "0 auto", width: "70%" }} src={logo} alt="Whats" />
				</div>
				{/*<Typography component="h1" variant="h5">
					{i18n.t("login.title")}
				</Typography>*/}
				<form className={classes.form} noValidate onSubmit={handlSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={i18n.t("login.form.email")}
						name="email"
						value={user.email}
						onChange={handleChangeInput}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={i18n.t("login.form.password")}
						type="password"
						id="password"
						value={user.password}
						onChange={handleChangeInput}
						autoComplete="current-password"
					/>
					
					{/* <Grid container justify="flex-end">
					  <Grid item xs={6} style={{ textAlign: "right" }}>
						<Link component={RouterLink} to="/forgetpsw" variant="body2">
						  Esqueceu sua senha?
						</Link>
					  </Grid>
					</Grid>*/}
					
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{i18n.t("login.buttons.submit")}
					</Button>
					{ <Grid container>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								component={RouterLink}
								to="/signup"
							>
								{i18n.t("login.buttons.register")}
							</Link>
						</Grid>
					</Grid> }
				</form>
			
			</div>
			<Box mt={8}><Copyright /></Box>
		</Container>
		</div>
	);
};

export default Login;
