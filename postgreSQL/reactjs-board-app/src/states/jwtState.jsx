import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'jwt',
    storage: sessionStorage,
})

export const jwtState = atom({
    key: 'jwt',
    default: "none",
    effects_UNSTABLE: [persistAtom],
});