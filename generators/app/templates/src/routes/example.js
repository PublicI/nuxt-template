import express from 'express';
import models from '../models';

const router = express.Router();

router.get('/example.json', (req, res, next) => {
    models.example((err, example) => {
        res.json({
            example: example
        });
    });
});

export default router;
