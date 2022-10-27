const parseGetParams = (req, res) => {
  const { params, query } = req
  res.json({ code: 0, message: 'welcome', data: { ...params, ...query } })
}

const parsePostParams = (req, res) => {
  const { body } = req
  res.json({ code: 0, message: 'welcome', data: { ...body } })
}

const parsePutFormData = (req, res) => {
  const { fields, files } = req
  console.log(fields)
  console.log(files)
  res.json({ code: 0, message: 'welcome', data: { ...fields } })
}



module.exports = {
  parseGetParams,
  parsePostParams,
  parsePutFormData,
}


