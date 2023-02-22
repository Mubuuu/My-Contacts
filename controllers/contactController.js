import asyncHandler from "express-async-handler";
import contactModel from "../model/contactModel.js";

export default {
  //@desc Get all contacts
  //@route GET /api/contacts
  //@access private
  getContacts: asyncHandler(async (req, res) => {
    const contact = await contactModel.find();
    res.status(200).json(contact);
  }),
  //@desc Get contact
  //@route GET /api/contacts/:id
  //@access private
  getContact: asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  }),
  //@desc Add a contacts
  //@route POST /api/contacts
  //@access private
  createContact: asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact = await contactModel.create({
      name,
      email,
      phone,
      user_id:req.user.id
    });
    res.status(201).json(contact);
  }),
  //@desc Update contact
  //@route PUT /api/contacts/:id
  //@access private
  updateContact: asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error("User not have permission to update other user contactsss")
    }
    const updatedContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  }),
  //@desc Delete contact
  //@route DELETE /api/contacts/:id
  //@access private
  deleteContact: asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error("User not have permission to update other user contactsss")
    }
      await contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
  }),
};
