import { create } from "zustand";

interface CurrentUserProps {
  id?: string;
  name?: string;
  email?: string;
}

interface UseMeStoreProps extends CurrentUserProps {
  setMe: (data: CurrentUserProps) => void;
  initMe: () => void;
}

const useMeStore = create<UseMeStoreProps>((set) => ({
  id: undefined,
  name: undefined,
  email: undefined,

  setMe: (data) => {
    set(() => ({ ...data }));
  },

  initMe: () => {
    set(() => ({
      id: undefined,
      name: undefined,
      email: undefined,
    }));
  },
}));

export default useMeStore;
