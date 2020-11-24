import React from "react"
import { PageProps, graphql } from "gatsby"
import { useTypedSelector } from "../store/rootReducer"
import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import { PhotoType } from "../types/photo"
import Gallery from "../components/Gallery/Gallery"

type DataProps = {
  strapi: {
    photos: PhotoType[]
  }
}

const UsingTypescript: React.FC<PageProps<DataProps>> = ({ data }) => {
  const gallery = useTypedSelector(state => state.gallery)

  return (
    <Layout>
      <SEO />
      {gallery.category === null ? (
        <Gallery photos={data.strapi.photos} />
      ) : (
        <Gallery
          photos={data.strapi.photos.filter(
            photo => photo.category.name.toLowerCase() === gallery.category
          )}
        />
      )}
    </Layout>
  )
}

export default UsingTypescript

export const query = graphql`
  {
    strapi {
      photos {
        file {
          imageFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                originalImg
              }
            }
            fields {
              exif {
                camera
                exposure
                fstop
                iso
                lens
              }
            }
          }
          url
        }
        category {
          name
        }
        title
      }
    }
  }
`
