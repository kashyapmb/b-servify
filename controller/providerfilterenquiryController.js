import Enquiry from "../model/enquiryModel.js";
import DoneEnquiry from "../model/doneEnquiryModel.js";
import DeclineEnquiry from "../model/declineEnquiryModel.js";
import CancelEnquiry from "../model/cancelEnquiryModel.js";
import moment from "moment-timezone";

export const filterEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await Enquiry.find({
      providerId,
      createdAt: { $gte: start, $lte: end },
      estatus: "enquired",
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterDoneEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await DoneEnquiry.find({
      providerId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterDeclineEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await DeclineEnquiry.find({
      providerId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const filterCancelEnquiry = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = moment(startDate).startOf("day").toDate();
    const end = moment(endDate).endOf("day").toDate();

    // Query done enquiries between start and end dates for the given providerId
    const enquiries = await CancelEnquiry.find({
      providerId,
      createdAt: { $gte: start, $lte: end },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching done enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
