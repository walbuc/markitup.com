/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box as BaseBox } from 'theme-ui'

const Box = ({ fontSize = null, width = null, ...props }) => (
  <BaseBox
    sx={{
      fontSize: fontSize,
      width: width,
      margin: t => {
        console.log(t, 'me llama')
      },
    }}
    {...props}
  />
)

export default Box
