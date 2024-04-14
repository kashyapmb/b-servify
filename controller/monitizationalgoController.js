import Provider from "../model/providerModel.js";
import Payment from "../model/paymentProviderModel.js";

// export const getServiceProvidersAlgo = async (req, res) => {
//   try {
//     const { city, domain } = req.body;
//     const serviceProviderData = await Provider.find({
//       $and: [{ city }, { domain }],
//     }).select("-password");
//     if (!serviceProviderData) {
//       return res.status(404).json({ msg: "Service provider data not found" });
//     }
//     res.status(200).json(serviceProviderData);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

export const getAllServiceProvidersAlgo = async (req, res) => {
  try {
    const { city, domain } = req.body;

    // Step 1: Fetch service providers based on city and domain
    const serviceProviderData = await Provider.find({
      $and: [{ city }, { domain }],
    }).select("-password");

    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }

    // Step 2: Check plan status for each provider
    const categorizedProviders = {
      pro: [],
      premium: [],
      standard: [],
      noPlan: [],
    };

    for (const provider of serviceProviderData) {
      // Check payment plan for the provider
      const paymentInfo = await Payment.findOne({ providerId: provider._id });

      if (paymentInfo && paymentInfo.plan) {
        // Provider has a plan
        categorizedProviders[paymentInfo.plan].push(provider);
      } else {
        // Provider has no plan
        categorizedProviders.noPlan.push(provider);
      }
    }

    // Step 3: Sort providers within each plan by overall rating in descending order
    Object.keys(categorizedProviders).forEach((plan) => {
      categorizedProviders[plan].sort(
        (a, b) => b.overallRating - a.overallRating
      );
    });

    // Step 4: Concatenate providers in the order: pro, premium, standard, noPlan
    const sortedProviders = [
      ...categorizedProviders.pro,
      ...categorizedProviders.premium,
      ...categorizedProviders.standard,
      ...categorizedProviders.noPlan,
    ];

    res.status(200).json(sortedProviders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllServiceProvidersRating = async (req, res) => {
  try {
    const { city, domain } = req.body;
    const serviceProviderData = await Provider.find({
      $and: [{ city }, { domain }],
    }).select("-password");
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }
    serviceProviderData.sort((a, b) => a.overallRating - b.overallRating);
    serviceProviderData.reverse();
    res.status(200).json(serviceProviderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
