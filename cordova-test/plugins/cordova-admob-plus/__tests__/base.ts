import { fireDocumentEvent, waitEvent } from '../ts/base'

test('waitEvent() once for sucess event', async () => {
  const p = waitEvent('sucess')
  fireDocumentEvent('sucess')

  const event = await p
  expect(event.type).toBe('sucess')
})

test('waitEvent() once for fail event', async () => {
  const p = waitEvent('sucess', 'fail')
  fireDocumentEvent('fail')

  const event = await p.catch((x: Event) => x)
  expect(event.type).toBe('fail')
})
