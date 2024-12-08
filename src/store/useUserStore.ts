// 全局共享数据示例
import { getInfo } from '@/services/user';
import { UserDetail } from '@/types';

import { create } from 'zustand';
type State = {
  user: UserDetail | null;
};
type Actions = {
  getInfo: () => Promise<void>;
};
const initialState = {
  user: null,
};
const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  getInfo: async () => {
    const res = await getInfo();
    if (res.success) {
      set({ user: res.data });
    }
  },
}));
export default useUserStore;
