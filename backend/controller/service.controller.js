const Service = require("../models/Services.model.js");


exports.createService = async (req, res) => {
  try {
    const { name, description, image, duration } = req.body;

    if (!name || !duration)
      return res.status(400).send("Name and duration required");

    if (duration <= 0)
      return res.status(400).send("Invalid duration");

    const service = await Service.create({
      name,
      description,
      image,
      duration
    });

    res.status(201).json(service);

  } catch (err) {
    res.status(500).send(err.message,'1');
  }
};


exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).send(err.message,'2');
  }
};


exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Service.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updated)
      return res.status(404).send("Service not found");

    res.json(updated);

  } catch (err) {
    res.status(500).send(err.message,'3');
  }
};


exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).send("Service not found");

    res.send("Service deleted");

  } catch (err) {
    res.status(500).send(err.message,'4');
  }
};
