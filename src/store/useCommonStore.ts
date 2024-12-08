// 全局共享数据示例
import { getNotionPagesById } from '@/services/notion';
import { INotionPage } from '@/types/notion';

import { create } from 'zustand';
type State = {
  notionPages: INotionPage[];
};
type Actions = {
  getNotionPages: () => Promise<void>;
};
const initialState = {
  notionPages: [],
};
const useCommonStore = create<State & Actions>((set) => ({
  ...initialState,
  getNotionPages: async () => {
    const res = await getNotionPagesById('11ed250f8d4d8017b9e0fab43dfea888');
    if (res.success) {
      set({ notionPages: res.data });
    }
  },
}));
export default useCommonStore;
