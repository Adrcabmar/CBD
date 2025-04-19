module.exports = function renderSalesByPublisher(title, data) {
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
            <th>Publisher</th>
            <th>NA</th>
            <th>EU</th>
            <th>JP</th>
            <th>Otros</th>
            <th>Global</th>
          </tr>`;
  
    data.forEach(row => {
      html += `
        <tr>
          <td>${row.Publisher}</td>
          <td>${row.NA_Sales}</td>
          <td>${row.EU_Sales}</td>
          <td>${row.JP_Sales}</td>
          <td>${row.Other_Sales}</td>
          <td>${row.Global_Sales}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };