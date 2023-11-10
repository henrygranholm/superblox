import { useCallback } from "react";
import { useActiveWeb3React } from "..";
import { ApplicationModal } from "../../constants";
import store from "../../store";

export function useWalletModalToggle() {
    const toggleModal = store(state => state.toggleModal)
    return useCallback(() => toggleModal( ApplicationModal.WALLET ), [ toggleModal ])
}

export function useMindMapModalToggle() {
    const toggleModal = store(state => state.toggleModal)
    return useCallback(() => toggleModal( ApplicationModal.MINDMAP ), [ toggleModal ])
}

export function useGalleryModalToggle() {
    const toggleModal = store(state => state.toggleModal)
    return useCallback(() => toggleModal( ApplicationModal.GALLERY ), [ toggleModal ])
}

export function useModalOpen( modal ) {
    const openModal = store( state => state.openModal )
    return openModal === modal
}

export function useBlockNumber() {
    const { chainId } = useActiveWeb3React()

    const blockNumber = store(state => state.blockNumber)

    return blockNumber[chainId ?? -1]
}