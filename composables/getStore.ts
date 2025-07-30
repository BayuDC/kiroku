export default function useGetStore(store: 'category' | 'user' | 'consumable' | 'tool' | string) {
  switch (store) {
    case 'category':
      return useCategoryStore();
    case 'user':
      return useUserStore();
    case 'consumable':
      return useConsumableStore();
    case 'tool':
      return useToolStore();
    default:
      throw new Error('Invalid store type');
  }
}
