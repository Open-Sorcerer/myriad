import { create } from 'zustand'
import { Identity } from '@semaphore-protocol/identity'

type State = {
	identity: Identity
	search: string
}

type Action = {
	setIdentity: (identity: State['identity']) => void
	setSearch: (search: State['search']) => void
}

export const useStore = create<State & Action>(set => ({
	identity: {} as Identity,
	setIdentity: identity => set({ identity }),
	search: '',
	setSearch: search => set({ search }),
}))
