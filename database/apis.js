const fs = require('fs');

try {
    const ruta = fs.readFileSync('../database/provincias.json', 'utf-8');
    const filejson = JSON.parse(ruta);
    // extraigo todos los datos de provincias
    let provincias = '';
    for (const p in filejson) {
        provincias += `${filejson[p].provincia} \n`
            //console.log(provincias);
    }
    // construyo un archivo de nombres de provincias
    const path = '../database/provincias.txt';
    fs.writeFileSync(path, provincias);
    // extraigo todos los datos de ciudades
    let ciudades = '';
    for (const p in filejson) {
        if (filejson[p].provincia) {
            console.log('\n', filejson[p].provincia);
            //console.log(filejson[p].cantones);
            const lista_ciudades = filejson[p].cantones
            const a = [{ lista_ciudades }]
                //console.log(a);
            for (const k in lista_ciudades) {
                console.log(`${p}` + "," + `${lista_ciudades[k].canton}`)
                ciudades += `${p}` + "," + `${lista_ciudades[k].canton} \n`;

            }
        }
    }
    // creo un archivo de con el id y ciudades
    const paths = '../database/ciudades.txt';
    fs.writeFileSync(paths, ciudades);
} catch (error) {

}


/* for (const p in filejson) {
    if (filejson[p].provincia === 'IMBABURA') {
        //console.log(filejson[p].cantones['1005']);
        for (const c in filejson[p].cantones) {
            //console.log(filejson[p].cantones[c]);
            if (filejson[p].cantones[c].canton === 'IBARRA') {
                console.log(filejson[p].cantones[c]);
            }
        }
    }
} */