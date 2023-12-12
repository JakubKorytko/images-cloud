function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();

  return '';
}

class Token {
  static get value() {
    return getCookie('token');
  }

  static set value(token) {
    document.cookie = `token=${token}`;
  }

  static remove() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

export default Token;
