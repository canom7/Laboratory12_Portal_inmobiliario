import Axios from 'axios';

//Properties
const propertyListUrl = `${process.env.BASE_API_URL}/properties`;

export const getPropertyList = (queryParams) =>
  Axios.get(`${propertyListUrl}?${queryParams}`).then((response) => {
    return response.data;
  });

//SaleTypes
const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypeList = () =>
  Axios.get(saleTypeListUrl).then(({ data }) => data);

//Provinces
const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

export const getProvinceList = () =>
  Axios.get(provinceListUrl).then(({ data }) => data);
