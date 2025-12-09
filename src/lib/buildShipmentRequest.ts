import { CreateShipmentFormInputs, ShipmentRequest } from "./types";

export const buildShipmentRequest = (form: CreateShipmentFormInputs): ShipmentRequest => {
  return {
    email: process.env.EMAIL!, // required
    password: process.env.PASSWORD!, // required
    pkgUnitType: "METRIC",

    pkg: {
      cod: form.cod || "0",
      notes: form.notes || "",
      senderName: form.senderName,
      receiverName: form.receiverName,
      businessSenderName: form.businessSenderName || "",
      senderPhone: form.senderPhone,
      receiverPhone: form.receiverPhone,
      serviceType: "STANDARD",
      shipmentType: form.shipmentType as ShipmentRequest["pkg"]["shipmentType"],
      quantity: Number(form.quantity) || 1,
      description: form.description || "",
    },

    originAddress: {
      addressLine1: form.originAddressLine1,
      cityId: form.originCityId,
      regionId: form.originRegionId,
      villageId: form.originVillageId,
    },

    destinationAddress: {
      addressLine1: form.destinationAddressLine1,
      cityId: form.destinationCityId,
      regionId: form.destinationRegionId,
      villageId: form.destinationVillageId,
    },
  };
};
