import express from 'express'
const router = express.Router();
const fs = require("fs");

const { createInvoice } = require("../invoice");

router.post('/invoice/print', async (req, res, next) => {
  try {
    await createInvoice(req.body);

    const path = __dirname + '\\output.pdf'
    console.log(path);

    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.error(err)
        res.status(500)
        console.log('File not found')
        res.send('File not found')
        return
      }

      res.contentType("application/pdf");
      fs.createReadStream(path).pipe(res);
      console.log('File send');
    })

  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;