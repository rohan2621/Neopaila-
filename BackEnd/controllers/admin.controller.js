import Contact from "../models/contact.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const replied = await Contact.countDocuments({ replied: true });
    const unread = await Contact.countDocuments({ replied: false });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today },
    });

    // Last 7 days chart
    const last7Days = await Contact.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      total,
      replied,
      unread,
      today: todayCount,
      replyRate: total ? Math.round((replied / total) * 100) : 0,
      chart: last7Days,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};
