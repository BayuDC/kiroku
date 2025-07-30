export default function useGetStore(store: 'category' | 'user' | string) {
  switch (store) {
    case 'category':
      return useCategoryStore();
    case 'user':
      return useUserStore();
    default:
      throw new Error('Invalid store type');
  }
}
