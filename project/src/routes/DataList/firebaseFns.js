import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { dbService } from '../../firebase';

export const getOrder = async () => {
  const docRef = doc(dbService, 'order', 'order');
  const orderObj = await getDoc(docRef);
  return orderObj.data();
};
export const getObj = async ({ setProductList, setEveningNumber }) => {
  const q = query(collection(dbService, 'items'));
  const querySnapshot = await getDocs(q);
  const obj = [];
  const eveningObj = [];
  const orderObj = await getOrder();

  querySnapshot.forEach(doc => {
    const data = doc.data();
    obj.push(data);
    if (data.sort === '더이브닝') {
      eveningObj.push(data.id);
    }
  });

  obj.sort((a, b) => {
    return orderObj[a.id] - orderObj[b.id];
  });
  eveningObj.sort((a, b) => {
    return orderObj[a.id] - orderObj[b.id];
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
  await setDoc(doc(dbService, 'order', 'order'), orderObj);
};
