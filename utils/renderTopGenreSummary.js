module.exports = function renderTopGenreSummary(title, data, columns) {
    const [col1, col2, col3] = columns;
  
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
            <th>${col1}</th>
            <th>${col2}</th>
            <th>${col3}</th>
          </tr>`;
  
    data.forEach(row => {
      html += `
        <tr>
          <td>${row[col1]}</td>
          <td>${row[col2]}</td>
          <td>${row[col3]}</td>
        </tr>`;
    });
  
    html += `</table></body></html>`;
    return html;
  };
  