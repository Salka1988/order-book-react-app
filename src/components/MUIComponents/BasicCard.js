import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { ReactVirtualizedTable } from './VirtualizedTable';
import { useSelector } from 'react-redux';
import { selectSetPair } from '../../redux/selectors/defaultSelectors';

export const BasicCard = ({ title, values }) => {
  let selectedPair = useSelector(selectSetPair);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        {selectedPair === '' ? (
          <Typography gutterBottom variant="h5" component="div">
            Please choose one pair
          </Typography>
        ) : (
          <ReactVirtualizedTable values={values} title={title} />
        )}
      </CardContent>
    </Card>
  );
};

BasicCard.propTypes = {
  title: PropTypes.string,
  values: PropTypes.array,
};
