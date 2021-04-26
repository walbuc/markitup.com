import { useState, useEffect } from 'react'
import remark from 'remark'
import remark2react from 'remark-react'
import unified from 'unified'
import parse from 'remark-parse'

// import codeScreenshot from "./remarkCodeScreenshot";
// import urlThumbnail from "./remarkUrlThumbnail";
// import twitterUserLinks from "./remarkTwitterUserLinks";
// import { remarkGiphySearch, GiphySearch } from "./remarkGiphySearch";
// import Screenshot from "../Screenshot";

// import { githubLinks, GithubLink } from "./remarkGithubLinks";

// const customHandler = type => (h, node) => {
//   const props = {
//     node,
//   }

//   return h(node, type, props)
// }

export const remarkCompile = input =>
  new Promise((resolve, reject) => {
    unified()
      .use(parse)
      .use(remark2react, {
        sanitize: true,
      })
      .process(input, (err, output) => {
        if (err) {
          reject(err)
        } else {
          resolve(output)
        }
      })
  })

export default function useRemark(input) {
  const [rendered, setRendered] = useState('')

  useEffect(() => {
    remarkCompile(input)
      .then((output: any) => setRendered(output.contents))
      .catch(err => console.error(err))
  }, [input])

  return rendered
}
