function register() {
    const btn = document.getElementById('btnSendRegister')
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let name = document.getElementById('name').value
        let yearexp = document.getElementById('yearexp').value
        let specialty = document.getElementById('specialty').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let password2 = document.getElementById('password2').value
        let fd = new FormData();
        fd.append("profileImg", document.getElementById("profileImg").files[0]);

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
                email,
                password
            }
            fd.append("data", JSON.stringify(data))
            if (!Object.values(data).every(value => value != '')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debes rellenar todos los campos!'
                })
            } else {
                const res = await fetch(`https://skate.up.railway.app/register/`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json"
                    },
                    body: fd
                })
                console.log(res)
                if (res.status === 201) {
                    localStorage.setItem('token', JSON.stringify(res.token))
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: `Te has registrado correctamente`
                    })
                    location.href = "/index.html"
                } else {
                    if (res.status >= 400 || res.status < 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops!',
                            text: `Error, vuelve a intentarlo`
                        })
                    }
                }
            }
        }
    })
}



register()