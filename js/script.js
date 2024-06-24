//Obtener datos simulados de usuarios desde la API JSONPlaceholder `https://jsonplaceholder.typicode.com/users`. ->fetch CHEK
//Agregar una edad aleatoria a cada usuario -> math random->CHEK
//Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`  -> indice +1 y extension google CHEK
//Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address ->inerhtml? y spread y estructuring CHEK


const listaUsuarios = document.getElementById("listaUsuarios")

fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => {
    if (!response.ok) {
      throw new Error('La solicitud no tuvo exito');
    }
    return response.json();
  })
.then(users => {
    const userDetails = users.map((user, index) => {
        const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
        const img = `./assets/img/${index + 1}.jpeg`;
        const { street, suite, city } = user.address;
        const address = `${street}, ${suite}, ${city}`;
        
        return {
            ...user,
            age,
            img,
            address
        };
    });

    userDetails.forEach(user => {
        const userItem = document.createElement('li');

        const imgElement = document.createElement('img');
        imgElement.src = user.img;
        imgElement.alt = user.name;

        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';

        const { name, age, username, phone, email, company: { name: companyName }, address } = user;

        userInfo.innerHTML = `
            <strong>Nombre:</strong> ${name}<br>
            <strong>Edad:</strong> ${age}<br>
            <strong>Username:</strong> ${username}<br>
            <strong>Teléfono:</strong> ${phone}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Compañía:</strong> ${companyName}<br>
            <strong>Dirección:</strong> ${address}
        `;

        userItem.appendChild(imgElement);
        userItem.appendChild(userInfo);

        listaUsuarios.appendChild(userItem);
    });
})
.catch((error) => {
    console.log('Error: no se pudo obtener usurios');
  });


 /* fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    if (!response.ok) {
      throw new Error('La solicitud no tuvo exito');
    }
    return response.json();
  })
  .then((data) => {
     console.lof(data);
    })

  .catch((error) => {
      console.log('Error: no se pudo obtener usurios')
    });
  });*/