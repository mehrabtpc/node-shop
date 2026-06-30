import User from "../../models/user.model.js";
// import Role from "../../models/role.model.js";
import bcrypt from "bcryptjs";

export const index = async (req, res) => {
  try {
    const { search, email, role, page = 1, limit = 10 } = req.query;

    const filter = {
      role: { $ne: "customer" }
    };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (email) {
      filter.email = email;
    }

    const query = User.find(filter).populate("roles").populate("permissions");

    if (role) {
      query.where("roles").in([role]);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(filter);
    const admins = await query.skip(skip).limit(Number(limit));

    res.json({
      message: "لیست ادمین‌ها",
      data: admins,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت لیست ادمین‌ها",
      error: error.message
    });
  }
};

export const store = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "این ایمیل قبلاً ثبت شده است"
      });
    }

    let assignedRole = null;

    if (role) {
      assignedRole = await Role.findById(role);
      if (!assignedRole) {
        return res.status(404).json({
          message: "نقش پیدا نشد"
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin",
      roles: assignedRole ? [assignedRole._id] : []
    });

    const result = await User.findById(admin._id)
      .select("-password")
      .populate("roles")
      .populate("permissions");

    res.status(201).json({
      message: "ادمین با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در ایجاد ادمین",
      error: error.message
    });
  }
};

export const show = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id)
      .select("-password")
      .populate("roles")
      .populate("permissions");

    if (!admin) {
      return res.status(404).json({
        message: "ادمین پیدا نشد"
      });
    }

    res.json({
      message: "اطلاعات ادمین",
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در دریافت اطلاعات ادمین",
      error: error.message
    });
  }
};

export const update = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "ادمین پیدا نشد"
      });
    }

    if (email && email !== admin.email) {
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          message: "این ایمیل قبلاً ثبت شده است"
        });
      }
      admin.email = email;
    }

    if (name) admin.name = name;
    if (phone) admin.phone = phone;

    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    if (role) {
      const assignedRole = await Role.findById(role);
      if (!assignedRole) {
        return res.status(404).json({
          message: "نقش پیدا نشد"
        });
      }
      admin.roles = [assignedRole._id];
    }

    await admin.save();

    const updatedAdmin = await User.findById(admin._id)
      .select("-password")
      .populate("roles")
      .populate("permissions");

    res.json({
      message: "ادمین با موفقیت بروزرسانی شد",
      data: updatedAdmin
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در بروزرسانی ادمین",
      error: error.message
    });
  }
};

export const destroy = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id).populate("roles");

    if (!admin) {
      return res.status(404).json({
        message: "ادمین پیدا نشد"
      });
    }

    const hasSuperAdminRole = admin.roles?.some(
      (item) => item.name === "super_admin"
    );

    if (hasSuperAdminRole) {
      return res.status(403).json({
        message: "شما مجاز به حذف سوپر ادمین نیستید"
      });
    }

    await admin.deleteOne();

    res.json({
      message: "ادمین با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      message: "خطا در حذف ادمین",
      error: error.message
    });
  }
};
