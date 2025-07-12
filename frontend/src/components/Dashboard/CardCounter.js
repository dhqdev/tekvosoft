import React from "react";

import { Avatar, Card, CardHeader, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { makeStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	cardAvatar: {
		fontSize: '48px',
		color: 'rgba(255, 255, 255, 0.9)',
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
		backdropFilter: 'blur(10px)',
		width: theme.spacing(8),
		height: theme.spacing(8),
		border: '2px solid rgba(255, 255, 255, 0.2)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		'&:hover': {
			transform: 'scale(1.05)',
			backgroundColor: 'rgba(255, 255, 255, 0.25)',
		}
	},
	cardTitle: {
		fontSize: '24px',
		fontWeight: 700,
		color: '#ffffff',
		textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
		letterSpacing: '0.5px',
	},
	cardSubtitle: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontSize: '14px',
		fontWeight: 500,
		textTransform: 'uppercase',
		letterSpacing: '1px',
		marginTop: '4px',
	}
}));

export default function CardCounter(props) {
    const { icon, title, value, loading } = props
	const classes = useStyles();
    return ( !loading ? 
        <Card>
            <CardHeader
                avatar={
                    <Avatar className={classes.cardAvatar}>
                        {icon}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" component="h2" className={classes.cardTitle}>
                        { title }
                    </Typography>
                }
                subheader={
                    <Typography variant="subtitle1" component="p" className={classes.cardSubtitle}>
                        { value }
                    </Typography>
                }
            />
        </Card>
        : <Skeleton variant="rect" height={80} />
    )
    
}