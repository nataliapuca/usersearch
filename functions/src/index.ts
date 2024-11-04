import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsLib from "cors";
import { OrderByDirection } from "firebase-admin/firestore";

const cors = corsLib({ origin: true });
admin.initializeApp();

exports.getUserTasks = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const userId = req.query.id; // Extract the user ID from the URL
      if (!userId) {
        return res.status(400).send("User ID is required");
      }

      const pageQuery = req.query.page;
      const page = typeof pageQuery === "string" ? parseInt(pageQuery) : 1;
      const sortQuery = req.query.sortBy;
      const sortBy = typeof sortQuery === "string" ? sortQuery : "createdDate";
      const orderQuery = req.query.order;
      const order =
        typeof orderQuery === "string"
          ? (orderQuery as OrderByDirection)
          : "asc";
      const filter = req.query.filter;

      const tasksRef = admin
        .firestore()
        .collection("users")
        .doc(userId as string)
        .collection("tasks");

      let filteredQuery = tasksRef
        .where("status", "==", filter as string)
        .orderBy(sortBy, order); // Apply sorting

      let unfilteredQuery = tasksRef.orderBy(sortBy, order); // Apply sorting
      let query =
        (filter as string) !== "all" ? filteredQuery : unfilteredQuery;
      // Apply filter if specified

      // Pagination logic
      const pageSize = 10;

      const totalCountSnapshot = await query.get();
      const totalTasks = totalCountSnapshot.size;

      const tasksSnapshot = await query
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .get();

      // Check if tasksSnapshot is empty
      if (tasksSnapshot.empty) {
        return res.status(404).json({ tasks: [], message: "No tasks found." });
      }

      // Mapping the snapshot docs to an array of tasks
      const tasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({ tasks, totalTasks });
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      return res.status(500).send("Error fetching tasks: " + error);
    }
  });
});

exports.getUsers = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
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
      // Fetch the total count of users
      const totalCountSnapshot = await usersRef.get();
      const totalUsers = totalCountSnapshot.size;
      const usersSnapshot = await query
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .get();

      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json({ users, totalUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users: " + error);
    }
  });
});
