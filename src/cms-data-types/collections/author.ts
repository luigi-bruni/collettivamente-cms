import { buildSchema, buildProperty, buildCollection } from "@camberi/firecms"
import slugify from "slugify"
import { isOwner } from "../../utils"

export type Author = {
  name: string;
  thumb: string;
  slug: string;
}

export const authorSchema = buildSchema<Author>({
  name: 'Author',
  properties: {
    name: {
      title: "Name",
      validation: { required: true },
      dataType: "string"
    },
    thumb: buildProperty({
      title: "Thumb",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "thumbs",
          acceptedFiles: ["image/*"]
        }
      }
    }),
    slug: {
      title: "Slug",
      dataType: "string",
    }
  },
  onPreSave: ({
    values
  }) => {
    if (!values.slug) {
      values.slug = slugify(values.name, { lower: true, trim: true });
    }
    return values
  }
});

export const authorCollection = buildCollection({
  relativePath: "authors",
  schema: authorSchema,
  name: "Autori",
  permissions: ({ user }) => ({
    edit: isOwner(user),
    create: isOwner(user),
    delete: isOwner(user)
  })
})
