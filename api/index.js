import app from '../server/server.js';
import serverless from 'serverless-http';

const handler = serverless(app);

export const config = {
  api: {
    bodyParser: false, // optional: helps with file uploads or raw body
  },
};

export default handler;
