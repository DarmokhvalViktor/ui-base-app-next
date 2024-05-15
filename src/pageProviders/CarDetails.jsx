import * as authorities from 'constants/authorities';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';
import CarDetails from "../pages/carDetails";

const CarDetailsProvider = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <CarDetails {...props} />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default CarDetailsProvider;