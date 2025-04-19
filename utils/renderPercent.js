module.exports = function renderGames(title, juegos) {
    let html = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Year</th>
              <th>NA_Sales</th>
              <th>EU_Sales</th>
              <th>JP_Sales</th>
              <th>Global Sales</th>
            </tr>`;
  
    juegos.forEach(j => {
      html += `<tr>
        <td>${j.Rank}</td>
        <td>${j.Name}</td>
        <td>${j.Year}</td>
        <td>${j.NA_Sales}</td>
        <td>${j.EU_Sales}</td>
        <td>${j.JP_Sales}</td>
        <td>${j.Global_Sales}</td>
      </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  