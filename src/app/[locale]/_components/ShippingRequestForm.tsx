"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocale, useMessages } from "next-intl";
import axios from "axios";
import { useState, useEffect } from "react";
import { ButtonClient, Select, Input } from "./components";
import { Icon } from "@iconify/react";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  loadType: string;
  vehicleType?: string;
  quantity?: string;
  pickupCity: string;
  dropoffCity: string;
};

type Option = { value: string; name: string };

type FieldSchema = {
  label: string;
  placeholder: string;
  error: string;
  options?: Option[];
  ftlOptions?: Option[];
};

type ShippingFormFields = {
  name: FieldSchema;
  phone: FieldSchema;
  email: FieldSchema;
  loadType: FieldSchema;
  vehicleType: FieldSchema;
  boxCount: FieldSchema;
  palletCount: FieldSchema;
  pickupCity: FieldSchema;
  dropoffCity: FieldSchema;
};

type ShippingFormMessages = {
  fields: ShippingFormFields;
  messages: {
    shippingRequest: string;
  };
};

const EMPTY_FIELD: FieldSchema = { label: "", placeholder: "", error: "" };

export default function ShippingRequestForm() {
  const messages = useMessages();
  const locales = useLocale();

  const formMessages = messages.forms?.shippingRequest as ShippingFormMessages | undefined;

  const successText =
    messages.messages?.getAQuote ?? "We've received your request and will respond soon.";

  const fields: ShippingFormFields = {
    name: formMessages?.fields?.name ?? EMPTY_FIELD,
    phone: formMessages?.fields?.phone ?? EMPTY_FIELD,
    email: formMessages?.fields?.email ?? EMPTY_FIELD,
    loadType: formMessages?.fields?.loadType ?? EMPTY_FIELD,
    vehicleType: formMessages?.fields?.vehicleType ?? EMPTY_FIELD,
    boxCount: formMessages?.fields?.boxCount ?? EMPTY_FIELD,
    palletCount: formMessages?.fields?.palletCount ?? EMPTY_FIELD,
    pickupCity: formMessages?.fields?.pickupCity ?? EMPTY_FIELD,
    dropoffCity: formMessages?.fields?.dropoffCity ?? EMPTY_FIELD,
  };

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadType = watch("loadType");

  useEffect(() => {
    if (loadType !== "FTL") unregister("vehicleType");
    if (loadType !== "Box" && loadType !== "Pallet") unregister("quantity");
  }, [loadType, unregister]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    try {
      await axios.post("/api/shipping-request", { locales, data });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quantityLabel = loadType === "Box" ? fields.boxCount : fields.palletCount;

  if (isSubmitted) {
    return (
      <div className="h-60 w-full rounded-3xl bg-gray-50 p-12 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Icon icon="solar:check-circle-bold" className="text-theme-blue h-12 w-12" />
        </div>

        <h3 className="font-heading text-theme-blue text-3xl font-bold">{successText}</h3>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-gray-50 p-8 shadow-md">
      <h2 className="font-heading text-theme-blue mb-6 text-2xl font-black">
        {formMessages?.messages.shippingRequest ?? "Shipping Request"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
      >
        <Input
          label={fields.name.label}
          icon="solar:user-linear"
          id="name"
          placeholder={fields.name.placeholder}
          registerProps={register("name", { required: true })}
          error={errors.name && fields.name.error}
        />

        <Input
          label={fields.phone.label}
          icon="solar:phone-linear"
          id="phone"
          placeholder={fields.phone.placeholder}
          registerProps={register("phone", { required: true })}
          error={errors.phone && fields.phone.error}
        />

        <Input
          label={fields.email.label}
          icon="solar:letter-linear"
          id="email"
          placeholder={fields.email.placeholder}
          registerProps={register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          error={errors.email && fields.email.error}
        />

        <Select
          label={fields.loadType.label}
          icon="solar:widget-4-linear"
          id="loadType"
          placeholder={fields.loadType.placeholder}
          options={fields.loadType.options ?? []}
          registerProps={register("loadType", { required: true })}
          error={errors.loadType && fields.loadType.error}
        />

        {loadType === "FTL" && (
          <Select
            label={fields.vehicleType.label}
            icon="solar:delivery-linear"
            id="vehicleType"
            placeholder={fields.vehicleType.placeholder}
            options={fields.vehicleType.ftlOptions ?? []}
            registerProps={register("vehicleType", { required: true })}
            error={errors.vehicleType && fields.vehicleType.error}
          />
        )}

        {(loadType === "Box" || loadType === "Pallet") && (
          <Input
            label={quantityLabel.label}
            icon="hugeicons:layout-table-01"
            id="quantity"
            placeholder={quantityLabel.placeholder}
            registerProps={register("quantity", {
              required: true,
              pattern: /^[0-9]+$/,
            })}
            error={errors.quantity && quantityLabel.error}
          />
        )}

        <Input
          label={fields.pickupCity.label}
          icon="iconamoon:location-light"
          id="pickupCity"
          placeholder={fields.pickupCity.placeholder}
          registerProps={register("pickupCity", { required: true })}
          error={errors.pickupCity && fields.pickupCity.error}
        />

        <Input
          label={fields.dropoffCity.label}
          icon="iconamoon:location-light"
          id="dropoffCity"
          placeholder={fields.dropoffCity.placeholder}
          registerProps={register("dropoffCity", { required: true })}
          error={errors.dropoffCity && fields.dropoffCity.error}
        />

        <div className="mt-4 flex w-full items-center justify-end md:col-span-2">
          <ButtonClient
            type="submit"
            loading={isLoading}
            text={messages.ctas.submit}
            direction="forward"
            className="bg-theme-blue hover:bg-blue-hover text-white"
          />
        </div>
      </form>
    </div>
  );
}
