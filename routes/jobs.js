import { Router } from "express";
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.js";
import { validateJobInput, validateIdParam } from "../middleware/validation.js";
import { checkForTestUser } from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post([checkForTestUser, validateJobInput], createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch([checkForTestUser, validateIdParam, validateJobInput], updateJob)
  .delete([checkForTestUser, validateIdParam], deleteJob);

export default router;
