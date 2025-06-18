"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Card,
  CardContent,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material"
import { useAuth } from "@/contexts/auth-context"
import Logo from "@/components/logo"
import { useFormWithZod } from "@/hooks/use-form"
import { signInSchema, type SignInFormData } from "@/lib/schemas"

// Minimalist Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
      color: "#000000",
    },
    body1: {
      fontWeight: 400,
      color: "#666666",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e0e0e0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#bdbdbd",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
              borderWidth: "1px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#666666",
            fontWeight: 400,
            "&.Mui-focused": {
              color: "#000000",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "1rem",
          borderRadius: "24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#f5f5f5",
          color: "#666666",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
          "&:disabled": {
            backgroundColor: "#f5f5f5",
            color: "#bdbdbd",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          "&:hover": {
            borderColor: "#bdbdbd",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid",
        },
      },
    },
  },
})

export default function SignInPage() {
  const { login, isLoading, error, user, clearError } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const successMessage = searchParams.get("message")

  const form = useFormWithZod({
    schema: signInSchema,
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  // Clear error when component unmounts or inputs change
  useEffect(() => {
    if (error) {
      clearError()
    }
  }, [watch("username"), watch("password"), clearError])

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.username, data.password)
      router.push("/")
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  // Demo credentials info with real user data
  const demoCredentials = [
    { username: "mor_2314", password: "83r5^_", name: "John Doe" },
    { username: "kevinryan", password: "kev02937@", name: "David Morrison" },
    { username: "donero", password: "ewedon", name: "Don Romer" },
    { username: "derek", password: "jklg*_56", name: "Derek Powell" },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              p: 4,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Logo />
            </Box>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {successMessage}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
                  Sign in to your account
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    data-testid="username"
                    fullWidth
                    label="Username"
                    variant="outlined"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
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
                    type="password"
                    variant="outlined"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#666666", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControlLabel
                    data-testid="remember-me"
                    control={
                      <Checkbox
                        {...register("rememberMe")}
                        sx={{
                          color: "#666666",
                          "&.Mui-checked": {
                            color: "#000000",
                          },
                        }}
                      />
                    }
                    label="Remember me"
                    sx={{ mb: 3 }}
                  />

                  <Button
                    data-testid="sign-in-button"
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{ mb: 3, py: 1.5 }}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>

                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{" "}
                      <Link href="/join" className="text-black underline hover:no-underline">
                        Sign up
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                  Demo Credentials
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Use any of these credentials to test the application:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {demoCredentials.map((cred, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {cred.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Username: {cred.username} | Password: {cred.password}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
