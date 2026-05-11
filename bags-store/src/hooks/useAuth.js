import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { currentUser, loading } = useAuthContext();
  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    loading,
  };
};

export default useAuth;