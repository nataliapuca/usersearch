import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsLib from "cors";

import { OrderByDirection } from "firebase-admin/firestore";

const cors = corsLib({ origin: true }); // Allow all origins
admin.initializeApp();

exports.getUserTasks = functions.https.onRequest(async (req, res) => {
  const userId = req.params.id; // Extract the user ID from the URL
  const pageQuery = req.query.page;
  const page = typeof pageQuery === "string" ? parseInt(pageQuery) : 1;
  const sortQuery = req.query.sortBy;
  const sortBy = typeof sortQuery === "string" ? sortQuery : "createdDate";
  const orderQuery = req.query.order;

  const order =
    typeof orderQuery === "string" ? (orderQuery as OrderByDirection) : "asc";
  const filter = req.query.filter || null; // Filter for task status

  const tasksRef = admin
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("tasks");

  try {
    let query = tasksRef.orderBy(sortBy, order); // Apply sorting

    // Apply filter if specified
    if (filter) {
      query = query.where("status", "==", filter);
    }

    // Pagination logic
    const pageSize = 10;
    const tasksSnapshot = await query
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .get();

    type TaskType = {
      id: string; // Unique identifier for the task
      title?: string; // Title of the task
      status?: boolean; // Indicates if the task is completed
    };
    const tasks: TaskType[] = [];
    tasksSnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    res.status(500).send("Error fetching tasks: " + error);
  }
});

exports.getUsers = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Wrap the function in cors
    const pageQuery = req.query.page;
    const page = typeof pageQuery === "string" ? parseInt(pageQuery) : 1;

    const sortQuery = req.query.sortBy;
    const sortBy = typeof sortQuery === "string" ? sortQuery : "name";

    const orderQuery = req.query.order;
    const order = orderQuery === "desc" ? "desc" : "asc";

    try {
      const usersRef = admin.firestore().collection("users");

      // Set up the query with sorting
      let query = usersRef.orderBy(sortBy, order);

      // Pagination
      const pageSize = 10;
      const usersSnapshot = await query
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .get();

      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users: " + error);
    }
  });
});
