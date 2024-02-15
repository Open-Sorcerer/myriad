import { create } from 'zustand'
import { Identity } from '@semaphore-protocol/identity'

type State = {
	identity: Identity
}

type Action = {
	setIdentity: (identity: State['identity']) => void
}

export const useStore = create<State & Action>(set => ({
	identity: {} as Identity,
	setIdentity: identity => set({ identity }),
}))
