export default function validatePermissions(roleArray) {
  var user = JSON.parse(sessionStorage.getItem('user'));
  if(user) {
    if(roleArray.length > 0 && !roleArray.includes(user.role)) {
      window.location.replace("/")
    }
  } else {
    window.location.replace("/")
  }
}
