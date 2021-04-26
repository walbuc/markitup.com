/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      miuapi {
        allPages {
          userId
          pageId
          content
          pageName
          createdAt
        }
      }
    }
  `)

  const LandingPage = path.resolve('./src/pages/landingPage.tsx')
  result.data.miuapi.allPages.forEach(
    ({ userId, pageId, content, pageName, createdAt }) => {
      actions.createPage({
        path: `page/${pageId}`,
        component: LandingPage,
        context: { pageId, userId, content, pageName },
      })
    }
  )

  return true
}
