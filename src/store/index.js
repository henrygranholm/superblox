import create from "zustand"
import produce from "immer"

const now = () => new Date().getTime()

const store = create(set => ({
    openModal: null,
    toggleModal: ( modal ) => set(produce(state => {
        state.openModal = state.openModal ? null : modal
    })),

    transactions: {},
    addTransaction: ({ chainId, from, hash, approval, summary, claim }) => set(produce(state => {
        if (state.transactions[chainId]?.[hash]) {
            throw Error('Attempted to add existing transaction.')
        }
        const txs = state.transactions[chainId] ?? {}
        txs[hash] = { hash, approval, summary, claim, from, addedTime: now() }
        state.transactions[chainId] = txs
    })),
    finalizeTransaction: ({ hash, chainId, receipt }) => set(produce(state => {
        const tx = state.transactions[chainId]?.[hash]
        if (!tx) {
            return
        }
        tx.receipt = receipt
        tx.confirmedTime = now()
    })),
    checkedTransaction: ({ chainId, hash, blockNumber }) => set(produce(state => {
        const tx = state.transactions[chainId]?.[hash]
        if (!tx) {
            return
        }
        if (!tx.lastCheckedBlockNumber) {
            tx.lastCheckedBlockNumber = blockNumber
        } else {
            tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
        }
    })),

    blockNumber: {},
    updateBlockNumber: ({ chainId, blockNumber }) => set(produce(state => {
        if (typeof state.blockNumber[chainId] !== 'number') {
            state.blockNumber[chainId] = blockNumber
        } else {
            state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
        }
    }))
}))

export default store