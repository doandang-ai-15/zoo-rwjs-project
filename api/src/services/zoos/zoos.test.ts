import type { Zoo } from '@prisma/client'

import { zoos, zoo, createZoo, updateZoo, deleteZoo } from './zoos'
import type { StandardScenario } from './zoos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('zoos', () => {
  scenario('returns all zoos', async (scenario: StandardScenario) => {
    const result = await zoos()

    expect(result.length).toEqual(Object.keys(scenario.zoo).length)
  })

  scenario('returns a single zoo', async (scenario: StandardScenario) => {
    const result = await zoo({ id: scenario.zoo.one.id })

    expect(result).toEqual(scenario.zoo.one)
  })

  scenario('creates a zoo', async () => {
    const result = await createZoo({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a zoo', async (scenario: StandardScenario) => {
    const original = (await zoo({ id: scenario.zoo.one.id })) as Zoo
    const result = await updateZoo({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a zoo', async (scenario: StandardScenario) => {
    const original = (await deleteZoo({ id: scenario.zoo.one.id })) as Zoo
    const result = await zoo({ id: original.id })

    expect(result).toEqual(null)
  })
})
