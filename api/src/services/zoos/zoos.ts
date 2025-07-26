import type {
  QueryResolvers,
  MutationResolvers,
  ZooRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const zoos: QueryResolvers['zoos'] = () => {
  return db.zoo.findMany()
}

export const zoo: QueryResolvers['zoo'] = ({ id }) => {
  return db.zoo.findUnique({
    where: { id },
  })
}

export const createZoo: MutationResolvers['createZoo'] = ({ input }) => {
  return db.zoo.create({
    data: input,
  })
}

export const updateZoo: MutationResolvers['updateZoo'] = ({ id, input }) => {
  return db.zoo.update({
    data: input,
    where: { id },
  })
}

export const deleteZoo: MutationResolvers['deleteZoo'] = ({ id }) => {
  return db.zoo.delete({
    where: { id },
  })
}

export const Zoo: ZooRelationResolvers = {
  animals: (_obj, { root }) => {
    return db.zoo.findUnique({ where: { id: root?.id } }).animals()
  },
}
