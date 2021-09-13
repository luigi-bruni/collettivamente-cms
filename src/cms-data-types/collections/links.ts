import { buildSchema, buildProperty, buildCollection } from "@camberi/firecms"
import slugify from "slugify"
import { isOwner } from "../../utils"

export type Link = {
  name: string;
  thumb: string;
  slug: string;
}

export const linkSchema = buildSchema<Link>({
  name: 'Link',
  properties: {
    name: {
      title: "Link",
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

export const linkCollection = buildCollection({
  relativePath: "links",
  schema: linkSchema,
  name: "Links",
  permissions: ({ user }) => ({
    edit: isOwner(user),
    create: isOwner(user),
    delete: isOwner(user)
  })
})
