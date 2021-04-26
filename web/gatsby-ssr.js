/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from "react"
import { navigate } from "gatsby"
import { AuthConfig } from "react-use-auth"
import { Auth0 } from "react-use-auth/auth0"
import { ApolloProvider } from "react-apollo-hooks"
import { client } from "./src/apollo"

export const wrapRootElement = ({ element }) => (
  <>
    "walterss"
    <ApolloProvider client={client}>
      <AuthConfig
        navigate={navigate}
        authProvider={Auth0}
        params={{
          domain: "dev-kz97zd8w.us.auth0.com",
          clientID: "CpVipTTE9XIK1kxGEPyLhCgMo6zWH2af",
        }}
      >
        {element}
      </AuthConfig>
    </ApolloProvider>
  </>
)
