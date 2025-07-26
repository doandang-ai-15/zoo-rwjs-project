import type { Prisma, Zoo } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ZooCreateArgs>({
  zoo: { one: { data: { name: 'String' } }, two: { data: { name: 'String' } } },
})

export type StandardScenario = ScenarioData<Zoo, 'zoo'>
