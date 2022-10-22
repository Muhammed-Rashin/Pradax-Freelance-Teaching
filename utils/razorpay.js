const Razorpay = require("razorpay");
const { classDetails } = require("../controllers/student.auth.controller");
const crypto = require("crypto");

var instance = new Razorpay({
  key_id: "rzp_test_ufs4JercwrIpt3",
  key_secret: "4NuAdrkO3C7zEwubmAw8ZAn6",
});
module.exports = {
  generateRazorpayForBasicPlan: (classDetails, plan) => {
    return new Promise((resolve, reject) => {
      if (plan == "Basic") {
        instance.orders.create(
          {
            amount: classDetails.basicPlan.fees * 100,
            currency: "INR",
            receipt: "receipt#1",
          },
          (err, order) => {
            if (err) {
              console.log(err);
            } else {
              resolve(order);
            }
          }
        );
      }

      if (plan == "Standard") {
        instance.orders.create(
          {
            amount: classDetails.standardPlan.fees * 100,
            currency: "INR",
            receipt: "receipt#1",
          },
          (err, order) => {
            if (err) {
              console.log(err);
            } else {
              resolve(order);
            }
          }
        );
      }

      if (plan == "Premium") {
        instance.orders.create(
          {
            amount: classDetails.premiumPlan.fees * 100,
            currency: "INR",
            receipt: "receipt#1",
          },
          (err, order) => {
            if (err) {
              console.log(err);
            } else {
              resolve(order);
            }
          }
        );
      }
    });
  },

  verifyPayment: (details) => {
    return new Promise((resolve, reject) => {
      let hmac = crypto.createHmac("sha256", "4NuAdrkO3C7zEwubmAw8ZAn6");
      hmac.update(
        details["payment[razorpay_order_id]"] +
          "|" +
          details["payment[razorpay_payment_id]"]
      );
      hmac = hmac.digest("hex");
      if (hmac == details["payment[razorpay_signature]"]) {
        resolve();
      } else {
        reject();
      }
    });
  },
};
