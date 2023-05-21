import React from 'react';
import Dashboard from '../../components/Dashboard';
import useQueryDataCardDashBoard from '../../app/hooks/useQueryDataCardDashBoard';

type Props = {};

const DashboardContainer = (props: Props) => {
  const { data } = useQueryDataCardDashBoard();
  return (
    <Dashboard
      totalUser={data.totalUser}
      totalAmount={data.totalAmount}
      totalOrder={data.totalOrder}
      totalProduct={data.totalProduct}
    />
  );
};
export default DashboardContainer;
