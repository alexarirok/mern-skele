export default () => {
    return `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
                <title>Mern Skelee</title>
                <link href="https://fonts.google.com/specimen/Roboto?selection.family=Roboto:wght@100;400" rel="stylesheet">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </head>
            <body style="margin:0">
                <div id="root"> ${markup} </div>
                <style id="jss-server-side">${css}</style>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>`
}