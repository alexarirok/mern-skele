import React, { useState, useEffect } from 'react'
import { CardActions, List, ListItemAvatar, ListItemText, Typography, ListItem, Avatar, Divider, ListItemSecondaryAction, IconButton, makeStyles } from "@material-ui/core";
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import DeleteUser from'./DeleteUser'
import { read } from "./api-user.js";
import {Redirect, Link } from "react-router-dom";
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}))

export default function Profile({ match }) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect (() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }   
    }, [match.params.userId])

        if (redirectToSignin) {
            return <Redirect to='/signin'/>
        }

        return  (
            <Paper className={classes.root} elevation={4}>
                <Typography variant="h6" className={classes.title}>
                    Profile
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person /> 
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} /> { 
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                        (<ListItemSecondaryAction>
                            <Link to={"/user/edit/" + user._id}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>
                            <DeleteUser userId={user._id}/>
                        </ListItemSecondaryAction>)}
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary={"Joined: " + (
                                new Date(user.created)).toDateString()}/>
                        </ListItem>
                    </List>
            </Paper>
    )
}