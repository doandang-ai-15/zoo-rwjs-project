import type {
  QueryResolvers,
  MutationResolvers,
  AnimalRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const animals: QueryResolvers['animals'] = () => {
  return db.animal.findMany()
}

export const animal: QueryResolvers['animal'] = ({ id }) => {
  return db.animal.findUnique({
    where: { id },
  })
}

export const createAnimal: MutationResolvers['createAnimal'] = ({ input }) => {
  return db.animal.create({
    data: input,
  })
}

export const updateAnimal: MutationResolvers['updateAnimal'] = ({
  id,
  input,
}) => {
  return db.animal.update({
    data: input,
    where: { id },
  })
}

export const deleteAnimal: MutationResolvers['deleteAnimal'] = ({ id }) => {
  return db.animal.delete({
    where: { id },
  })
}

export const Animal: AnimalRelationResolvers = {
  zoo: (_obj, { root }) => {
    return db.animal.findUnique({ where: { id: root?.id } }).zoo()
  },
}
