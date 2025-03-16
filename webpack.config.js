const path = require("path");

module.exports = {
  entry: "./src/index.js", // Cambia esto a la ruta de tu archivo de entrada
  output: {
    filename: "bundle.js", // Nombre del archivo de salida
    path: path.resolve(__dirname, "dist"), // Directorio de salida
  },
  mode: "development", // Modo de desarrollo
  devServer: {
    static: path.join(__dirname, "dist"), // Directorio donde se sirven los archivos estáticos
    compress: true, // Habilitar compresión
    port: 9000, // Puerto en el que se ejecuta el servidor
    hot: true, // Habilitar Hot Module Replacement
  },
};
