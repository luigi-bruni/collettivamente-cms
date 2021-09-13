import { buildSchema, buildCollection } from "@camberi/firecms"
import slugify from "slugify"
import { isOwner } from "../../utils"

export type Category = {
  name: string;
  slug: string;
}

export const categorySchema = buildSchema<Category>({
  name: 'Category',
  properties: {
    name: {
      title: "Name",
      validation: { required: true },
      dataType: "string"
    },
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

export const categoryColletion = buildCollection({
  relativePath: "categories",
  schema: categorySchema,
  name: "Categorie",
  permissions: ({ user }) => ({
    edit: isOwner(user),
    create: isOwner(user),
    delete: isOwner(user),
  })
})