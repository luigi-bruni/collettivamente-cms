import { NavigationBuilder, NavigationBuilderProps } from "@camberi/firecms"
import { authorCollection, categoryColletion, editorialCollection, linkCollection, postCollection } from "./collections"

export const navigation: NavigationBuilder = async ({
  user,
  authController
}: NavigationBuilderProps) => {
  if (user?.email === "collettivamente.blog@gmail.com") {
    const sampleUser = await Promise.resolve({
      roles: ["admin"]
    })
    authController.setExtra(sampleUser)
  }

  return ({
    collections: [
      authorCollection,
      categoryColletion,
      postCollection,
      linkCollection,
      editorialCollection,
    ]
  });
};