/**
  Property {
    id: string;
    title: string;
    rooms: string; // number => number + habitaciones,
    squaremeter: string; // number => number + m2,
    notes: string; // Truncate to 240 chars + ...
    price: string // number => number + €
    image: string; //First image from array (base 64)
    }
*/

//Mapear lista de propiedades
export const mapPropertyListFromApiToVM = (propertyList) => {
  return propertyList.map((property) => mapPropertyFromApiToVM(property));
};

//Mapear una sola entidad
const mapPropertyFromApiToVM = (property) => {
  return {
    id: property.id,
    title: property.title,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    squaremeter: `${property.squaremeter}m2`,
    notes: `${property.notes.substring(0, 240)}...`, //Truncamos el texto a 240 chars
    price: `${property.price.toLocaleString()}€`, //para que salga punto de milesimas
    image: Array.isArray(property.images) ? property.images[0] : '', //Array.isArray -> Devuelve un booleano si es distinto a undefined
  };
};

const getRoomWord = (rooms) => {
  return rooms > 1 ? 'habitaciones' : 'habitacion';
};

//mapper del filro para obtener los query params
export const mapFilterToQueryParams = (filter) => {
  let queryParams = '';

  if (filter.saleTypeId) {
    queryParams = `${queryParams}saleTypeIds_like=${filter.saleTypeId}&`;
  }
  if (filter.provinceId) {
    queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
  }
  if (filter.minRooms) {
    queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`;
  }
  if (filter.minBathrooms) {
    queryParams = `${queryParams}bathrooms_gte=${filter.minBathrooms}&`;
  }
  if (filter.minPrice) {
    queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
  }
  if (filter.maxPrice) {
    queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
  }
  //Quitamos el último &
  return queryParams.slice(0, -1);
};
