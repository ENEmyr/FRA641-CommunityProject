export default function authHeader() {
  let userData = JSON.parse(localStorage.getItem('userData'))
  if (userData && userData.access_token) {
    return { 'Authorization': `${userData.token_type == 'bearer' ? 'Bearer' : userData.token_type} ${userData.access_token}` }
  } else {
    return {}
  }
}
