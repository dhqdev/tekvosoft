import React from "react";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketHeaderSkeleton from "../TicketHeaderSkeleton";

const useStyles = makeStyles(theme => ({
	ticketHeader: {
		display: "flex",
		background: theme.palette.type === 'light' ? 
			"linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" : 
			"linear-gradient(135deg, #1e293b 0%, #334155 100%)",
		backdropFilter: "blur(10px)",
		borderBottom: theme.palette.type === 'light' ? 
			"1px solid rgba(0, 0, 0, 0.05)" : 
			"1px solid rgba(255, 255, 255, 0.05)",
		boxShadow: theme.palette.type === 'light' ? 
			"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" :
			"0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
		flex: "none",
		borderRadius: "12px 12px 0 0",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap"
		}
	},
}));


const TicketHeader = ({ loading, children }) => {
	const classes = useStyles();

	return (
		<>
			{loading ? (
				<TicketHeaderSkeleton />
			) : (
				<Card square className={classes.ticketHeader}>
					{children}
				</Card>
			)}
		</>
	);
};

export default TicketHeader;
