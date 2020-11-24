/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fastExif = require("fast-exif")

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const exifFieldName = "exif"
  const exifEmptyNodeValue = {
    camera: "",
    fstop: "",
    exposure: "",
    iso: "",
    lens: "",
  }
  if (
    node.sourceInstanceName === `__PROGRAMMATIC__` &&
    node.internal.type === `File`
  ) {
    try {
      const exifData = await fastExif.read(node.absolutePath)
      const exifNodeValue = {
        camera: exifData.image.Model || "",
        fstop: exifData.exif.FNumber.toString() || "",
        exposure:
          exifData.exif.ExposureTime < 1
            ? `1/${1 / exifData.exif.ExposureTime}s`
            : exifData.exif.ExposureTime,
        iso: exifData.exif.ISO.toString() || "",
        lens: exifData.exif.LensModel || "",
      }
      createNodeField({
        node,
        name: exifFieldName,
        value: exifNodeValue,
      })
    } catch (error) {
      createNodeField({
        node,
        name: exifFieldName,
        value: exifEmptyNodeValue,
      })
    }
  } else {
    createNodeField({
      node,
      name: exifFieldName,
      value: exifEmptyNodeValue,
    })
  }
}

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode, createNodeField } = actions
  await createResolvers({
    STRAPI_UploadFile: {
      imageFile: {
        type: "File",
        async resolve(source) {
          if (!source.url) {
            throw new Error("Please query URL of an image.")
          }
          let sourceUrl = `${process.env.STRAPI_URL}${source.url}`

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
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
