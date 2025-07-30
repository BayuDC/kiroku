export default function useGetStore(store: 'category' | string) {
  switch (store) {
    case 'category':
      return useCategoryStore();
    default:
      throw new Error('Invalid store type');
  }
}
