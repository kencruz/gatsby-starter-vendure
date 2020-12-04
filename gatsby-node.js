const Promise = require('bluebird')
const path = require('path')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
    resolve(
      graphql(
        `
          {
            allMoltinProduct {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allMoltinProduct.edges.forEach(edge => {
          createPage({
            path: `/product/${edge.node.id}/`,
            component: productPageTemplate,
            context: {
              id: edge.node.id,
            },
          })
        })
      }),
    )
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const {createNode} = actions
  createResolvers({
    Vendure_SearchResultAsset: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.preview,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  createResolvers({
    Vendure_Asset: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.preview,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
  })
}
