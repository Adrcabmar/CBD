module.exports = function renderTopGameByGenre(title, data) {
    let html = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <tr>
            <th>Género</th>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Publisher</th>
            <th>Ventas Globales</th>
          </tr>`;
  
    data.forEach(row => {
      html += `
        <tr>
          <td>${row.Genre}</td>
          <td>${row.Name}</td>
          <td>${row.Platform}</td>
          <td>${row.Year}</td>
          <td>${row.Publisher}</td>
          <td>${row.Global_Sales}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  