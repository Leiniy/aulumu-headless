// Type definitions for the project

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export interface Testimonial {
  name: string
  title: string
  quote: string
  avatar?: string
}

export interface WorkflowSlide {
  title: string
  description: string
  icon: string
}

export interface PressQuote {
  text: string
  source: string
}

export interface TrustBadge {
  icon: string
  title: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}
