import { useState } from 'react';

function useShippingCost() {
  const [shippingCosts, setShippingCosts] = useState({
    aboardCost: 0,
    domesticCost: 0,
    serviceCost: 0,
  });

  const costInputChange = e => {
    const id = e.target.id;
    const newCosts = {
      aboardCost: shippingCosts.aboardCost,
      domesticCost: shippingCosts.domesticCost,
      serviceCost: shippingCosts.serviceCost,
    };
    if (id === 'aboardCost') {
      newCosts.aboardCost = e.target.value;
    } else if (id === 'domesticCost') {
      newCosts.domesticCost = e.target.value;
    } else if (id === 'serviceCost') {
      newCosts.serviceCost = e.target.value;
    }
    setShippingCosts(newCosts);
  };

  return { shippingCosts, setShippingCosts, costInputChange };
}

export default useShippingCost;
