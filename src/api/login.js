export function httpGet(url,params){
  return new Promise((resolve,reject){
    axios.get(url,{
      params:params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.warn(err);
      reject(err);
    })
  })
}

export function httpGet(url,params){
  return new Promise((resolve,reject){
    axios.post(url,{
      params:params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      console.warn(err);
      reject(err);
    })
  })
}