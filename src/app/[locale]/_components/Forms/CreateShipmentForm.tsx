"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Select, Textarea, ButtonClient, SearchSelect } from "../components";
import { useMessages } from "next-intl";
import { useLocale, useTranslations } from "use-intl";
import englishAddresses from "@/adresses/english.json";
import arbicAddresses from "@/adresses/arabic.json";
import { useRouter } from "next/navigation";
import type { ApiError, CreateShipmentFormData, CreateShipmentFormInputs } from "@/lib/types";
import axios from "axios";
import { Icon } from "@iconify/react";
import PolicyPdf from "../PolicyPdf";
import { ShipmentResponse } from "@/lib/types";

const BASE_CITY_RATE = 35;
const INTERCITY_RATE = 75;
const FREE_WEIGHT = 10;

export default function CreateShipmentForm() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateShipmentFormInputs>({
    defaultValues: {
      cod: "0",
      shipmentType: "COD",
      quantity: "1",
      policyAccepted: false,
    },
  });

  const locale = useLocale();
  const isEn = locale === "en";
  const [loader, setLoader] = useState<boolean>(false);

  const [step, setStep] = useState(1);
  const policyAccepted = watch("policyAccepted");

  const shipmentTypeOptions = [
    { value: "COD", name: "COD" },
    { value: "REGULAR", name: "PREPAID" },
  ];

  const parcelTypeIdOptions = [
    { value: "342", name: "COLD" },
    { value: "341", name: "DRY" },
  ];

  const router = useRouter();

  // 🟦 Validation map for each step
  const stepValidationMap: Record<number, (keyof CreateShipmentFormInputs)[]> = {
    1: [
      "senderName",
      "senderEmail",
      "senderPhone",
      "originRegionId",
      "originCityId",
      "originVillageId",
      "originAddressLine1",
    ],
    2: [
      "receiverName",
      "receiverEmail",
      "receiverPhone",
      "destinationRegionId",
      "destinationCityId",
      "destinationVillageId",
      "destinationAddressLine1",
    ],
    3: ["cod", "notes", "shipmentType", "quantity", "description", "parcelTypeId"],
    4: ["policyAccepted"],
  };

  // STEP CONTROLLERS
  // 1. Next Step
  const nextStep = async () => {
    const fieldsToValidate = stepValidationMap[step] || [];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(prev => prev + 1);
  };
  // 2. Previous Step
  const prevStep = () => setStep(prev => prev - 1);

  // TRANSLATIONS & MESSAGES
  const ctas = useTranslations("ctas");
  const messagesData = useMessages();
  const messages = messagesData.forms.fields;
  const legends = messagesData.forms.legends;
  const formSteps: string[] = messagesData.createShipmentPage.formSteps;
  const loadingText = messagesData.createShipmentPage.shipmentLoadingText as string;

  // ADDRESS DATA & DEPENDENCIES
  const addresses = isEn ? englishAddresses : arbicAddresses;
  function getAddresses(villId: string) {
    const engAdd = englishAddresses.find(add => add.villageId === villId);
    const arAdd = arbicAddresses.find(add => add.villageId === villId);

    return {
      englishAddress: `${engAdd?.villageName}, ${engAdd?.cityName}, ${engAdd?.regionName}`,
      arabicAddress: `${arAdd?.villageName}, ${arAdd?.cityName}, ${arAdd?.regionName}`,
    };
  }

  // 1. For Cities (both Origin & Destination)
  const cities = useMemo(() => {
    return addresses
      .filter((addr, ind, self) => {
        return ind === self.findIndex(t => t.cityId === addr.cityId);
      })
      .map(addr => {
        return {
          value: addr.cityId,
          name: addr.cityName,
        };
      })
      .sort((a, b) =>
        a.name
          .toLocaleLowerCase()
          .localeCompare(b.name.toLocaleLowerCase(), locale, { sensitivity: "base" })
      );
  }, [addresses, locale]);

  // 2. For Destination Adresses
  const [destinationVillages, setDestinationVillages] = useState<
    { value: string | number; name: string }[]
  >([]);
  const destinationCityId = watch("destinationCityId");

  useEffect(() => {
    // Destination City is changed
    if (destinationCityId) {
      // Reset Villages
      setDestinationVillages([]);
      setValue(
        "destinationRegionId",
        addresses.find(addr => addr.cityId === destinationCityId)?.regionId || ""
      );
      setValue("destinationVillageId", "");

      const villages = addresses
        .filter(addr => addr.cityId === destinationCityId)
        .map(addr => {
          return {
            value: addr.villageId,
            name: addr.villageName,
          };
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );
      setDestinationVillages(villages);
    }
  }, [destinationCityId, addresses, setValue, locale]);

  // 3. For Origin Adresses
  const [originVillages, setOriginVillages] = useState<{ value: string | number; name: string }[]>(
    []
  );
  const originCityId = watch("originCityId");

  useEffect(() => {
    // City is changed
    if (originCityId) {
      // Reset Villages
      setOriginVillages([]);
      setValue(
        "originRegionId",
        addresses.find(addr => addr.cityId === originCityId)?.regionId || ""
      );
      setValue("originVillageId", "");

      const villages = addresses
        .filter(addr => addr.cityId === originCityId)
        .map(addr => {
          return {
            value: addr.villageId,
            name: addr.villageName,
          };
        })
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale, { sensitivity: "base" })
        );
      setOriginVillages(villages);
    }
  }, [originCityId, addresses, setValue, locale]);

  // SHIPMENT TYPE & COD LOGIC
  const [disableCod, setDisableCod] = useState(false);
  const shipmentType = watch("shipmentType");

  useEffect(() => {
    if (shipmentType && shipmentType !== "COD") {
      setDisableCod(true);
      setValue("cod", "0");
    }
    if (shipmentType === "COD") {
      setDisableCod(false);
    }
  }, [shipmentType, setValue]);

  // HANDLE FORM SUBMISSION
  const onSubmit: SubmitHandler<CreateShipmentFormInputs> = async data => {
    if (!data.policyAccepted) {
      return;
    }

    setLoader(true);
    // Inputs For Create Shipment
    const shipmentPayload: CreateShipmentFormInputs = data;

    const shipmentApiRes = await axios.post("/api/create-shipment", shipmentPayload);

    const dataInResponse: ApiError | ShipmentResponse = shipmentApiRes.data;

    if ("error" in dataInResponse) {
      router.push(`/${locale}/create-shipment/failure`);
      return;
    }

    // Generate & Calculate Some Variables
    // const referenceNumber = createShipmentReference(locale as "en" | "ar");

    const shipmentAmount =
      data.originCityId === data.destinationCityId ? BASE_CITY_RATE : INTERCITY_RATE;
    const weightOver10 =
      parseFloat(data.weight as string) > 10 ? parseFloat(data.weight as string) - FREE_WEIGHT : 0;

    // Save Shipment Data & Payment Link

    // Build addresses
    const originAddr = getAddresses(data.originVillageId);
    const destAddr = getAddresses(data.destinationVillageId);

    const shipmentData: CreateShipmentFormData = {
      // Shipment
      shipmentId: dataInResponse.id,
      trackingId: dataInResponse.barcode,
      barcodeImageUrl: dataInResponse.barcodeImage,
      cod: data.cod,
      parcelTypeId: dataInResponse.parcelTypeId,
      shipmentType: data.shipmentType as "COD" | "REGULAR",
      quantity: data.quantity,
      weight: data.weight || 0,
      notes: data.notes,
      description: data.description,
      expectedDeliveryDate: dataInResponse.expectedDeliveryDate,
      amount: shipmentAmount + weightOver10, //Shipment Charges Collected Saperately

      // Sender
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderBusinessName: data.businessSenderName,
      senderPhone: data.senderPhone,
      originAddressArabic: `${data.originAddressLine1}, ${originAddr.arabicAddress}`,
      originAddressEnglish: `${data.originAddressLine1}, ${originAddr.englishAddress}`,
      originNationalAddress: data.originNationalAddress,

      // Receiver
      receiverName: data.receiverName,
      receiverEmail: data.receiverEmail,
      receiverPhone: data.receiverPhone,
      destinationAddressArabic: `${data.destinationAddressLine1}, ${destAddr.arabicAddress}`,
      destinationAddressEnglish: `${data.destinationAddressLine1}, ${destAddr.englishAddress}`,
      destinationNationalAddress: data.destinationNationalAddress,
    };

    // Saving Shipment Data & Sending Email
    try {
      await axios.post("/api/save-shipment", { locales: locale, data: shipmentData });
    } catch (error) {
      console.log("Error in saving shipment :: ", error);
    }

    router.push(
      `/${locale}/create-shipment/success?id=${shipmentData.shipmentId}&barcode=${shipmentData.trackingId}`
    );
  };

  if (loader) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <div className="loader"></div>
        <h3 className="mt-6 text-center text-2xl">{loadingText}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full space-y-6">
      {/* Step Indicator */}
      <div className="mb-6 grid grid-cols-3">
        {formSteps.map((label, index) => (
          <div
            key={index}
            className={`flex-1 border-b-4 py-2 text-center ${
              step === index + 1 ? "border-theme-blue" : "border-gray-300"
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {/* -------------------- STEP 1 -------------------- */}
      {step === 1 && (
        <div>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue my-4 text-xl font-medium">
              {legends?.senderInformation}
            </legend>
            <div className="form-grid">
              <Input
                icon="fluent:rename-a-20-regular"
                label={messages.senderName.label + ` *`}
                id="senderName"
                placeholder={messages.senderName.placeholder}
                error={errors.senderName && messages.senderName.error}
                registerProps={{ ...register("senderName", { required: true }) }}
              />

              <Input
                icon="material-symbols:alternate-email"
                label={messages.senderEmail.label + ` *`}
                id="senderEmail"
                placeholder={messages.senderEmail.placeholder}
                error={errors.senderEmail && messages.senderEmail.error}
                registerProps={{ ...register("senderEmail", { required: true }) }}
              />

              <Input
                icon="famicons:business-outline"
                label={messages.businessSenderName.label}
                id="businessSenderName"
                placeholder={messages.businessSenderName.placeholder}
                error={errors.businessSenderName && messages.businessSenderName.error}
                registerProps={{ ...register("businessSenderName") }}
              />

              <Input
                icon="hugeicons:call-02"
                label={messages.senderPhone.label + ` *`}
                id="senderPhone"
                type="tel"
                placeholder={messages.senderPhone.placeholder}
                error={errors.senderPhone && messages.senderPhone.error}
                registerProps={{
                  ...register("senderPhone", {
                    required: true,
                    pattern: {
                      value: /^[0-9+\-\s()]{7,15}$/, // ✅ allows digits, +, -, spaces, (), length 7–15
                      message: messages.senderPhone.error || "Please enter a valid phone number",
                    },
                  }),
                }}
              />
            </div>
          </fieldset>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.originAddress}
            </legend>
            <div className="form-grid">
              {/* Origitn City */}
              <SearchSelect
                icon="solar:city-outline"
                label={messages.originCityId.label + ` *`}
                id="originCityId"
                options={cities}
                placeholder={messages.originCityId.placeholder}
                searchText={messages.originCityId.search}
                noResult={messages.originCityId.noResult}
                registerProps={{ ...register("originCityId", { required: true }) }}
                error={errors.originCityId && messages.originCityId.error}
                setValue={setValue}
                name={"originCityId"}
              />

              {/* Origin Village */}
              <SearchSelect
                icon="fontisto:holiday-village"
                label={messages.originVillageId.label + ` *`}
                id="originVillageId"
                options={originVillages}
                placeholder={messages.originVillageId.placeholder}
                searchText={messages.originVillageId.search}
                noResult={messages.originVillageId.noResult}
                registerProps={{ ...register("originVillageId", { required: true }) }}
                error={errors.originVillageId && messages.originVillageId.error}
                setValue={setValue}
                name={"originVillageId"}
                resetKey={originCityId}
              />

              <Input
                icon="fluent:street-sign-20-regular"
                label={messages.originAddressLine1.label + ` *`}
                id="originAddressLine1"
                placeholder={messages.originAddressLine1.placeholder}
                error={errors.originAddressLine1 && messages.originAddressLine1.error}
                registerProps={{ ...register("originAddressLine1", { required: true }) }}
              />

              {/* Origin National Address */}
              <Input
                icon="hugeicons:maps-global-01"
                label={messages.originNationalAddress.label}
                id="originNationalAddress"
                placeholder={messages.originNationalAddress.placeholder}
                error={errors.originNationalAddress && messages.originNationalAddress.error}
                registerProps={{ ...register("originNationalAddress", { required: false }) }}
              />
            </div>
          </fieldset>
        </div>
      )}

      {/* -------------------- STEP 2 -------------------- */}
      {step === 2 && (
        <div>
          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.receiverInformation}
            </legend>
            <div className="form-grid">
              <Input
                icon="fluent:rename-a-20-regular"
                label={messages.receiverName.label + ` *`}
                id="receiverName"
                placeholder={messages.receiverName.placeholder}
                error={errors.receiverName && messages.receiverName.error}
                registerProps={{ ...register("receiverName", { required: true }) }}
              />

              <Input
                icon="material-symbols:alternate-email"
                label={messages.receiverEmail.label + ` *`}
                id="receiverEmail"
                placeholder={messages.receiverEmail.placeholder}
                error={errors.receiverEmail && messages.receiverEmail.error}
                registerProps={{ ...register("receiverEmail", { required: true }) }}
              />

              <Input
                icon="hugeicons:call-02"
                label={messages.receiverPhone.label + ` *`}
                id="receiverPhone"
                type="tel"
                placeholder={messages.receiverPhone.placeholder}
                error={errors.receiverPhone && messages.receiverPhone.error}
                registerProps={{
                  ...register("receiverPhone", {
                    required: true,
                    pattern: {
                      value: /^[0-9+\-\s()]{7,15}$/, // ✅ allows digits, +, -, spaces, (), length 7–15
                      message: messages.senderPhone.error || "Please enter a valid phone number",
                    },
                  }),
                }}
              />
            </div>
          </fieldset>

          <fieldset className="col-span-2">
            <legend className="text-theme-blue py-4 text-xl font-medium">
              {legends?.destinationAddress}
            </legend>
            <div className="form-grid">
              {/* Destination City */}
              <SearchSelect
                icon="solar:city-outline"
                label={messages.destinationCityId.label + ` *`}
                id="destinationCityId"
                options={cities}
                placeholder={messages.destinationCityId.placeholder}
                searchText={messages.destinationCityId.search}
                noResult={messages.destinationCityId.noResult}
                registerProps={{ ...register("destinationCityId", { required: true }) }}
                error={errors.destinationCityId && messages.destinationCityId.error}
                setValue={setValue}
                name="destinationCityId"
              />

              {/* Destination Village Id */}
              <SearchSelect
                icon="fontisto:holiday-village"
                label={messages.destinationVillageId.label + ` *`}
                id="destinationVillageId"
                options={destinationVillages}
                placeholder={messages.destinationVillageId.placeholder}
                searchText={messages.destinationVillageId.search}
                noResult={messages.destinationVillageId.noResult}
                registerProps={{ ...register("destinationVillageId", { required: true }) }}
                error={errors.destinationVillageId && messages.destinationVillageId.error}
                setValue={setValue}
                name="destinationVillageId"
                resetKey={destinationCityId}
              />

              <Input
                icon="fluent:street-sign-20-regular"
                label={messages.destinationAddressLine1.label + ` *`}
                id="destinationAddressLine1"
                placeholder={messages.destinationAddressLine1.placeholder}
                error={errors.destinationAddressLine1 && messages.destinationAddressLine1.error}
                registerProps={{ ...register("destinationAddressLine1", { required: true }) }}
              />

              {/* Origin National Address */}
              <Input
                icon="hugeicons:maps-global-01"
                label={messages.destinationNationalAddress.label}
                id="destinationNationalAddress"
                placeholder={messages.destinationNationalAddress.placeholder}
                error={
                  errors.destinationNationalAddress && messages.destinationNationalAddress.error
                }
                registerProps={{ ...register("destinationNationalAddress", { required: false }) }}
              />
            </div>
          </fieldset>
        </div>
      )}

      {/* -------------------- STEP 3 -------------------- */}
      {step === 3 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Service Type Id */}
          <Select
            icon="hugeicons:container-truck"
            label={messages.parcelTypeId.label + ` *`}
            id="parcelTypeId"
            options={parcelTypeIdOptions}
            placeholder={messages.parcelTypeId.placeholder}
            registerProps={{ ...register("parcelTypeId", { required: true }) }}
            error={errors.parcelTypeId && messages.parcelTypeId.error}
          />

          <Select
            icon="streamline-ultimate:shipment-star"
            label={messages.shipmentType.label + ` *`}
            id="shipmentType"
            options={shipmentTypeOptions}
            placeholder={messages.shipmentType.placeholder}
            registerProps={{ ...register("shipmentType", { required: true }) }}
            error={errors.shipmentType && messages.shipmentType.error}
          />

          <Input
            icon="mdi:cod"
            label={messages.cod.label + ` *`}
            id="cod"
            disabled={disableCod}
            min="0"
            type="number"
            placeholder={messages.cod.placeholder}
            error={errors.cod && messages.cod.error}
            registerProps={{ ...register("cod", { required: !disableCod }) }}
          />

          <Input
            icon="fluent-mdl2:quantity"
            label={messages.quantity.label + ` *`}
            id="quantity"
            type="number"
            min="1"
            placeholder={messages.quantity.placeholder}
            error={errors.quantity && messages.quantity.error}
            registerProps={{ ...register("quantity", { required: true }) }}
          />

          {/* Weight */}
          <Input
            icon="hugeicons:weight-scale"
            label={messages.weight.label + ` *`}
            id="weight"
            type="number"
            min="1"
            placeholder={messages.weight.placeholder}
            error={errors.weight && messages.weight.error}
            registerProps={{ ...register("weight", { required: true }) }}
          />

          <div className="form-grid md:col-span-2">
            <Textarea
              icon="hugeicons:note"
              label={messages.notes.label}
              id="notes"
              placeholder={messages.notes.placeholder}
              error={errors.notes && messages.notes.error}
              registerProps={{ ...register("notes", { required: false }) }}
            />

            <Textarea
              icon="hugeicons:package-open"
              label={messages.description.label}
              id="description"
              placeholder={messages.description.placeholder}
              error={errors.description && messages.description.error}
              registerProps={{ ...register("description", { required: false }) }}
            />
          </div>
        </div>
      )}

      {/* -------------------- STEP 4 -------------------- */}
      {step === 4 && (
        <div className="w-full">
          <div className="h-[600px] w-full">
            <PolicyPdf />
          </div>
          {/* Policy Section */}
          <div className="mt-4 flex w-full items-center gap-0">
            <input
              type="hidden"
              {...register("policyAccepted", {
                required: true,
              })}
            />
            <div
              className={`size-5 cursor-pointer rounded-md border`}
              onClick={() => setValue("policyAccepted", !policyAccepted, { shouldValidate: true })}
            >
              {policyAccepted && <Icon icon="hugeicons:tick-01" className="size-full" />}
            </div>
            <div className="mx-2 flex items-center gap-1">
              <p>{messages.policy.label}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <ButtonClient
            disabled={step === 5}
            type="button"
            text={ctas("back")}
            icon={false}
            className={`rounded-xl bg-gray-300 text-black ${step === 5 ? "hidden" : ""}`}
            onClick={prevStep}
          />
        )}

        {step < 4 && (
          <ButtonClient
            type="button"
            text={ctas("next")}
            icon={false}
            className="bg-theme-blue rounded-xl text-white"
            onClick={nextStep}
          />
        )}

        {/* Policy Confirmation */}
        {step === 4 && (
          <ButtonClient
            type="submit"
            text={ctas("createShipment")}
            icon={false}
            disabled={!policyAccepted}
            className={`rounded-xl text-white ${
              policyAccepted
                ? "bg-theme-blue hover:bg-blue-hover"
                : "cursor-not-allowed bg-gray-400"
            }`}
          />
        )}
      </div>
    </form>
  );
}
