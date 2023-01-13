import React from "react"

export interface Page {
  name: string
  label: string
  path: string
  icon: React.ReactNode
  component: React.ReactNode
  divider?: boolean
}