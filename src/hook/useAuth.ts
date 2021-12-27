import { useSelector } from 'react-redux';
import { IAuth } from '../redux/reducer/auth.slice';

export default function useAuth() {
  return useSelector((state: { auth: IAuth }) => state.auth.isLoggedIn)
}
