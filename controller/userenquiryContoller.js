import Enquiry from "../model/enquiryModel.js";
import CancelEnquiry from "../model/cancelEnquiryModel.js";
import DeclineEnquiry from "../model/declineEnquiryModel.js";
import DoneEnquiry from "../model/doneEnquiryModel.js";
export const create_enquiry = async (req, res) => {
  try {
    const { userId, providerId, enquiry_for, pincode, state, city, address } =
      req.body;
    const existingEnquiry = await Enquiry.findOne({
      userId,
      providerId,
    })
      .sort({ _id: -1 })
      .limit(1);

    if (
      existingEnquiry &&
      !["cancel enquiry", "decline enquiry", "enquiry done"].includes(
        existingEnquiry.estatus
      )
    ) {
      res.json("enquired");
      return;
    }
    const enquiry = await Enquiry.create({
      userId,
      providerId,
      enquiry_for,
      pincode,
      state,
      city,
      address,
    });
    res.json({
      enquiryId: enquiry._id,
      estatus: enquiry.estatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const check_estatus = async (req, res) => {
  try {
    const { userId, providerId } = req.body;
    const existingEnquiry = await Enquiry.findOne({
      userId,
      providerId,
    })
      .sort({ _id: -1 })
      .limit(1);

    if (existingEnquiry) {
      if (
        existingEnquiry.estatus === "cancel enquiry" ||
        existingEnquiry.estatus === "decline enquiry" ||
        existingEnquiry.estatus === "enquiry done"
      ) {
        res.json("notenquired");
      } else {
        res.json("enquired");
      }
    } else {
      // If no booking exists, return null or any other indicator
      res.json("notenquired");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelEnquiry = async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const { reason } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      {
        estatus: "cancel enquiry",
      },
      { new: true }
    );

    if (!enquiry) {
      res.status(404).json({ error: "enquiry not found" });
      return;
    }
    const cancelEnquiry = await CancelEnquiry.create({
      enquiryId: enquiry._id,
      userId: enquiry.userId,
      providerId: enquiry.providerId,
      estatus: "cancel enquiry",
      reason: reason,
    });

    res.json({
      enquiryId: enquiry._id,
      estatus: enquiry.estatus,
      cancelEnquiry,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchEnquiryUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const enquiries = await Enquiry.find({ userId, estatus: "enquired" });
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchcanceledenquiriesUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch bookings with 'cancel' status for the specified user
    const canceledenquiries = await CancelEnquiry.find({
      userId: userId,
    });

    res.json(canceledenquiries);
  } catch (error) {
    console.error("Error fetching canceled bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchdoneenquiriesUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch bookings with 'cancel' status for the specified user
    const doneenquiries = await DoneEnquiry.find({
      userId: userId,
    });

    res.json(doneenquiries);
  } catch (error) {
    console.error("Error fetching canceled bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const fetchdeclineenquiriesUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch bookings with 'cancel' status for the specified user
    const declineenquiries = await DeclineEnquiry.find({
      userId: userId,
    });

    res.json(declineenquiries);
  } catch (error) {
    console.error("Error fetching canceled bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkcancellation = async (req, res) => {
  try {
    const enquiryId = req.params.enquiryId;

    // Check if the booking exists in the cancelbooking collection
    const canceledEnquiry = await CancelEnquiry.findOne({ enquiryId });
    const declinedEnquiry = await DeclineEnquiry.findOne({ enquiryId });

    if (canceledEnquiry || declinedEnquiry) {
      res.json({ canceled: true });
    } else {
      res.json({ canceled: false });
    }
  } catch (error) {
    console.error("Error checking cancellation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
