export const useTitleStore = defineStore('title', () => {
  const text = ref<string>('Dashboard');
  return {
    text,
  };
});

export const setTitle = (newTitle: string) => {
  const store = useTitleStore();
  store.text = newTitle;
};
