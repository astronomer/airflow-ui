import { get, checkExpire, clearAuth } from './localStorage';

const authCheck = (): boolean => {
  const token = get('token');

  if (token) {
    // Only return true if token not expired
    const expire = checkExpire('token');
    if (!expire) return true;

    console.log('Token invalid, please reauthenticate.');
    clearAuth();
  }

  return false;
};

export default authCheck;
