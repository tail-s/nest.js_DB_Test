import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'board',
    storage: sessionStorage,
})

export const boardState = atom({
    key: 'board',
    default: [],
    effects_UNSTABLE: [persistAtom],
});