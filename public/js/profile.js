let tokenP = JSON.parse(localStorage.getItem('token'))

fetch(`https://skate.up.railway.app/profile`, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json',
        'x-access-token': tokenP
    },
})
    .then(response => response.json())
    .then(item => {
        let name = document.getElementById('name')
        let yearexp = document.getElementById('yearexp')
        let specialty = document.getElementById('specialty')
        let email = document.getElementById('email')
        let password = document.getElementById('password')
        let password2 = document.getElementById('password2')
        name.value = item.name
        yearexp.value = item.yearexp
        specialty.value = item.specialty
        email.value = item.email
    })
    .catch(err => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Debe iniciar sesión primero`
        })
    })

function modifyProfile() {
    const btn = document.getElementById('btnSendProfile')
    btn.addEventListener('click', () => {
        let name = document.getElementById('name').value
        let yearexp = document.getElementById('yearexp').value
        let specialty = document.getElementById('specialty').value
        let password = document.getElementById('password').value
        let password2 = document.getElementById('password2').value

        if (password !== password2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden'
            })
        } else {
            const data = {
                name,
                yearexp,
                specialty,
                password
            }
            if (!Object.values(data).every(value => value != '')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes rellenar todos los campos!'
                })
            } else {
                fetch(`https://skate.up.railway.app/profile`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'x-access-token': tokenP
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(res => {
                        if (res.auth) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Genial!',
                                text: `Perfil actualizado`
                            })
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
        }
    })
}

modifyProfile()

//Delete
function deleteSend() {
    const btn = document.getElementById('btnDeleteProfile')
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let token = JSON.parse(localStorage.getItem('token'))
        fetch(`https://skate.up.railway.app/profile/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': token
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.auth) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Has eliminado tu auto correctamente`
                    })
                    localStorage.removeItem('token');
                    location.reload()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.message}`
                    })
                }
            }
            )
    })
}

deleteSend()