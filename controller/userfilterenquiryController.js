import Enquiry from "../model/enquiryModel.js";
import DoneEnquiry from "../model/doneEnquiryModel.js";
import DeclineEnquiry from "../model/declineEnquiryModel.js";
import CancelEnquiry from "../model/cancelEnquiryModel.js";
import moment from "moment-timezone";

export const filterEnquiryUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await Enquiry.find({
      userId,
      createdAt: { $gte: start, $lte: end },
      estatus: "enquired",
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterDoneEnquiryUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await DoneEnquiry.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterDeclineEnquiryUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await DeclineEnquiry.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterCancelEnquiryUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await CancelEnquiry.find({
      userId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
