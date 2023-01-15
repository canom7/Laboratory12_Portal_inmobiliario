import Axios from 'axios';

//Properties
const propertyUrl = `${process.env.BASE_API_URL}/properties`;

export const getPropertyDetails = (id) =>
  Axios.get(`${propertyUrl}/${id}`).then(({ data }) => data);

//Equipments
const equipmentsUrl = `${process.env.BASE_API_URL}/equipments`;

export const getEquipment = () =>
  Axios.get(equipmentsUrl).then(({ data }) => data);

//Contact
const urlContact = `${process.env.BASE_API_URL}/contact`;

export const sendContact = (contact) =>
  Axios.post(urlContact, contact).then(({ data }) => data);
