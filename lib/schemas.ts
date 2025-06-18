import { z } from "zod"

// Sign In Schema
export const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>

// Join/Register Schema
export const joinSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type JoinFormData = z.infer<typeof joinSchema>

// Checkout Delivery Schema
export const checkoutDeliverySchema = z.object({
  deliveryOption: z.enum(["ship", "pickup"]),
  addressType: z.enum(["home", "apo"]).optional(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  address: z.string().optional(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
})

export type CheckoutDeliveryFormData = z.infer<typeof checkoutDeliverySchema>

// Checkout Payment Schema
export const checkoutPaymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Please enter a valid card number"),
  cardholderName: z
    .string()
    .min(1, "Cardholder name is required")
    .min(2, "Cardholder name must be at least 2 characters"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Please enter a valid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "Please enter a valid CVV"),
  saveCard: z.boolean().optional(),
})

export type CheckoutPaymentFormData = z.infer<typeof checkoutPaymentSchema>

// Profile Personal Info Schema
export const profilePersonalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Please enter a valid date (YYYY-MM-DD)",
    }),
})

export type ProfilePersonalInfoFormData = z.infer<typeof profilePersonalInfoSchema>

// Profile Address Schema
export const profileAddressSchema = z.object({
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  country: z.string().min(1, "Country is required"),
  isDefault: z.boolean().optional(),
})

export type ProfileAddressFormData = z.infer<typeof profileAddressSchema>

// Product Review Schema
export const productReviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  title: z
    .string()
    .min(1, "Review title is required")
    .min(3, "Review title must be at least 3 characters")
    .max(100, "Review title must be less than 100 characters"),
  comment: z
    .string()
    .min(1, "Review comment is required")
    .min(10, "Review comment must be at least 10 characters")
    .max(1000, "Review comment must be less than 1000 characters"),
})

export type ProductReviewFormData = z.infer<typeof productReviewSchema>

// Newsletter Subscription Schema
export const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  preferences: z.array(z.string()).optional(),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Search Form Schema
export const searchFormSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  category: z.string().optional(),
  priceRange: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  sortBy: z.enum(["price", "name", "rating", "newest"]).optional(),
})

export type SearchFormData = z.infer<typeof searchFormSchema>
