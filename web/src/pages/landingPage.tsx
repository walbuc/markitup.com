/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import { Text, Button, Flex, Textarea } from 'theme-ui'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Box from '../components/Box'
import Heading from '../components/Heading'
import { useAuth } from 'react-use-auth'
import { PageProps } from 'gatsby'
import { useMutation, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import useRemark from '../useRemark'

type Page = {
  userId: string
  pageId: string
  pageName: string
  content: string
}

function useServerContent({ userId, pageId, setPageContent }) {
  const { loading, data } = useQuery(GET_PAGE, {
    variables: { userId, pageId },
  })
  // Show static content while fetching dynamic content.
  useEffect(() => {
    if (data) setPageContent(data.page.content)
  }, [data])
}

const GET_PAGE = gql(`
    query page($userId: String, $pageId:String) {
        page(userId: $userId, pageId: $pageId) {
            content
            createdAt
            lastUpdatedAt
        }
    }
`)

const UPDATE_PAGE = gql(`
    mutation updatePage($userId:String!, $pageId:String!, $content:String!) {
      updatePage(userId: $userId, pageId: $pageId, content: $content ) {
        content
        lastUpdatedAt
      }
    }
`)

const LandingPage = ({
  pageContext: { pageName, content, userId, pageId },
}: PageProps<any, Page>) => {
  const [pageContent, setPageContent] = useState(content)
  useServerContent({ userId, pageId, setPageContent })
  const { isAuthenticated, user } = useAuth()
  const [saveLandingPage, { data, loading }] = useMutation(UPDATE_PAGE, {
    variables: {
      userId,
      pageId,
      content: pageContent,
    },
  })
  const renderedPage = useRemark(pageContent)

  const editable = isAuthenticated() && userId === user.sub

  return (
    <Layout>
      <SEO title={pageName} />
      <Box>
        <SEO title="MarkItUp" />
      </Box>
      <Heading fontSize={[3, 4, 5]}>{pageName}</Heading>
      <Text my={[1, 3]}>Write your landing page content!</Text>
      {editable ? (
        <Flex m={[1, 3]} sx={{ flexWrap: 'wrap', div: { p: [1, 3] } }}>
          <Box width={['100%', '50%', '50%']}>
            <Textarea
              value={pageContent}
              onChange={e => setPageContent(e.target.value)}
            />
            <Button m={2} variant={'primary'} onClick={() => saveLandingPage()}>
              Save Page
            </Button>
            <Text m={2}>Share this url with anyone!</Text>
          </Box>
          <Box width={['100%', '50%', '50%']}>{renderedPage}</Box>
        </Flex>
      ) : (
        <Box width={['100%']}>{renderedPage}</Box>
      )}
    </Layout>
  )
}

export default LandingPage
