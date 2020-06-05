import React, {useState} from 'react'
import propTypes from 'prop-types'
import { remove } from "./user/api-user.js"
import auth from './../auth-helper'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import {Redirect} from 'react-router-dom'

export default function DeleteUser(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }

    const deleteAccount = () => {
        remove({
            userId: ProgressPlugin.userId
        }, {t: jwt.token}).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    
    if (redirect) {
        return <Redirect to='/'/>
    }

        return (<span>
            <IconButton aria-label="Delete"
                onClick={clickButton} color="secondary">
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{"Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete Account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">Cancel</Button>
                    <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>)
}
DeleteUser.propTypes = {
    userId: propTypes.string.isRequired
}

