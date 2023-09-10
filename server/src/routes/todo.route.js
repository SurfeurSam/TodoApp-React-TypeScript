const router = require("express").Router();
const { Todo } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const allTodos = await Todo.findAll();
    res.json(allTodos);
  } catch (error) {
    res.json({ err: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      todo: req.body.todo,
      isDone: req.body.isDone,
    });
    res.json(todo);
  } catch (error) {
    res.json({ err: error });
  }
});

router.put("/", async (req, res) => {
  const { id, isDone } = req.body;
  console.log("🚀🚀🚀🚀🚀 ~ req.body:", req.body);
  let status;
  if (isDone) {
    status = false;
  } else {
    status = true;
  }
  await Todo.update({ isDone: status }, { where: { id: id } });
  res.sendStatus(200);
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await Todo.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = router;
