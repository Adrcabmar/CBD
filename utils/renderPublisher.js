module.exports = function renderPublisher(title, publishers) {
    const salesTitleMap = {
      'NA_Sales': 'Norteamérica',
      'EU_Sales': 'Europa',
      'JP_Sales': 'Japón',
      'Other_Sales': 'Otros',
      'Global_Sales': 'Global'
    };
  
    let html = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <tr>
              <th>Rank</th>
              <th>Publisher</th>
              <th>Ventas (${salesTitleMap['NA_Sales']})</th>
              <th>Ventas (${salesTitleMap['EU_Sales']})</th>
              <th>Ventas (${salesTitleMap['JP_Sales']})</th>
              <th>Ventas (${salesTitleMap['Other_Sales']})</th>
              <th>Ventas (${salesTitleMap['Global_Sales']})</th>
            </tr>`;
  
    publishers.forEach((publisher, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${publisher._id}</td>
          <td>${publisher.NA_Sales}</td>
          <td>${publisher.EU_Sales}</td>
          <td>${publisher.JP_Sales}</td>
          <td>${publisher.Other_Sales}</td>
          <td>${publisher.Global_Sales}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  