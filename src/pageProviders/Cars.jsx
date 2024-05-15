import * as authorities from 'constants/authorities';
import CarsPage from 'pages/cars';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';

const Cars = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <CarsPage {...props} />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default Cars;
