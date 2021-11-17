export default function authHeader() {
  let userData = JSON.parse(localStorage.getItem('userData'))
  if (userData && userData.token) {
    return { 'Authorization': 'Bearer ' + userData.token }
  } else {
    return {}
  }
}
