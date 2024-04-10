import Provider from "../model/providerModel.js";
import Enquiry from "../model/enquiryModel.js";
import DoneEnquiry from "../model/doneEnquiryModel.js";
import DeclineEnquiry from "../model/declineEnquiryModel.js";
import CancelEnquiry from "../model/cancelEnquiryModel.js";
import moment from "moment"; // Import moment.js library for date manipulation

export const countEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    const enquiries_enquired = await Enquiry.countDocuments({
      providerId,
      estatus: "enquired",
    });
    const enquiries_done = await DoneEnquiry.countDocuments({
      providerId,
      estatus: "enquiry done",
    });
    const enquiries_decline = await DeclineEnquiry.countDocuments({
      providerId,
      estatus: "decline enquiry",
    });
    const enquiries_cancel = await CancelEnquiry.countDocuments({
      providerId,
      estatus: "cancel enquiry",
    });

    const enquiryCounts = {
      enquired: enquiries_enquired,
      enquiry_done: enquiries_done,
      decline_enquiry: enquiries_decline,
      cancel_enquiry: enquiries_cancel,
    };

    res.json(enquiryCounts);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const countMonthlyEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;

    // Initialize an empty array to store monthly counts
    const monthlyCounts = [];

    // Calculate the start and end of the current year
    const startOfYear = moment().startOf("year");
    const endOfYear = moment().endOf("year");

    // Iterate over each month of the year
    let currentMonth = moment(startOfYear);
    while (currentMonth.isSameOrBefore(endOfYear)) {
      // Initialize an object for the month with counts set to 0
      const monthObj = {
        month: currentMonth.format("MMM-YYYY"),
        completed: 0,
        cancelled: 0,
      };

      // Push the month object to the monthlyCounts array
      monthlyCounts.push(monthObj);

      // Move to the next month
      currentMonth.add(1, "month");
    }

    // Fetch enquiries for the provider
    const enquiries = await Enquiry.find({ providerId });

    // Iterate over the enquiries and update monthly counts
    enquiries.forEach((enquiry) => {
      const month = moment(enquiry.createdAt).format("MMM-YYYY");
      const monthObj = monthlyCounts.find((obj) => obj.month === month);

      // Increment counts based on enquiry status
      if (
        enquiry.estatus === "enquiry done" ||
        enquiry.estatus === "enquired"
      ) {
        monthObj.completed++;
      } else if (
        enquiry.estatus === "cancel enquiry" ||
        enquiry.estatus === "decline enquiry"
      ) {
        monthObj.cancelled++;
      }
    });

    res.json(monthlyCounts);
  } catch (error) {
    console.error("Error fetching monthly enquiry counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
