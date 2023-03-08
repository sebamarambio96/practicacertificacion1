function login() {
    const btn = document.getElementById('btnSendLogin')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        const data = {
            email,
            password
        }

        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            fetch(`https://skate.up.railway.app/login/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        console.log(res)
                        localStorage.setItem('token', JSON.stringify(res.token))
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Has ingresado correctamente`
                        })
                        window.location.href = "/index.html"
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.message}`
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    })
}
login()