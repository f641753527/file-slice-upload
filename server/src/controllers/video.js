const fs = require('fs')
const path  = require('path')

const tempFileDir = path.resolve(__dirname, '../../public/temp')
const fileDir = path.resolve(__dirname, '../../public/files')

const checkTempFile = (req, res) => {
  const { fileName } = req.query

  if (!fs.existsSync(tempFileDir)) {
    fs.mkdirSync(tempFileDir)
  }

  const tempFilePath =  path.resolve(tempFileDir, `./${fileName}`)

  if (!fs.existsSync(tempFilePath)) return res.json({ code: 0, message: '', data: { count: 0 } })

  fs.readdir(tempFilePath, (err, files) => {
    if (err) {
      return res.json({ code: 500, message: err, data: null })
    }
    res.json({ code: 0, message: '', data: { fileName, count: files.length } })
  })
}

const uploadSliceFile = (req, res) => {
  const { fields, files } = req
  const { file } = files
  const { slice_index, name } = fields
  // buffer

  const data = fs.readFileSync(file.path)

  const tempFilePath =  path.resolve(tempFileDir, `./${name}`)

  if(!fs.existsSync(tempFilePath)) {
    fs.mkdirSync(tempFilePath)
  }

  fs.writeFileSync(path.resolve(tempFilePath, `./${slice_index}`), data)

  res.json({ code: 0, message: 'welcome', data: { file } })
}

const mergeTempFile = (req, res) => {
  const { fileName } = req.query
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir)
  }
  const tempFilePath =  path.resolve(tempFileDir, `./${fileName}`)
  if (!fs.existsSync(tempFilePath)) return res.json({ code: 400, message: '没有文件待合并', data: null })

  fs.readdir(tempFilePath, (err, files) => {
    if (err) {
      return res.json({ code: 500, message: err, data: null })
    }
    files.sort((a, b) => a - b)

    files.forEach(temp => 
      fs.appendFileSync(path.resolve(fileDir, `./${fileName}`), fs.readFileSync(path.resolve(tempFilePath, `./${temp}`)))
    )
    res.json({ code: 0, message: '', data: null })
  })
}

const removeTempFile = (req, res) => {
  const { fileName } = req.query

  const tempFilePath =  path.resolve(tempFileDir, `./${fileName}`)

  if (!fs.existsSync(tempFilePath)) return res.json({ code: 0, message: '', data: { count: 0 } })

  fs.readdir(tempFilePath, (err, files) => {
    if (err) {
      return res.json({ code: 500, message: err, data: null })
    }
    files.forEach(temp => 
      fs.unlinkSync(path.resolve(tempFilePath, `./${temp}`))
    )
    fs.rmdirSync(tempFilePath)
    res.json({ code: 0, message: '', data: null })
  })
}


module.exports = {
  checkTempFile,
  uploadSliceFile,
  mergeTempFile,
  removeTempFile,
}


