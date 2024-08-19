import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("movie", contactSchema);

export default Contact;
