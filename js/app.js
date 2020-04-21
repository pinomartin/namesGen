const formulario = document.getElementById('generar-nombre');
formulario.addEventListener('submit',cargarNombres);

//Llamado a AJAX e imprimir resultados
function cargarNombres(e){
    e.preventDefault();
     //Variables del form

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    const cantidad = document.getElementById('numero').value;
    
    let url = '';
    url += 'https://randomuser.me/api/?';
    
    //Validaciones
    if(origenSeleccionado !== ''){
        url += `nat=${origenSeleccionado}&`;
    }
    
    if(generoSeleccionado !== ''){
        url += `gender=${generoSeleccionado}&`;
    }
    
    if(cantidad !== ''){
        url += `results=${cantidad}&`;
    }


    //Conexion con AJAX
    const xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);

    xhr.onload = function(){
        if(this.status === 200){
            const respuesta = JSON.parse(this.responseText);
            //Accedo a al array de objetos del Json (personas)
            const nombres = respuesta.results;
            console.log(nombres);
            let html = '<h4>Nombres Generados</h4>';
            html += '<ul class="lista">';
            
            nombres.forEach(function(nombre){
                html += `
                        <li>${nombre.name.first}</li>
                
                `;
            })

            html += '</ul>'
            console.log(html);

            document.getElementById('resultado').innerHTML = html;
        }
    }

    xhr.send();
}