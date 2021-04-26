import React, { useEffect } from "react"
import { Button } from "theme-ui"
import Layout from "./layout"
import Image from "./image"
import SEO from "./seo"
import Box from "./Box"
import Heading from "./Heading"
import { useAuth } from "react-use-auth"
import { useMutation, useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

const UPDATE_USER = gql`
  mutation updateUser($userId: String) {
    updateUser(userId: $userId) {
      userId
    }
  }
`

function useUpdateUser(userId) {
  const [updateUserMutation, { data: userData }] = useMutation(UPDATE_USER, {
    variables: { userId },
  })
  useEffect(() => {
    if (userId) {
      updateUserMutation()
    }
  }, [userId])
}

const LoginButton = () => {
  const { isAuthenticated, login, logout, userId } = useAuth()
  useUpdateUser(userId)

  return !isAuthenticated() ? (
    <Button onClick={login} bg="highlight">
      Get Started!
    </Button>
  ) : (
    <Button onClick={logout} bg="gray">
      Log Out
    </Button>
  )
}

export default LoginButton
