//Cars
function renderCars() {
    fetch(`https://skate.up.railway.app/all`)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerCard = document.getElementById('containerCard')
            const containerAdmin = document.getElementById('containerAdmin')
            while (containerCard.firstChild) {
                containerCard.removeChild(containerCard.firstChild);
            }
            const fragmentTable = document.createDocumentFragment()
            const templateTable = document.getElementById('templateTable').content;
            const clone = templateTable.cloneNode(true)
            fragmentTable.appendChild(clone)
            containerCard.appendChild(fragmentTable)

            const containerCars = document.getElementById('carsData')
            const fragmentRows = document.createDocumentFragment()

            const templateRows = document.getElementById('templateRows').content;
            data.map(item => {
                let t1 = templateRows.getElementById('1')
                let t2 = templateRows.getElementById('2')
                let t3 = templateRows.getElementById('3')
                let t4 = templateRows.getElementById('4')
                let t5 = templateRows.getElementById('5')
                let check = templateRows.getElementById('check')
                let img = templateRows.getElementById('imgTable')
                t1.textContent = item.id
                t3.textContent = item.name
                t4.textContent = item.yearexp
                t5.textContent = item.specialty
                check.dataset.id = item.id
                check.checked = item.status
                img.src = `./img/uploads/${item.img}`

                const clone = templateRows.cloneNode(true)
                fragmentRows.appendChild(clone)
            })
            containerCars.appendChild(fragmentRows)
            checkbox()
        })
}

renderCars()


function checkbox() {
    const buttons = document.querySelectorAll('.checkbox');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const data = {
                status:btn.checked
            }
            fetch(`https://skate.up.railway.app/admin/${btn.dataset.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Estado se ha cambiado`
                        })
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
    })
}