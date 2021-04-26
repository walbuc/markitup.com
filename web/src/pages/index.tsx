import React, { useEffect } from 'react'
import { Text, Button } from 'theme-ui'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Box from '../components/Box'
import Heading from '../components/Heading'
import Dashboard from '../components/Dashboard'
import { useAuth } from 'react-use-auth'
import { PageProps } from 'gatsby'

const IndexPage = (props: PageProps) => {
  const { isAuthenticated } = useAuth()
  return (
    <Layout>
      <SEO title="Home" />
      <Box>
        <SEO title="MarkItUp" />
      </Box>
      {isAuthenticated() && <Dashboard />}
    </Layout>
  )
}

export default IndexPage
