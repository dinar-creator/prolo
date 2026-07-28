"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocale, useMessages } from "next-intl";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import { ButtonClient, Select, Input } from "./components";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  storageType: string;
  palletCount: string;
  storageCity: string;
  storageDuration: string;
};

type FieldSchema = {
  label: string;
  placeholder: string;
  error: string;
  options?: string[];
};

type StorageFormFields = {
  name: FieldSchema;
  phone: FieldSchema;
  email: FieldSchema;
  storageType: FieldSchema;
  palletCount: FieldSchema;
  storageCity: FieldSchema;
  storageDuration: FieldSchema;
};

type StorageFormMessages = {
  fields: StorageFormFields;
  messages: {
    storageRequest: string;
  };
};

const EMPTY_FIELD: FieldSchema = { label: "", placeholder: "", error: "" };

export default function StorageRequestForm() {
  const messages = useMessages();
  const locales = useLocale();

  const formMessages = messages.forms?.storageRequest as StorageFormMessages | undefined;

const successText =
  messages.marketplace?.form?.successMessage ?? "We've received your request and will respond soon.";

  const fields: StorageFormFields = {
    name: formMessages?.fields?.name ?? EMPTY_FIELD,
    phone: formMessages?.fields?.phone ?? EMPTY_FIELD,
    email: formMessages?.fields?.email ?? EMPTY_FIELD,
    storageType: formMessages?.fields?.storageType ?? EMPTY_FIELD,
    palletCount: formMessages?.fields?.palletCount ?? EMPTY_FIELD,
    storageCity: formMessages?.fields?.storageCity ?? EMPTY_FIELD,
    storageDuration: formMessages?.fields?.storageDuration ?? EMPTY_FIELD,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    try {
      await axios.post("/api/storage-request", { locales, data });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error occurred in Storage Request Form", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  {messages.marketplace?.form?.storageTitle ?? "Storage Request"}
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
          label={fields.storageType.label}
          icon="solar:box-linear"
          options={(fields.storageType.options ?? []).map(opt => ({ value: opt, name: opt }))}
          id="storageType"
          placeholder={fields.storageType.placeholder}
          registerProps={register("storageType", { required: true })}
          error={errors.storageType && fields.storageType.error}
        />

        <Input
          label={fields.palletCount.label}
          icon="hugeicons:layout-table-01"
          id="palletCount"
          placeholder={fields.palletCount.placeholder}
          registerProps={register("palletCount", {
            required: true,
            pattern: /^[0-9]+$/,
          })}
          error={errors.palletCount && fields.palletCount.error}
        />

        <Input
          label={fields.storageCity.label}
          icon="iconamoon:location-light"
          id="storageCity"
          placeholder={fields.storageCity.placeholder}
          registerProps={register("storageCity", { required: true })}
          error={errors.storageCity && fields.storageCity.error}
        />

        <Select
          label={fields.storageDuration.label}
          icon="solar:calendar-linear"
          options={(fields.storageDuration.options ?? []).map(opt => ({ value: opt, name: opt }))}
          id="storageDuration"
          placeholder={fields.storageDuration.placeholder}
          registerProps={register("storageDuration", { required: true })}
          error={errors.storageDuration && fields.storageDuration.error}
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
