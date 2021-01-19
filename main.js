/* VARIABLES */
const animeapi = "https://kitsu.io/api/edge"; // URL DEL API
const formanime = document.querySelector('.form-anime'); // FORMULARIO DE BUSQUEDAD
const request = new XMLHttpRequest(); // USO DE LA RESPUESTA DE NAVEGADOR

/* ESCUCHANDO AL FORMULARIO DE BUSQUEDAD */
formanime.addEventListener('submit', (e) => {

	e.preventDefault(); // EVITA QUE LA PAGINA SE RECARGUE CUANDO HAY UNA BUSQUEDAD

	const urlbus = `/anime?filter[text]=${formanime[0].value}`; // METODO DADO POR LA API PARA BUSCAR "TEXT" EN SU BASE

	request.open('GET', animeapi + urlbus); // SUMANDO EL LINK DE BUSQUEDAD, MAS LO BUSCADO PARA GENERAR UN RESULTADO
	request.responseType = "text"; // DICIENDOLE AL NAVEGADOR QUE SU RESPUESTA SEA POR TEXTO

	/* PANTALLA DE CARGA */
	document.querySelector('.informacion-anime').innerHTML = 
	`
		<div class="center-loader">
			<img src="loading-cargando.gif" class="cargando">
		</div>
	`
	;

	/* SE RECIBE LA INFORMACION Y SE CAMBIA A FORMATO JSON PARA PODER MANIPULARLO */
	request.send();

	// UNA VEZ CARGA LA INFORMACIO SE LE PIDE A LA PANTALLA DE CARGA QUE DEJE DE FUNCIONAR
	request.onload = function(){
		document.querySelector('.informacion-anime').innerHTML = "";
		const infoanime = JSON.parse(request.response);
		console.log(infoanime)
		if(infoanime.data.length != 0){
			for (var i = 0; i < infoanime.data.length; i++) {
				// INSERTANDO DATOS
				let object = document.createElement('div');
				object.className = "card";
				object.title = `${infoanime.data[i].type}`;
				object.innerHTML = 
				`
				<div class="id">ID:${infoanime.data[i].id}</div>
				<div class="titulo">${infoanime.data[i].attributes.canonicalTitle}</div>
				<div class="imagen">
					<img src="${infoanime.data[i].attributes.posterImage.original}" class="imagen-anime">
					<img src="${infoanime.data[i].attributes.coverImage.large}" class="db-imagen-click">
				</div>
				<div class="descripcion db-click">
					Sipnopsis:<p>${infoanime.data[i].attributes.description}</p> <p class="vermas">${infoanime.data[i].attributes.description}</p>
				</div>
				<a class="btn btn-ver">Ver</a>
				<a target="blank_" href="https://www.youtube.com/watch?v=${infoanime.data[i].attributes.youtubeVideoId}" class="btn btn-youtube">
				Ver Trailer
				</a>
				`
				;
				document.querySelector('.informacion-anime').append(object);

			}
			// VER DATOS
			const ver = document.querySelectorAll('.btn-ver')
			if(ver != null){
				for (let i = 0; i < ver.length; i++) {
					ver[i].addEventListener('click', (e) => {
						console.log(e.target);
						document.querySelectorAll('.db-click')[i].classList.toggle('active');
						document.querySelectorAll('.card')[i].classList.toggle('active');
						const imagenes = document.querySelectorAll('.imagen')[i];
						imagenes.children[0].classList.toggle('active');
						imagenes.children[1].classList.toggle('active');
					});
				}
			}
		}else {
			// EN CASO QUE LA BUSQUEDAD NO EXISTA SALDRA ESTE ERROR
			document.querySelector('.informacion-anime').innerHTML = 
			`
				<b style="color:red;">Su busqueda no existe o no se encuentra en la base de datos, si la informacion
				que busca, ya las visto en nuestra app, por favor pedir ayuda en anime-info@gmail.com</b>
			`
			;
		}
	}
});