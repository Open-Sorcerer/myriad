import { create } from 'zustand'
import { Identity } from '@semaphore-protocol/identity'

type State = {
	identity: Identity
	search: string
	reload: boolean
	fid: string
}

type Action = {
	setIdentity: (identity: State['identity']) => void
	setSearch: (search: State['search']) => void
	setReload: (reload: State['reload']) => void
	setFid: (fid: State['fid']) => void
}

export const useStore = create<State & Action>(set => ({
	identity: {} as Identity,
	setIdentity: identity => set({ identity }),
	search: '',
	setSearch: search => set({ search }),
	reload: false,
	setReload: reload => set({ reload }),
	fid: '',
	setFid: fid => set({ fid }),
}))
