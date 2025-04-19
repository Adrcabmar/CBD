module.exports = function renderSalesPercentage(title, data) {
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
            <th>Año</th>
            <th>NA (%)</th>
            <th>EU (%)</th>
            <th>JP (%)</th>
            <th>Otros (%)</th>
          </tr>`;
  
    data.forEach(entry => {
      html += `
        <tr>
          <td>${entry.Year}</td>
          <td>${entry.NA}</td>
          <td>${entry.EU}</td>
          <td>${entry.JP}</td>
          <td>${entry.Other}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  