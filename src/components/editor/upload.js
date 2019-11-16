import axios from 'axios';

export default async function (file) {
  const { data } = await axios.get('/token');
  const formData = new FormData();
  formData.append('token', data.token);
  formData.append('file', file);
  const result = await axios({
    url: data.upload,
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.url + result.data.key;
}
