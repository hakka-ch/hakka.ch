const express = require('express')
const parser = require('ogp-parser')
const fetch = require('node-fetch')
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

const fs = require('fs')
const sanitizeFilename = require('sanitize-filename')

const app = express();

const debug = process.env.DEBUG == 'true';

const server = app.listen(4040, function () {
  console.log("DEBUG", debug)
  console.log("server start. port: " + server.address().port);
});

app.get('/getogp', function (req, res, next) {
  const url = req.query.url;
  console.log(url);
  parser(url, { skipOembed: true }).then(function(data) {

    const og_image_url = (data.ogp['og:image']?.[0] ?? data.seo['twitter:image']?.[0]) ?? null;

    if (og_image_url) {
      saveImage(og_image_url).then(function(filename) {
        data.status = 'ok';
        data.local_ogp_image_path = filename;
        res.json(data);
      });
    } else {
      data.status = 'ok';
      data.local_ogp_image_path = '';
      res.json(data);

    }

  }).catch(function(error) {
    console.error(error);
    res.json({status: error});
  });
});

/*
 * @parm
 */
saveImage = async (url) => {
  // ファイルの拡張子をみつけるための正規表現
  const exp = /(^.*\.[jpegpnifwb]{2,4})(\?.*)?$/g;

  const response = await fetch(url);
  const buffer = await response.buffer();

  if (response.ok) {
    console.log('url: ' + response.url)
    let filename = response.redirected ? response.url : response.url;
    filename = exp.exec(filename)?.[1].split('/').slice(-1)[0];
    if (filename && filename.length > 90) {
      // 長すぎるファイル名は90文字以内におさめる
      filename = filename.substr(0, 90);
    }
    filename = filename ? 'ogp_image/' + sanitizeFilename(filename) : null;

    if (debug != true) {
      const path = __dirname + '/../../assets/';
      fs.writeFileSync(path + filename, buffer, 'binary');
    } else{
    }
    return ('./' + filename);
  }

}
