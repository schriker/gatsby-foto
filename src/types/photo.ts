import { FluidObject } from "gatsby-image"

export type CategoryType = {
  name: string
}

export type ImageFileType = {
  childImageSharp: {
    fluid: FluidObject & {
      originalImg: string
    }
  }
  fields: {
    exif: ExifType
  }
}

export type PhotoFileType = {
  imageFile: ImageFileType
  url: string
}

export type ExifType = {
  camera: string
  exposure: string
  fstop: string
  iso: string
  lens: string
}

export type PhotoType = {
  file: PhotoFileType
  category: CategoryType
  title: string
}
