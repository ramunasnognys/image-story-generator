import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
/**
 * A React component that renders a styled div element with customizable className and additional props.
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS class names to apply to the div.
 * @param {React.Ref} ref - A forwarded ref to be applied to the div element.
 * @returns {React.Element} A styled div element with the provided className and props.
 */
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
/**
 * A React component that renders a div with customizable className and additional props
 * @param {Object} props - The props object
 * @param {string} [props.className] - Additional CSS class names to apply to the div
 * @param {React.Ref} ref - A React ref object to be attached to the div
 * @returns {React.ReactElement} A div element with the specified properties
 */
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  /**
   * Renders a customizable h3 heading component with specific styling
   * @param {Object} props - The component props
   * @param {string} [props.className] - Additional CSS classes to apply to the heading
   * @param {React.Ref} ref - React ref to be forwarded to the h3 element
   * @returns {React.ReactElement} A styled h3 heading element
   */
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  /**
   * A React component that renders a paragraph element with customizable styling.
   * @param {Object} props - The props object containing component properties.
   * @param {string} [props.className] - Additional CSS class names to apply to the paragraph.
   * @param {React.Ref} ref - A forwarded ref to access the underlying DOM element.
   /**
    * Creates a div element with a custom className and additional props
    * @param {Object} props - The component props
    * @param {string} props.className - Additional CSS class names to apply to the div
    * @param {React.Ref} ref - React ref object to be attached to the div
    * @returns {React.ReactElement} A div element with the specified className and props
    */
   * @returns {React.ReactElement} A styled paragraph element.
   ```
   /**
    * A React component that renders a div with flexbox and padding styles.
    * @param {Object} props - The component props.
    * @param {string} [props.className] - Additional CSS class names to apply to the div.
    * @param {React.Ref} ref - A ref to be forwarded to the div element.
    * @returns {React.ReactElement} A div element with applied styles and forwarded ref.
    */
   ```
   */
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
