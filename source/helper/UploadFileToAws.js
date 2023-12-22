import {RNS3} from 'react-native-aws3';

const UploadFileToAws = async image => {
  return new Promise((resolve, reject) => {
    console.log('image', image);
    const file = {
      uri: image?.uri,
      name: image?.name || image?.fileName,
      type: image?.type,
    };
    console.log('file =>', file);
    const options = {
      keyPrefix: '/',
      bucket: 'catzapp-dev',
      region: 'eu-central-1',
      accessKey: 'AKIA2GWTBVL6QELIIT4X',
      secretKey: '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',
      successActionStatus: 201,
    };
    console.log('options =>', options);
    RNS3.put(file, options)
      .then(response => {
        console.log('response =>', JSON.stringify(response));
        if (response.status === 201) {
          resolve(response);
        } else {
          throw new Error(response);
        }
      })
      .catch(error => {
        console.log('error =>', error);
        reject(error);
      });
  });
};

export default UploadFileToAws;
