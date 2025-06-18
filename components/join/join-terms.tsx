"use client"

import { FormControlLabel, Checkbox, Typography } from "@mui/material"
import Link from "next/link"

interface JoinTermsProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function JoinTerms({ checked, onChange }: JoinTermsProps) {
  return (
    <FormControlLabel
      data-testid="terms"
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          sx={{
            color: "#666666",
            "&.Mui-checked": {
              color: "#000000",
            },
          }}
        />
      }
      label={
        <Typography variant="body2" color="text.secondary">
          I agree to the{" "}
          <Link href="/terms" className="text-black underline hover:no-underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-black underline hover:no-underline">
            Privacy Policy
          </Link>
        </Typography>
      }
      sx={{ mb: 3 }}
    />
  )
}
