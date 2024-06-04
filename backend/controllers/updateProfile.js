import User from "../models/user.js";

const updateProfile = async (req, res) => {
  try {
    // 1. Take original email from payload sent by frontend
    const originalEmail = req.body.originalEmail;

    // 2. Get all the info of user (User model) using that email by sending request findOne(originalEmail)
    const user = await User.findOne({ email: originalEmail });

    // 3. Compare the name, email, role of original database with the updated name, updated email, updated role got from payload
    const { updatedName,updatedRole } = req.body;
    const updatedFields = {};

    if (updatedName !== user.name) {
      // Update name if different
      user.name = updatedName;
      updatedFields.name = updatedName;
    }

    if (updatedRole !== user.role) {
      // Update role if different
      user.role = updatedRole;
      updatedFields.role = updatedRole;
    }

    // 4. If any fields were updated, update them one by one and add them to an object called updatedFields
    if (Object.keys(updatedFields).length > 0) {
      await user.save(); // Save the updated user to the database
    } else {
      // No fields were updated
      return res.status(200).json({
        success: false,
        message: "No fields were updated"
      });
    }

    // 5. Return { message: "Profile Updated Successfully" } and the object updatedFields
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedFields
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "An error occurred while updating profile" });
  }
};

export default updateProfile;
