const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../db/associations');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: {
        model: Campus,
      },
    });
    res.send(students);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId, {
      include: {
        model: Campus,
      },
    });
    res.send(student);
  } catch (ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await Student.create(req.body);
    res.sendStatus(200);
  } catch (ex) {
    next(ex);
  }
});

router.post('/addStudent', async (req, res, next) => {
  try {
    res.send(await Student.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:studentId', async (req, res, next) => {
  try {
    let student = await Student.findByPk(req.params.studentId);
    res.send(await student.destroy());
  } catch (ex) {
    next(ex);
  }
});

router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const updatedStudent = await student.update(req.body);
    res.send(updatedStudent);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:studentId/newCampus', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const updatedStudent = await student.update({ CampusId: req.body.id });
    res.send(updatedStudent);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
