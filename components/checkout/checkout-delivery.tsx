"use client"

import { Truck, MapPin, Search } from "lucide-react"
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
} from "@mui/material"
import { useFormWithZod, usePhoneFormat } from "@/hooks/use-form"
import { checkoutDeliverySchema, type CheckoutDeliveryFormData } from "@/lib/schemas"

interface CheckoutDeliveryProps {
  currentStep: string
  onContinue: (data: CheckoutDeliveryFormData) => void
  defaultValues?: Partial<CheckoutDeliveryFormData>
}

export default function CheckoutDelivery({
  currentStep,
  onContinue,
  defaultValues = {},
}: CheckoutDeliveryProps) {
  const { formatPhoneNumber } = usePhoneFormat()

  const form = useFormWithZod({
    schema: checkoutDeliverySchema,
    defaultValues: {
      deliveryOption: "ship",
      addressType: "home",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form

  const watchedDeliveryOption = watch("deliveryOption")

  const onSubmit = (data: CheckoutDeliveryFormData) => {
    onContinue(data)
  }

  const handleDeliveryOptionChange = (option: "ship" | "pickup") => {
    setValue("deliveryOption", option)
  }

  const handleAddressTypeChange = (type: "home" | "apo") => {
    setValue("addressType", type)
  }

  return (
    <section className={`space-y-6 ${currentStep !== "delivery" ? "opacity-75" : ""}`}>
      <h2 className="text-xl font-lato-normal">Delivery Options</h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleDeliveryOptionChange("ship")}
          className={`flex items-center justify-center gap-2 py-4 px-6 border rounded-md transition-colors ${
            watchedDeliveryOption === "ship"
              ? "border-black bg-white"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <Truck className="h-5 w-5" />
          <span className="font-lato-normal">Ship</span>
        </button>

        <button
          type="button"
          onClick={() => handleDeliveryOptionChange("pickup")}
          className={`flex items-center justify-center gap-2 py-4 px-6 border rounded-md transition-colors ${
            watchedDeliveryOption === "pickup"
              ? "border-black bg-white"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <MapPin className="h-5 w-5" />
          <span className="font-lato-normal">Pick Up</span>
        </button>
      </div>

      {watchedDeliveryOption === "ship" && (
        <div className="space-y-6">
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={watch("addressType")}
              onChange={(e) => handleAddressTypeChange(e.target.value as "home" | "apo")}
            >
              <FormControlLabel
                value="home"
                control={<Radio />}
                label="Home/Office"
                className="font-lato-normal"
              />
              <FormControlLabel
                value="apo"
                control={<Radio />}
                label="APO/FPO"
                className="font-lato-normal"
              />
            </RadioGroup>
          </FormControl>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email*"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              className="bg-gray-50"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="First Name*"
                variant="outlined"
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                required
              />

              <TextField
                label="Last Name*"
                variant="outlined"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                required
              />
            </div>

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              placeholder="Start typing address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="h-5 w-5 text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            <div className="text-sm">
              <button
                type="button"
                className="text-gray-500 hover:text-black font-lato-normal text-sm"
              >
                Enter address manually
              </button>
            </div>

            <TextField
              label="Phone Number*"
              variant="outlined"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              required
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                setValue("phone", formatted)
              }}
            />
          </form>
        </div>
      )}

      {watchedDeliveryOption === "pickup" && (
        <div className="border border-gray-200 rounded-md p-6 bg-gray-50">
          <p className="font-lato-normal text-center">
            Select a store for pickup. Available items will be ready within 2-3 business days.
          </p>
          <div className="mt-4 flex justify-center">
            <Button variant="contained" color="primary" className="rounded-full">
              Find Stores
            </Button>
          </div>
        </div>
      )}

      {currentStep === "delivery" && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className="rounded-full"
          >
            Save & Continue
          </Button>
        </div>
      )}
    </section>
  )
}
