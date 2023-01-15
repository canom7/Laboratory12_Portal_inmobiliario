export const mapPropertyFromApiToVm = (property, equipmentsList) => {
  return {
    id: property.id,
    mainImage: Array.isArray(property.images) ? property.images[0] : '',
    title: property.title,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    squareMeter: `${property.squareMeter} m2`,
    bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
    notes: property.notes,
    price: `${property.price.toLocaleString()} €`,
    city: property.city,
    locationUrl: property.locationUrl,
    mainFeatures: property.mainFeatures,
    equipments: getEquipments(property, equipmentsList),
    images: Array.isArray(property.images) ? property.images : [],
  };
};

const getRoomWord = (rooms) => (rooms > 1 ? 'habitaciones' : 'habitacion');

const getBathroomWord = (bathrooms) => (bathrooms > 1 ? 'baños' : 'baño');

const getEquipments = (property, equipmentsList) => {
  const equipments = property.equipmentIds.map((equipment) => {
    return equipmentsList.find((element) => element.id === equipment).name;
  });
  return equipments;
};
