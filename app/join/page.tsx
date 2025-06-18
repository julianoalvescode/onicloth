"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { Person, Email, Lock, Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material"
import {
  JoinHeader,
  JoinErrorAlert,
  JoinPasswordStrength,
  JoinTerms,
  JoinSubmitButton,
  JoinSignInLink,
  JoinThemeProvider,
} from "@/components/join"
import { useFormWithZod, usePasswordValidation } from "@/hooks/use-form"
import { joinSchema, type JoinFormData } from "@/lib/schemas"

export default function JoinPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const { getPasswordStrength } = usePasswordValidation()

  const form = useFormWithZod({
    schema: joinSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form

  const watchedPassword = watch("password")
  const passwordStrength = getPasswordStrength(watchedPassword)

  const onSubmit = async (data: JoinFormData) => {
    setIsLoading(true)
    setSubmitError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/signin?message=Account created successfully! Please sign in.")
    } catch (error) {
      setSubmitError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <JoinThemeProvider>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ maxWidth: 400, mx: "auto", p: 4 }}>
            <JoinHeader />
            <JoinErrorAlert error={submitError} />
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  data-testid="first-name"
                  fullWidth
                  label="First Name"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#666666", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  data-testid="last-name"
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Box>
              <TextField
                data-testid="email"
                fullWidth
                label="Email Address"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#666666", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                data-testid="password"
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#666666", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#666666", fontSize: 20 }} />
                        ) : (
                          <Visibility sx={{ color: "#666666", fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <JoinPasswordStrength
                password={watchedPassword}
                passwordStrength={passwordStrength}
              />
              <TextField
                data-testid="confirm-password"
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CheckCircle sx={{ color: "#666666", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff sx={{ color: "#666666", fontSize: 20 }} />
                        ) : (
                          <Visibility sx={{ color: "#666666", fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <JoinTerms
                checked={watch("agreeToTerms")}
                onChange={(checked) => form.setValue("agreeToTerms", checked)}
              />
              <JoinSubmitButton data-testid="join-button" isLoading={isLoading} />
              <JoinSignInLink />
            </Box>
          </Box>
        </Container>
      </Box>
    </JoinThemeProvider>
  )
}
