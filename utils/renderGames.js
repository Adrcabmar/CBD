module.exports = function renderGames(title, juegos, salesField = 'Global_Sales') {
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
              <th>Name</th>
              <th>Platform</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Publisher</th>
              <th>Ventas (${salesTitleMap[salesField] || salesField})</th>
            </tr>`;
  
    juegos.forEach(j => {
      html += `
        <tr>
          <td>${j.Rank}</td>
          <td>${j.Name}</td>
          <td>${j.Platform}</td>
          <td>${j.Year}</td>
          <td>${j.Genre}</td>
          <td>${j.Publisher}</td>
          <td>${j[salesField]}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  