import {
  getPropertyDetails,
  getEquipment,
  sendContact,
} from './property-detail.api';
import { history } from '../../core/router/history';
import { mapPropertyFromApiToVm } from './property-detail.mappers';
import { setPropertyValues } from './property-detail.helpers';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { formValidation } from './property-detail.validations';

const params = history.getParams();

Promise.all([getPropertyDetails(params.id), getEquipment()]).then(
  ([propertyList, equipmentsList]) => {
    loadProperty(propertyList, equipmentsList);
  }
);

const loadProperty = (propertyList, equipmentsList) => {
  const vMProperty = mapPropertyFromApiToVm(propertyList, equipmentsList);
  setPropertyValues(vMProperty);
};

let contact = {
  email: '',
  message: '',
};

onUpdateField('email', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    email: value,
  };
  formValidation.validateField('email', contact.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('message', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    message: value,
  };
  formValidation.validateField('message', contact.message).then((result) => {
    onSetError('message', result);
  });
});

const clearContactInfo = () => {
  const email = document.getElementById('email');
  email.value = '';
  const message = document.getElementById('message');
  message.value = '';
};

onSubmitForm('contact-button', () => {
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      alert(
        'Hemos recibido su petición. Contactaremos con usted lo antes posible.'
      );
      sendContact(contact).then((isValid) => {
        clearContactInfo();
      });
    }
  });
});
