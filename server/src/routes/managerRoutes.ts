import express from "express";
import {
  getManager,
  createManager,
  updateManager,
  getManagerProperties,
} from "../controllers/managerController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getLeasesByPropertyId } from "../controllers/leaseControllers";

const router = express.Router();

router.get("/:cognitoId", getManager);
router.put("/:cognitoId", updateManager);
router.get("/:cognitoId/properties", getManagerProperties);
router.post("/", createManager);

export default router;
