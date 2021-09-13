import { buildSchema, buildProperty, buildCollection } from "@camberi/firecms"
import slugify from "slugify"
import firebase from "firebase/app"
import { isOwner } from "../../utils"
import { RichTextEditorField } from "../../custom-fields/html-editor"

export type Post = {
  title: string;
  slug: string;
  publish_date: Date;
  short_description: string;
  main_body: string;
  published: boolean;
  main_image?: string;
  tags?: string[];
  categories: firebase.firestore.DocumentReference[];
}

export const postSchema = buildSchema<Post>({
  name: 'Post',
  properties: {
    title: {
      title: "Titolo",
      validation: { required: true },
      dataType: "string"
    },
    slug: {
      title: "Slug",
      dataType: "string"
    },
    publish_date: {
      title: "Data di pubblicazione",
      dataType: "timestamp",
    },
    short_description: {
      title: "Descrizione breve",
      dataType: "string"
    },
    main_body: {
      title: "Testo",
      dataType: "string",
      validation: { required: true },
      config: {
        field: RichTextEditorField,
      },
    },
    published: {
      title: "Pubblicato",
      dataType: "boolean",
      validation: { required: true },
      columnWidth: 100,
    },
    main_image: buildProperty({
      title: "Immagine",
      dataType: "string",
      config: {
        storageMeta: {
          mediaType: "image",
          storagePath: "post_images",
          acceptedFiles: ["image/*"]
        }
      }
    }),
    tags: {
      title: "Tag",
      dataType: "array",
      of: {
        dataType: "string"
      }
    },
    categories: {
      title: "Categoria",
      dataType: "array",
      of: {
        dataType: "reference",
        collectionPath: "categories"
      }
    }
  },
  onPreSave: ({
    values
  }) => {
    if (!values.slug) {
      values.slug = slugify(values.title, { lower: true, trim: true });
    }
    if (!values.publish_date) {
      values.publish_date = new Date();
    }
    if (!values.short_description) {
      values.short_description = values.title.substr(0, 200);
    }
    return values
  }
});

export const postCollection = buildCollection({
  relativePath: "posts",
  schema: postSchema,
  name: "Posts",
  permissions: ({ user }) => ({
    edit: isOwner(user),
    create: isOwner(user),
    delete: isOwner(user)
  })
})
