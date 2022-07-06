import { LABLES } from '../../constant';
import { InputCost, SettingBox } from './style';

function ShippingWarpper({ editable, shippingCosts, costInputChange }) {
  return (
    <div>
      {LABLES.map(lable => (
        <SettingBox key={lable.id}>
          <label>{lable.name}</label>
          <InputCost
            type="number"
            readOnly={!editable}
            onChange={e => costInputChange(e)}
            id={lable.id}
            value={shippingCosts[lable.id]}
            as="input"
          />
        </SettingBox>
      ))}
    </div>
  );
}

export default ShippingWarpper;
