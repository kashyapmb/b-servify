import Enquiry from "../model/enquiryModel.js";
import DoneEnquiry from "../model/doneEnquiryModel.js";
import DeclineEnquiry from "../model/declineEnquiryModel.js";
import CancelEnquiry from "../model/cancelEnquiryModel.js";
import moment from "moment-timezone";

export const enquiryDone = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    // Find the booking entry to be moved to CompletedBooking collection
    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      {
        estatus: "enquiry done",
      },
      { new: true }
    );

    // const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      res.status(404).json({ error: "enquiry not found" });
      return;
    }

    // Create a new CompletedBooking entry
    const doneEnquiry = await DoneEnquiry.create({
      enquiryId: enquiry._id,
      userId: enquiry.userId,
      providerId: enquiry.providerId,
      estatus: "enquiry done",
    });

    // Delete the corresponding entry from the Booking collection
    // await Enquiry.findByIdAndDelete(enquiryId);

    res.json({
      doneEnquiryId: doneEnquiry._id,
      estatus: doneEnquiry.estatus,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const declineEnquiry = async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const { reason } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      {
        estatus: "decline enquiry",
      },
      { new: true }
    );

    if (!enquiry) {
      res.status(404).json({ error: "enquiry not found" });
      return;
    }
    const declineEnquiry = await DeclineEnquiry.create({
      enquiryId: enquiry._id,
      userId: enquiry.userId,
      providerId: enquiry.providerId,
      estatus: "decline enquiry",
      reason: reason,
    });

    res.json({
      enquiryId: enquiry._id,
      estatus: enquiry.estatus,

      declineEnquiry,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    const enquiries = await Enquiry.find({ providerId, estatus: "enquired" });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchdeclineEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    const enquiries = await DeclineEnquiry.find({ providerId });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const fetchdoneEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    const enquiries = await DoneEnquiry.find({ providerId });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const fetchcancelEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    const enquiries = await CancelEnquiry.find({ providerId });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Enquiry.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "service provider data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

