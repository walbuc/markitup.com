import React from "react"
import { Heading as BaseHeading } from "theme-ui"

const Heading = props => (
  <BaseHeading
    sx={{
      fontSize: props.fontSize ?? null,
    }}
    {...props}
  />
)

export default Heading

// Example hoC
const withTypography = Component => props => (
  <Component
    sx={{
      fontSize: props.fontSize ?? null,
    }}
    {...props} // Here we will have classname and emotion will compose styles :)
  />
)

// render prop
const Component = props => {
  return props.children()
}
