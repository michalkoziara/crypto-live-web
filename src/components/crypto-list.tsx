import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, List, ListItemSecondaryAction, Modal, TextareaAutosize } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Favorite } from '../api/favorite';
import PropTypes from 'prop-types';
import { deleteFavorite, updateFavorite } from '../api/favorite-api';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
    center: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '10px',
    },
    paper: {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #FFF',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const CryptoList: React.FC<{ data: Favorite[] }> = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [favorite, setFavorite] = React.useState<Favorite | null>();

    const handleOpen = (favorite: Favorite) => {
        setOpen(true);
        setFavorite(favorite);
    };

    const handleClose = () => {
        setOpen(false);

        if (!!favorite) {
            updateFavorite(favorite).catch();
        }

        setFavorite(null);
    };

    if (props.data.length == 0) {
        return (
            <div className={classes.center}>
                <h4>Add currencies to watchlist!</h4>
            </div>
        );
    }

    const items = props.data.map((favorite) => {
        return (
            <ListItem key={favorite.coinFromSymbol + favorite.coinToSymbol} button>
                <ListItemText
                    primary={favorite.coinFromSymbol + favorite.coinToSymbol}
                    secondary={favorite.description}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(favorite)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteFavorite(favorite)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    return (
        <div className={classes.root}>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <h3 className={classes.center}>Edit description</h3>
                    <TextareaAutosize
                        className={classes.center}
                        rowsMax={4}
                        rowsMin={4}
                        onChange={(event) => {
                            const changedFavorite = favorite;

                            if (!!changedFavorite) {
                                changedFavorite.description = event.target.value as string;
                                setFavorite(changedFavorite);
                            }
                        }}
                        defaultValue={favorite?.description}
                    />
                </div>
            </Modal>
            <List dense>{items}</List>
        </div>
    );
};

CryptoList.propTypes = {
    data: PropTypes.any.isRequired,
};

export default CryptoList;
