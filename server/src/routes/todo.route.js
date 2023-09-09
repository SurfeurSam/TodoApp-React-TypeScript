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
  // console.log("🚀🚀🚀🚀🚀 ~ req:", req)
  try {
    const todo = await Todo.create({
      todo: req.body.todo,
      isDone: req.body.isDone,
    });
    // console.log("🚀🚀🚀🚀🚀 ~ req.body:", req.body)
    // console.log("🚀🚀🚀🚀🚀 ~ req.params:", req.params)
    // console.log("🚀🚀🚀🚀🚀 ~ Todo:", todo)
    res.json(todo);
  } catch (error) {
    res.json({ err: error });
  }
});

router.put("/", async (req, res) => {
  try {
    console.log("🚀🚀🚀🚀🚀 ~ ЕСТЬ НАЖАТИЕ!");
    const { id } = req.body;
    
    const oneTodo = await Todo.findOne({
      where: {
        id: id
      },
    });
    oneTodo.dataValues.id = 1;
    console.log("🚀🚀🚀🚀🚀 ~ oneTodo:", oneTodo)
    console.log("🚀🚀🚀🚀🚀 ~ oneTodo:", oneTodo.dataValues.id)
    console.log("🚀🚀🚀🚀🚀 ~ req.body:", req.body)
    oneTodo.save();
    res.sendStatus(200);
  } catch (error) {
    res.json({ err: error });
  }
});

// router.put('/edit.shablon/:id', async (req, res) => {
//   try {

//     const shablonEdit = await Shablon.findOne({ where: { id: req.params.id } });
//     const { name, value } = req.body;
//     console.log("🚀🚀🚀🚀🚀 ~ req.body:", req.body)
//     shablonEdit[name] = value;
//     console.log("🚀🚀🚀🚀🚀 ~ shablonEdit:", shablonEdit)
//     shablonEdit.save();
//     res.sendStatus(200)
//   } catch (error) {
//     console.error(error);
//   }
// });

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
