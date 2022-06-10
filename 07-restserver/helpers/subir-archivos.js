/**Función para subir archivos.  */
const path = require ('path')
const { v4: uuidv4 } = require ('uuid')

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise( (resolve, reject) => {
        const { archivo }= files;
        // Validar la extensión del archivo
    
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        if ( !extensionesValidas.includes ( extension )) {
            return reject ( `La extensión ${ extension } no es permitida. Las permitidas son ${ extensionesValidas }` )
        }
    
        // Renombrar la imagen a la hora de colocarla en el directorio que se quiera
        const nombreArchivoTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreArchivoTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject ( err );
          }
      
          resolve ( nombreArchivoTemp );
        });
    })

}

module.exports = { 
    subirArchivo 
}