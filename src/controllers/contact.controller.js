const ContactService = require("../services/contact.service");
const ApiError = require("../api-error");

exports.create = (req, res) => {
  return res.send({ message: "create handler" });
};

// Create and Save a new Contact
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contactService = new ContactService();
    const contact = await contactService.create(req.body);
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.findAll = (req, res) => {
  return res.send({ message: "findAll handler" });
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
  let contacts = [];

  try {
    const contactService = new ContactService();
    const { name } = req.query;
    if (name) {
      contacts = await contactService.findByName(name);
    } else {
      contacts = await contactService.all();
    }
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }

  return res.send(contacts);
};

exports.find0ne = (req, res) => {
  return res.send({ message: "find0ne handler" });
};

// Find a single contact with an id
exports.find0ne = async (req, res, next) => {
  try {
    const contactService = new ContactService();
    const contact = await contactService.findById(req.params.id);
    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
};

exports.update = (req, res) => {
  return res.send({ message: "update handler" });
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactService = new ContactService();
    const updated = await contactService.update(req.params.id, req.body);
    if (!updated) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.delete = (req, res) => {
  return res.send({ message: "delete handler" });
};

// Delete a contact with the id spectified is in the request
exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService();
    const deleted = await contactService.delete(req.params.id, req.body);
    if (!deleted) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = (req, res) => {
  return res.send({ message: "deleteAll handler" });
};

// Delete all contact of a user from the database
exports.deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService();
    const deleted = await contactService.deleteAll();
    return res.send({
      message: `${deleted} Contact were deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occured while removing all contacts`)
    );
  }
};

exports.findAllFavorite = (req, res) => {
  return res.send({ message: "findAllFavorite handler" });
};

// Find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService();
    const contacts = await contactService.allFavorite();
    return res.send(contacts);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
  }
};
