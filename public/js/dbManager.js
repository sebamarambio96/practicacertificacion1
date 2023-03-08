const containerForm = document.getElementById('containerForm')
const fragmentForm = document.createDocumentFragment()
//Cars
function renderCars() {
    fetch(`https://skate.up.railway.app/all`)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerCard = document.getElementById('containerCard')
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
                let t6 = templateRows.getElementById('6')
                let img = templateRows.getElementById('imgTable')
                t1.textContent = item.id
                t3.textContent = item.name
                t4.textContent = item.yearexp
                t5.textContent = item.specialty
                if (item.status) {
                    t6.textContent = "Aprobado"
                    t6.className = "text-success"
                } else {
                    t6.textContent = "En revisión"
                    t6.className = "text-warning"
                }
                
                img.src = `./img/uploads/${item.img}`

                const clone = templateRows.cloneNode(true)
                fragmentRows.appendChild(clone)
            })
            containerCars.appendChild(fragmentRows)
        })
}

renderCars()
