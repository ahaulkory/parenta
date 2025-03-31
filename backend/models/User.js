import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    integrations: {
      gmail: {
        connected: {
          type: Boolean,
          default: false,
        },
        tokens: {
          access: String,
          refresh: String,
        },
      },
      outlook: {
        connected: {
          type: Boolean,
          default: false,
        },
        tokens: {
          access: String,
          refresh: String,
        },
      },
      googleCalendar: {
        connected: {
          type: Boolean,
          default: false,
        },
        tokens: {
          access: String,
          refresh: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pour hacher le mot de passe avant l'enregistrement
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
