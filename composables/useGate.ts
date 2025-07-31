export default function useGate(role: string) {
  const auth = useAuthStore();

  return auth.user?.role == role;
}
