import {
    GetdetailById,
    CreateUserDetail,
    UpdateuserDetailById,
    DeleteuserdetailbyId,
    Getdetail,
  } from "../helper.js";
  import express from "express";
  import { auth } from "../middleware/auth.js";
  
  const router = express.Router();
  
  router
    .route("/")
    .get(async (request, response) => {
      const data = await Getdetail();
      response.send(data);
    })
    .post( auth,async (request, response) => {
      const data = request.body;
      const detail = await CreateUserDetail(data);
      response.send(detail);
    }); // Adding detail using POST Method //
  
  // To getdetail by id using get method //
  router
    .route("/:id")
    .get(auth, async (request, response) => {
      const { id } = request.params;
      const result = await GetdetailById(id);
      response.send(result);
      console.log(result);
    })
    .put(auth,async (request, response) => {
      const { id } = request.params;
      const data = request.body;
      const result = await UpdateuserDetailById(id, data);
      const detail = await GetdetailById(id);
      response.send(detail);
    }) //Edit detail using PUT Method//
  
    .delete(auth,async (request, response) => {
      const { id } = request.params;
      const result = await DeleteuserdetailbyId(id);
      result.deletedCount > 0
        ? response.send(result)
        : response.status(404).send({ message: "No matching movie found" });
    }); // Deleteing detail using DELETE Method //
  
  export const DetailRouter = router;
  