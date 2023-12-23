import express from 'express';

import { arrG } from './services/validaAcesso';
import { AppRouter } from './routes/AppRouter';

const app = express();
app.use(express.json());

// arrG;

app.use(new AppRouter().start());

// app.use('/app/static', function (req, res, next) {
//     if (req.method !== 'get') {
//       next();
//       return;
//     }
//     res.sendFile(__dirname + '/assets' + req.path);
//   });


app.listen(3000, () => console.log("Server is running 3000"));  