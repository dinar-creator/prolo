"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Textarea, ButtonClient, Select } from "../components";
import { useLocale, useMessages } from "next-intl";
import axios from "axios";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Controller } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  crnumber: string;
  company: string;
  details: string;
  expectedOrders: string;
};

type FormFields = {
  name: {
    label: string;
    placeholder: string;
    error: string;
  };
  email: {
    label: string;
    placeholder: string;
    error: string;
  };
  phone: {
    label: string;
    placeholder: string;
    error: string;
  };
  company: {
    label: string;
    placeholder: string;
    error: string;
  };
  crnumber: {
    label: string;
    placeholder: string;
    error: string;
  };
  expectedOrders: {
    label: string;
    placeholder: string;
    error: string;
    options: string[];
  };
  service: {
    label: string;
    placeholder: string;
    error: string;
    quoteOptions: { text: string; icon: string }[];
  };
  address: {
    label: string;
    placeholder: string;
    error: string;
  };
  details: {
    label: string;
    placeholder: string;
  };
  submit: {
    text: string;
  };
};

type FormMessages = {
  fields: FormFields;
  messages: {
    getAQuote: string;
  };
};

export default function GetAQuoteForm() {
  const messages = useMessages();
  const formMessages = messages.forms as FormMessages;
  const fileds: FormFields = formMessages.fields;
  const quoteServiceOptions = formMessages.fields.service.quoteOptions || [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locales = useLocale();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    try {
      const reqBody = {
        locales,
        data: { ...data },
      };
      axios.post("/api/get-a-quote", reqBody);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured in Contact Us Form", error);
    }
  };

  if (isSubmitted) {
    return (
      <p className="text-theme-blue text-center text-2xl font-bold">
        {formMessages.messages.getAQuote}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-1 gap-2 md:grid-cols-2"
    >
      {/* Name */}
      <Input
        label={fileds.name.label}
        id="name"
        type="text"
        placeholder={fileds.name.placeholder}
        error={errors.name && fileds.name.error}
        icon="fluent:rename-a-20-regular"
        registerProps={{ ...register("name", { required: true }) }}
      />

      {/* Email */}
      <Input
        label={fileds.email.label}
        id="email"
        type="email"
        placeholder={fileds.email.placeholder}
        error={errors.email && fileds.email.error}
        icon="material-symbols:alternate-email"
        registerProps={{ ...register("email", { required: true }) }}
      />

      {/* Phone */}
      <Input
        label={fileds.phone.label}
        id="phone"
        type="tel"
        placeholder={fileds.phone.placeholder}
        error={errors.phone && fileds.phone.error}
        icon="hugeicons:call-02"
        registerProps={{
          ...register("phone", {
            required: true,
          }),
        }}
      />

      {/* Address */}
      <div className="w-full">
        <Input
          label={fileds.address.label}
          id="address"
          type="text"
          placeholder={fileds.address.placeholder}
          error={errors.name && fileds.address.error}
          icon="iconamoon:location-light"
          registerProps={{ ...register("address", { required: true }) }}
        />
      </div>

      {/* Company */}
      <Input
        label={fileds.company.label}
        id="company"
        type="text"
        placeholder={fileds.company.placeholder}
        error={errors.company && fileds.company.error}
        icon="hugeicons:building-01"
        registerProps={{
          ...register("company", {
            required: true,
          }),
        }}
      />

      {/* CR Number */}
      <Input
        label={fileds.crnumber.label}
        id="crnumber"
        type="text"
        placeholder={fileds.crnumber.placeholder}
        error={errors.crnumber && fileds.crnumber.error}
        icon="hugeicons:input-numeric"
        registerProps={{
          ...register("crnumber", {
            required: true,
          }),
        }}
      />

      <Controller
        name="service"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="w-full md:col-span-2">
            <label htmlFor={"service"} className="mb-2 w-full text-base font-medium">
              {fileds.service.label}
            </label>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {quoteServiceOptions.map((service, ind) => (
                <div
                  key={ind}
                  onClick={() => field.onChange(service.text)} // update form value
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border p-4 transition ${field.value === service.text ? "border-theme-blue bg-theme-blue/10" : "border-gray-300"}`}
                >
                  <Icon icon={service.icon} className="size-8" />
                  <p className="text-center text-sm">{service.text}</p>
                </div>
              ))}

              {errors.service && <p className="text-sm text-red-500">{fileds.service.error}</p>}
            </div>
          </div>
        )}
      />

      {/* Expected Orders */}
      <Select
        label={fileds.expectedOrders.label}
        icon="hugeicons:truck-delivery"
        options={fileds.expectedOrders.options.map(opt => ({ value: opt, name: opt }))}
        id="expectedOrders"
        placeholder={fileds.expectedOrders.placeholder}
        registerProps={{ ...register("expectedOrders", { required: true }) }}
        error={errors.expectedOrders && fileds.expectedOrders.error}
      />

      {/* Message */}
      <div className="w-full md:col-span-2">
        <Textarea
          label={fileds.details.label}
          icon="solar:notes-linear"
          placeholder={fileds.details.placeholder}
          id="details"
          registerProps={{ ...register("details") }}
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-end md:col-span-2">
        <ButtonClient
          type="submit"
          loading={isLoading}
          text={messages.ctas.getAQuote}
          direction="forward"
          className="bg-theme-blue hover:bg-blue-hover text-white"
        />
      </div>
    </form>
  );
}
