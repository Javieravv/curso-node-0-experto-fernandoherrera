const miFormulario = document.querySelector('form') 

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault()
    const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/login'
            : 'https://cafe-api-javv.herokuapp.com/api/auth/login'
    const formData = {}

    for (let el of miFormulario.elements) {
        if ( el.name.length > 0) { 
            formData[el.name] = el.value
        }
    }
    fetch( url, {
        method: 'POST',
        body: JSON.stringify ( formData ),
        headers: { 'Content-Type': 'application/json'}
    })
    .then ( resp => resp.json())
    .then ( ({ msg, token}) => {
        if ( msg ) { 
            return console.error ( msg )
        }
        localStorage.setItem ( 'token', token )
    })
    .catch ( err => {
        console.log ( err )
    })
})


function handleCredentialResponse(response) {
    const body = { id_token: response.credential}

    const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/google'
            : 'https://cafe-api-javv.herokuapp.com/api/auth/google'

    // Llamamos el endpoint y le enviaos el token
    fetch ( url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify ( body )
    })
    .then( resp => resp.json() )
    .then( ({ token }) => {
        localStorage.setItem ('token', token)
    })
    .catch( console.log  );


}

const button = document.getElementById('google_signout')
// no funciona!!!!
button.onclick = () => {
    // console.log ( google.accounts.id, 'EMAIL...', localStorage.getItem( 'email'))
    alert ("Intentando salir....")
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke ( localStorage.getItem( 'email', done => {
        localStorage.clear()
        location.reload()
    }))
}