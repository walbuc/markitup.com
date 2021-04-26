// @jsx jsx
import { jsx } from 'theme-ui'
import React, { useReducer } from 'react'
import { Text, Button, Input } from 'theme-ui'
import Box from '../components/Box'
import { useAuth } from 'react-use-auth'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Link } from 'gatsby'

const emptyState = {
  pageName: '',
  status: 'IDLE',
}

type LandingPage = { userId: string; pageId: string }

interface createPage {
  createPage: LandingPage
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'pageName':
      return { ...state, pageName: action.pageName }
    case 'reset':
    default:
      return emptyState
  }
}

const handleSubmit = send => e => {
  send()
  e.preventDefault()
}

const CREATE_PAGE = gql`
  mutation createPage($userId: String!, $pageName: String!) {
    createPage(userId: $userId, pageName: $pageName) {
      pageId
    }
  }
`

const CreatePage = ({ userId }) => {
  const [state, dispatch] = useReducer(reducer, emptyState)
  const updateFieldValue = fieldName => event =>
    dispatch({ type: fieldName, [fieldName]: event.target.value })
  const [createPage, { data, loading }] = useMutation<createPage>(CREATE_PAGE, {
    variables: { userId, pageName: state.pageName },
  })

  return (
    <>
      <form onSubmit={handleSubmit(createPage)}>
        <Input
          placeholder="Name your page"
          value={state.pageName}
          onChange={updateFieldValue('pageName')}
        />
        {!data && (
          <Box>
            <Button bg="highlight" disabled={loading}>
              Create a new Page!
            </Button>
            <Button
              type="button"
              bg="secondary"
              onClick={() => dispatch({ type: 'reset' })}
            >
              Reset Values
            </Button>
          </Box>
        )}
      </form>

      {data && (
        <Link to={`page/${data.createPage.pageId}`}>
          Start adding content to your page!
        </Link>
      )}
    </>
  )
}

const Dashboard = () => {
  const { user, userId } = useAuth()

  return (
    <Box m={[2, 3, 4]}>
      <Text sx={{ fontSize: [3, 4, 5] }} mb={[3]}>
        Hey, {user.nickname}, welcome back!
      </Text>
      <Text sx={{ fontSize: [3, 4, 5] }} mb={[3, 3, 4]}>
        Start creating pages!
      </Text>
      <CreatePage userId={userId} />
    </Box>
  )
}

export default Dashboard
