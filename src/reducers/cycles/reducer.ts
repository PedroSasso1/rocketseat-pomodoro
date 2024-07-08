import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(cyclesState: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(cyclesState, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = cyclesState.cycles.findIndex(
        (cycle) => cycle.id === cyclesState.activeCycleId,
      )
      if (currentCycleIndex === -1) {
        return cyclesState
      }
      return produce(cyclesState, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = cyclesState.cycles.findIndex(
        (cycle) => cycle.id === cyclesState.activeCycleId,
      )
      if (currentCycleIndex === -1) {
        return cyclesState
      }
      return produce(cyclesState, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    default:
      return cyclesState
  }
}
