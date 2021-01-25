import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

interface IRenderRow {
    index: number;
    style?: CSSProperties;
}

function renderRow(props: IRenderRow) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

const CryptoList: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={350} width={315} itemSize={46} itemCount={200}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
};

export default CryptoList;
