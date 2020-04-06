const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createNode  } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  } 

  if (node.internal.type === "File" && node.sourceInstanceName === "posts") {
    createNodeField({
      node,
      name: "post",
      value: require(node.absolutePath),
    });
    // console.log(node);
    // console.log(require(node.absolutePath));
  }
}
