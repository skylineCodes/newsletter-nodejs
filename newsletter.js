import express from 'express';
import needle from 'needle';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import validator from './middleware/validators.js';

router.post('/subscribe', asyncHandler(async (req, res) => {
    try {
      // Validation
      const validationRule = {
        name: 'required',
        email: 'required|email',
      };

      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err,
          });
        }
      });

      const { name, email } = req.body;

      const subscribeReq = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            needle.post(
              `http://127.0.0.1:8000/api/subscribe`,
              {
                  name,
                  email,
                  is_subscribed: true
              },
              { json: true },
              async (err, res, body) => {
                if (err) {
                  throw new Error(err.message);
                }

                if (body.status === 201) {
                    console.log(body.data)
                }
              }
            )
          );

          reject(new Error());
        }, 1000);
      });

      res.status(201).send({ message: 'Subscribed successfully!' });
    } catch (e) {
        res.status(400);
        throw new Error(e.message);
    }
}));

router.patch(
  '/unsubscribe',
  asyncHandler(async (req, res) => {
    try {
      // Validation
      const validationRule = {
        email: 'required|email',
      };

      validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err,
          });
        }
      });

      const { email } = req.body;

      const subscribeReq = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            needle.patch(
              `http://127.0.0.1:8000/api/unsubscribe`,
              {
                email
              },
              { json: true },
              async (err, res, body) => {
                if (err) {
                  throw new Error(err.message);
                }

                if (body.status === 200) {
                  console.log(body.message);
                }
              }
            )
          );

          reject(new Error());
        }, 1000);
      });

      res.status(200).send({ message: 'Unsubscribed successfully!' });
    } catch (e) {
      res.status(400);
      throw new Error(e.message);
    }
  })
);

export default router;