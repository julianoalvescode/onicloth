import { useForm, UseFormProps, FieldValues, Path } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface UseFormWithZodProps<T extends FieldValues> extends Omit<UseFormProps<T>, "resolver"> {
  schema: z.ZodSchema<T>
}

export function useFormWithZod<T extends FieldValues>({
  schema,
  ...formProps
}: UseFormWithZodProps<T>) {
  return useForm<T>({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...formProps,
  })
}

// Hook para validação de senha
export function usePasswordValidation() {
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "default" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/\d/.test(password)) strength += 1
    if (/[^a-zA-Z\d]/.test(password)) strength += 1

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const colors = ["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3"]

    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "#e0e0e0",
    }
  }

  return { getPasswordStrength }
}

// Hook para formatação de cartão de crédito
export function useCreditCardFormat() {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return { formatCardNumber, formatExpiryDate }
}

// Hook para formatação de telefone
export function usePhoneFormat() {
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "")

    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  return { formatPhoneNumber }
}

// Hook para formatação de CEP/ZIP
export function useZipFormat() {
  const formatZipCode = (value: string) => {
    const zip = value.replace(/\D/g, "")

    if (zip.length <= 5) {
      return zip
    } else {
      return `${zip.slice(0, 5)}-${zip.slice(5, 9)}`
    }
  }

  return { formatZipCode }
}
