import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';

export const getObj = async ({ setProductList, setEveningNumber }) => {
  const q = query(collection(dbService, 'items'), orderBy('indexNumber'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  const obj = [];
  const eveningObj = [];

  const orderObj = () => {};
  querySnapshot.forEach(doc => {
    const data = doc.data();
    obj.push(data);
    if (data.sort === '더이브닝') {
      eveningObj.push(data.id);
    }
  });
  setProductList(obj);
  setEveningNumber(eveningObj);
};

export const getCost = async setShippingCosts => {
  const docRef = doc(dbService, 'cost', 'shippingCosts');
  const docSnap = await getDoc(docRef);
  setShippingCosts(docSnap.data());
};

export const saveShippingCosts = async shippingCosts => {
  await setDoc(doc(dbService, 'cost', 'shippingCosts'), shippingCosts);
};

export const saveOrder = async productList => {
  const orderObj = {};
  productList.forEach((item, idx) => {
    orderObj[item.id] = idx;
  });
  console.log(orderObj);
};
