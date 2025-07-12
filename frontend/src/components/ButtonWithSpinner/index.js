import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { CircularProgress, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	button: {
		position: "relative",
		borderRadius: "12px",
		padding: "10px 20px",
		fontWeight: 600,
		textTransform: "none",
		fontSize: "14px",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		background: theme.palette.type === 'light' ? 
			"linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
			"linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
		color: "#ffffff",
		border: "none",
		boxShadow: "0 4px 15px 0 rgba(103, 126, 234, 0.4)",
		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow: "0 8px 25px 0 rgba(103, 126, 234, 0.5)",
			background: theme.palette.type === 'light' ? 
				"linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)" : 
				"linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
		},
		"&:active": {
			transform: "translateY(0px)",
		},
		"&:disabled": {
			opacity: 0.6,
			transform: "none",
			cursor: "not-allowed",
		}
	},
	buttonProgress: {
		color: "#ffffff",
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}));

const ButtonWithSpinner = ({ loading, children, ...rest }) => {
	const classes = useStyles();

	return (
		<Button className={classes.button} disabled={loading} {...rest}>
			{children}
			{loading && (
				<CircularProgress size={24} className={classes.buttonProgress} />
			)}
		</Button>
	);
};

export default ButtonWithSpinner;
