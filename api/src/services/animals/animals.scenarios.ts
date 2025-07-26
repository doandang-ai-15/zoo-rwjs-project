import type { Prisma, Animal } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AnimalCreateArgs>({
  animal: {
    one: { data: { name: 'String', zoo: { create: { name: 'String' } } } },
    two: { data: { name: 'String', zoo: { create: { name: 'String' } } } },
  },
})

export type StandardScenario = ScenarioData<Animal, 'animal'>
