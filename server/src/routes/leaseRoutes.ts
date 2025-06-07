import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getLeasePayments, getLeases, getLeasesByPropertyId } from "../controllers/leaseControllers";

const router = express.Router();

router.get("/", authMiddleware(["manager", "tenant"]), getLeases);
router.get(
  "/:id/payments",
  authMiddleware(["manager", "tenant"]),
  getLeasePayments
);
router.get(
  "/properties/:id",
  authMiddleware(["manager"]),
  getLeasesByPropertyId
);

export default router;
