export default function useGetStore(store: 'category' | 'user' | 'consumable' | string) {
  switch (store) {
    case 'category':
      return useCategoryStore();
    case 'user':
      return useUserStore();
    case 'consumable':
      return useConsumableStore();
    default:
      throw new Error('Invalid store type');
  }
}
