import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsLib from "cors";
import { OrderByDirection } from "firebase-admin/firestore";

const cors = corsLib({ origin: true });
admin.initializeApp();

exports.getUserTasks = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const {
        id: userId,
        page = "1",
        sortBy = "createdDate",
        order: orderQuery = "asc",
        filter,
      } = req.query;

      const pageNumber = parseInt(page as string);
      const order = orderQuery as OrderByDirection;

      const tasksRef = admin
        .firestore()
        .collection("users")
        .doc(userId as string)
        .collection("tasks");

      let filteredQuery = tasksRef
        .where("status", "==", filter as string)
        .orderBy(sortBy as string, order);

      let unfilteredQuery = tasksRef.orderBy(sortBy as string, order);
      let query =
        (filter as string) !== "all" ? filteredQuery : unfilteredQuery;

      const pageSize = 10;

      const totalCountSnapshot = await query.get();
      const totalTasks = totalCountSnapshot.size;

      const tasksSnapshot = await query
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .get();

      if (tasksSnapshot.empty) {
        return res.status(404).json({ tasks: [], message: "No tasks found." });
      }

      const tasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({ tasks, totalTasks });
    } catch (error) {
      return res.status(500).send("Error fetching tasks: " + error);
    }
  });
});

exports.getUsers = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const {
      page = "1",
      sortBy = "createdDate",
      order: orderQuery = "asc",
    } = req.query;

    const pageNumber = parseInt(page as string);
    const order = orderQuery as OrderByDirection;

    try {
      const usersRef = admin.firestore().collection("users");

      let query = usersRef.orderBy(sortBy as string, order);
      const pageSize = 10;

      const totalCountSnapshot = await usersRef.get();
      const totalUsers = totalCountSnapshot.size;

      const usersSnapshot = await query
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize)
        .get();

      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({ users, totalUsers });
    } catch (error) {
      res.status(500).send("Error fetching users: " + error);
    }
  });
});
