function checkLogin() {
fetch('http://localhost:8080/getLogin')
.then(response => response.text())
.then(user => {
if (user === 'admin') {
login();
} else {
logout();
}
})
.catch(error => console.error(error));
}
