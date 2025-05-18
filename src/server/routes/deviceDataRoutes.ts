
import express from 'express';
import {
  createDeviceData,
  getLatestDeviceData,
  getAllLatestDeviceData,
  getDeviceDataHistory
} from '../controllers/deviceDataController';

const router = express.Router();

router.post('/', createDeviceData);
router.get('/latest', getAllLatestDeviceData);
router.get('/latest/:deviceId', getLatestDeviceData);
router.get('/history/:deviceId', getDeviceDataHistory);

export default router;
