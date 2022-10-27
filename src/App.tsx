import React, { FC, useMemo, useEffect, useState, useRef  } from 'react';
import { Button, Upload, Progress } from 'antd';
import { httpCheckFileRequest, httpUploadFileRequest, httpMergeFileRequest, httpRemoveFileRequest } from './api'

interface ISlice{
  /** 当前切片 */
  slice_index: number
  /** 总切片数量 */
  slice_count: number
  /** 当前切片buffer */
  stream: Blob
  /** 文件名 */
  name: string
}

/** 切片大小 1M */
const M_SIZE = 1024 * 1024;


const  App: FC = () => {

  const [upload_index, set_upload_index] = useState<number>(-1)
  const [slices, set_slices] = useState<ISlice[]>([])
  const [is_upload, set_is_upload] = useState<boolean>(false)
  const [file, set_file] = useState<File | null>(null)

  const controller = useRef<AbortController>()

  const percent = useMemo(() => (upload_index + 1) / slices.length * 100, [slices, upload_index] )

  const handleFileMove = async () => {
    await httpMergeFileRequest(file!.name)
    httpRemoveFileRequest(file!.name)

    set_is_upload(false)
    set_slices([])
    set_upload_index(-1)
    set_file(null)
  }

  /**
   * @description: 切片上传
  */
  const handleUpload = async () => {
    if (upload_index >= slices.length) {
      return handleFileMove()
    }
    const formData = new FormData()
    formData.append('file', slices[upload_index].stream)
    formData.append('slice_index', upload_index as unknown as string)
    formData.append('slice_count', slices.length as unknown as string)
    formData.append('name', slices[upload_index].name)
    controller.current = new AbortController()
    await httpUploadFileRequest(formData, controller.current)
    if (upload_index < slices.length - 1) {
      set_upload_index(index => index + 1)
    } else if (upload_index === slices.length - 1) {
      await handleFileMove()
    }
  }

  useEffect(() => {
    if (upload_index > -1) handleUpload()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ upload_index])

  const handlePause = () => {
    set_is_upload(false)
    controller.current?.abort()
  }

  const handleStart = () => {
    set_is_upload(true)
    handleUpload()
  }

  const handleBeforeUpload = async (file: File) => {
    const { size, name  } = file
    const slice_count = Math.ceil(size / M_SIZE)

    const list: ISlice[] = []
    for (let i = 0; i < slice_count; i++) {
      list.push({
        slice_index: i,
        slice_count,
        stream: file.slice(M_SIZE * i, M_SIZE * (i + 1)),
        name,
      })
    }
    set_is_upload(true)
    set_slices(list)
    set_file(file)

    const res = await httpCheckFileRequest(name)

    set_upload_index(res.count)

    return false
  }

  return (
    <div className="App">
      <Upload
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        disabled={is_upload}
      >
        <Button
          type='primary'
          disabled={is_upload}
        >upload</Button>
      </Upload>
      
      {
        slices.length ? (
          is_upload ?
            <Button danger onClick={handlePause}>暂停</Button> :
            <Button onClick={handleStart}>开始</Button>
        ) : null
      }
      { slices.length ? <p>当前上传文件: {slices[0].name}</p> : null }
      { slices.length ? <Progress percent={percent} /> : null }

    </div>
  );
}

export default App;
