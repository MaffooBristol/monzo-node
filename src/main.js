import https from 'https';
import fs from 'fs';
import path from 'path';

const makeRequest = (tokenErr, token) => {
  if (tokenErr) return console.error('No token');
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.trim()}`,
    },
    hostname: 'api.monzo.com',
    path: '/accounts',
    method: 'GET',
    port: '443',
  };
  const request = https.request(opts, (res) => {
    const data = [];
    res.setEncoding('utf8');
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => console.log(JSON.parse(data.join(''))));
  });

  request.on('error', requestErr => console.log(requestErr));
  request.end();
  return this;
};

fs.readFile(path.resolve(__dirname, '../', '.monzotoken'), 'utf8', makeRequest);
