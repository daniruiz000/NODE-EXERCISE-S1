const fs = require("fs");
const promt = require("prompt-sync")();

const convertJsonToCsv = (jsondata) => {
  let csv = "";
  //   encabezados
  const firstItemJson = jsondata[0];
  const headers = Object.keys(firstItemJson);
  csv = csv + headers.join(";") + ";" + "\n";

  // datos
  // recorremos cada fila y dentro de cada fila recorremos cada propiedad
  jsondata.forEach((item) => {
    headers.forEach((header) => {
      csv = csv + item[header] + ";";
    });
    csv = csv + "\n";
  });
  return csv;
};

const filPath = promt("Introduce la ruta de un fichero json; ");

fs.readFile(filPath, (readError, data) => {
  if (readError) {
    console.log("ha ocurrido un error leyendo el fichero");
  } else {
    try {
      const parseData = JSON.parse(data);
      console.log(parseData);
      const csv = convertJsonToCsv(parseData);
      console.log(csv);
      const filePathOutput = promt("Introduce la ruta del fichero a generar: ");

      fs.writeFile(filePathOutput, csv, (error) => {
        if (error) {
          console.log("Ha ocurrido un error escribiendo el fichero");
          console.log(error);
        } else {
          console.log("fichero guardado correctamente");
        }
      });
    } catch (parseError) {
      console.log("ha ocurrido un error Parseando el fichero");
    }
  }
});
